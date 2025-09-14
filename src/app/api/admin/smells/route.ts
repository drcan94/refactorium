import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const querySchema = z.object({
  page: z.string().default("1"),
  limit: z.string().default("10"),
  search: z.string().optional(),
  category: z.string().optional(),
  difficulty: z.string().optional(),
  status: z.string().optional(),
  sortBy: z.string().default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

async function handler(req: NextRequest, context: { params: Promise<{}> }) {
  try {
    const { searchParams } = new URL(req.url);
    const query = querySchema.parse({
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
      search: searchParams.get("search"),
      category: searchParams.get("category"),
      difficulty: searchParams.get("difficulty"),
      status: searchParams.get("status"),
      sortBy: searchParams.get("sortBy"),
      sortOrder: searchParams.get("sortOrder"),
    });

    const page = parseInt(query.page);
    const limit = parseInt(query.limit);
    const offset = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: "insensitive" } },
        { description: { contains: query.search, mode: "insensitive" } },
        { tags: { contains: query.search, mode: "insensitive" } },
      ];
    }

    if (query.category) {
      where.category = query.category;
    }

    if (query.difficulty) {
      where.difficulty = query.difficulty;
    }

    if (query.status === "published") {
      where.isPublished = true;
    } else if (query.status === "draft") {
      where.isPublished = false;
    }

    // Build orderBy clause
    let orderBy: any = {};
    switch (query.sortBy) {
      case "title":
        orderBy = { title: query.sortOrder };
        break;
      case "category":
        orderBy = { category: query.sortOrder };
        break;
      case "difficulty":
        orderBy = { difficulty: query.sortOrder };
        break;
      case "favorites":
        orderBy = { favorites: { _count: query.sortOrder } };
        break;
      case "createdAt":
      default:
        orderBy = { createdAt: query.sortOrder };
        break;
    }

    // Get smells with counts
    const [smells, total] = await Promise.all([
      prisma.smell.findMany({
        where,
        orderBy,
        skip: offset,
        take: limit,
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

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      smells,
      total,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching admin smells:", error);
    return NextResponse.json(
      { error: "Failed to fetch smells" },
      { status: 500 }
    );
  }
}

const createSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.string(),
  difficulty: z.string(),
  tags: z.string(),
  isPublished: z.boolean().default(false),
  problem: z.string().optional(),
  solution: z.string().optional(),
  testing: z.string().optional(),
  examples: z.string().optional(),
  references: z.string().optional(),
  badCode: z.string().min(1),
  goodCode: z.string().min(1),
  testHint: z.string().min(1),
});

async function createHandler(
  req: NextRequest,
  context: { params: Promise<{}> }
) {
  try {
    const body = await req.json();
    const data = createSchema.parse(body);

    // Check if title already exists
    const existingSmell = await prisma.smell.findUnique({
      where: { title: data.title },
    });

    if (existingSmell) {
      return NextResponse.json(
        { error: "A smell with this title already exists" },
        { status: 400 }
      );
    }

    const smell = await prisma.smell.create({
      data: {
        ...data,
        category: data.category as any,
        difficulty: data.difficulty as any,
      },
      include: {
        _count: {
          select: {
            favorites: true,
            progress: true,
          },
        },
      },
    });

    return NextResponse.json(smell, { status: 201 });
  } catch (error) {
    console.error("Error creating smell:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create smell" },
      { status: 500 }
    );
  }
}

export const GET = withAdminAuth(handler);
export const POST = withAdminAuth(createHandler);
