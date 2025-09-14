import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { SmellCategory, DifficultyLevel } from "@prisma/client";
import { SmellsResponse } from "@/lib/types";

// Query parameters validation
const querySchema = z.object({
  search: z.string().nullable().optional(),
  category: z
    .union([z.nativeEnum(SmellCategory), z.array(z.nativeEnum(SmellCategory))])
    .nullable()
    .optional(),
  difficulty: z
    .union([
      z.nativeEnum(DifficultyLevel),
      z.array(z.nativeEnum(DifficultyLevel)),
    ])
    .nullable()
    .optional(),
  sortBy: z.string().nullable().optional(),
  sortOrder: z.enum(["asc", "desc"]).nullable().optional(),
  limit: z.string().nullable().optional(),
  offset: z.string().nullable().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Handle multiple values for category and difficulty
    const categories = searchParams.getAll("category");
    const difficulties = searchParams.getAll("difficulty");

    const query = querySchema.parse({
      search: searchParams.get("search"),
      category: categories.length > 0 ? categories : null,
      difficulty: difficulties.length > 0 ? difficulties : null,
      sortBy: searchParams.get("sortBy"),
      sortOrder: searchParams.get("sortOrder"),
      limit: searchParams.get("limit"),
      offset: searchParams.get("offset"),
    });

    // Build where clause
    const where: any = {};

    // Search functionality
    if (query.search) {
      where.OR = [
        { title: { contains: query.search } },
        { description: { contains: query.search } },
        { tags: { contains: query.search } },
      ];
    }

    // Category filter - always apply when provided
    if (query.category) {
      if (Array.isArray(query.category) && query.category.length > 0) {
        where.category = { in: query.category };
        console.log(`🔍 Category filter (array):`, query.category);
      } else if (!Array.isArray(query.category)) {
        where.category = query.category;
        console.log(`🔍 Category filter (single):`, query.category);
      }
    }

    // Difficulty filter - always apply when provided
    if (query.difficulty) {
      if (Array.isArray(query.difficulty) && query.difficulty.length > 0) {
        where.difficulty = { in: query.difficulty };
        console.log(`🔍 Difficulty filter (array):`, query.difficulty);
      } else if (!Array.isArray(query.difficulty)) {
        where.difficulty = query.difficulty;
        console.log(`🔍 Difficulty filter (single):`, query.difficulty);
      }
    }

    // Log where clause for debugging
    console.log(`🔍 Where clause:`, JSON.stringify(where, null, 2));

    // Build orderBy clause
    let orderBy: any = { createdAt: "desc" }; // Default order
    let difficultyOrder: string[] | null = null;

    if (query.sortBy) {
      const sortField = query.sortBy;
      const sortOrder = query.sortOrder || "asc";

      console.log(`🔍 Sorting by: ${sortField}, order: ${sortOrder}`);

      // Validate sort field
      const allowedSortFields: readonly string[] = [
        "title",
        "createdAt",
        "updatedAt",
        "difficulty",
        "category",
        "popularity",
      ] as const;

      if (allowedSortFields.includes(sortField)) {
        if (sortField === "popularity") {
          // For popularity, we need to use raw SQL
          // Will be handled separately
          orderBy = { createdAt: "desc" }; // Default order
        } else if (sortField === "difficulty") {
          // For difficulty, we need custom ordering
          // Define the order based on difficulty level
          difficultyOrder =
            sortOrder === "asc"
              ? ["BEGINNER", "EASY", "MEDIUM", "HARD", "EXPERT"]
              : ["EXPERT", "HARD", "MEDIUM", "EASY", "BEGINNER"];

          // We'll handle this with a custom sort after fetching
          orderBy = { createdAt: "desc" }; // Default order, we'll sort after
          console.log(`✅ Difficulty order:`, difficultyOrder);
        } else {
          orderBy = { [sortField]: sortOrder };
        }
        console.log(`✅ OrderBy set to:`, orderBy);
      } else {
        console.log(`❌ Invalid sort field: ${sortField}`);
      }
    }

    // Log where clause for debugging
    console.log(`🔍 Where clause:`, JSON.stringify(where, null, 2));

    // Pagination
    const limit = query.limit ? parseInt(query.limit) : 20;
    const offset = query.offset ? parseInt(query.offset) : 0;

    // Get smells with pagination and counts
    let smells, total;

    if (query.sortBy === "popularity") {
      // For popularity sorting, fetch all then sort by favorites count
      const [allSmells, totalCount] = await Promise.all([
        prisma.smell.findMany({
          where,
          include: {
            _count: {
              select: {
                favorites: true,
                progress: true,
              },
            },
          },
        }),
        prisma.smell.count({ where }),
      ]);

      // Sort by favorites count
      const sortOrder = query.sortOrder || "desc";
      allSmells.sort((a, b) => {
        const aFavorites = a._count.favorites;
        const bFavorites = b._count.favorites;
        return sortOrder === "asc"
          ? aFavorites - bFavorites
          : bFavorites - aFavorites;
      });

      // Apply pagination after sorting
      smells = allSmells.slice(offset, offset + limit);
      total = totalCount;
    } else {
      // Regular sorting for other fields
      if (query.sortBy === "difficulty" && difficultyOrder) {
        // For difficulty sorting, fetch all then sort and paginate
        const [allSmells, totalCount] = await Promise.all([
          prisma.smell.findMany({
            where,
            include: {
              _count: {
                select: {
                  favorites: true,
                  progress: true,
                },
              },
            },
          }),
          prisma.smell.count({ where }),
        ]);

        // Sort by difficulty
        allSmells.sort((a, b) => {
          const aIndex = difficultyOrder!.indexOf(a.difficulty);
          const bIndex = difficultyOrder!.indexOf(b.difficulty);
          return aIndex - bIndex;
        });

        // Apply pagination after sorting
        smells = allSmells.slice(offset, offset + limit);
        total = totalCount;
      } else {
        // Normal pagination for other sorts
        [smells, total] = await Promise.all([
          prisma.smell.findMany({
            where,
            orderBy,
            take: limit,
            skip: offset,
            include: {
              _count: {
                select: {
                  favorites: true,
                  progress: true,
                },
              },
            },
          }),
          prisma.smell.count({ where }),
        ]);
      }
    }

    const response: SmellsResponse = {
      smells,
      total,
      page: Math.floor(offset / limit) + 1,
      limit,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching smells:", error);
    return NextResponse.json(
      { error: "Failed to fetch smells" },
      { status: 500 }
    );
  }
}

// Create new smell (admin only - will add auth later)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const smellSchema = z.object({
      title: z.string().min(1).max(100),
      category: z.nativeEnum(SmellCategory),
      description: z.string().min(1),
      badCode: z.string().min(1),
      goodCode: z.string().min(1),
      testHint: z.string().min(1),
      difficulty: z.nativeEnum(DifficultyLevel),
      tags: z.string(),
    });

    const validatedData = smellSchema.parse(body);

    const smell = await prisma.smell.create({
      data: validatedData,
    });

    return NextResponse.json(smell, { status: 201 });
  } catch (error) {
    console.error("Error creating smell:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create smell" },
      { status: 500 }
    );
  }
}
