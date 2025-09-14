import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const settingsSchema = z.object({
  general: z.object({
    siteName: z.string().min(1),
    siteDescription: z.string(),
    siteUrl: z.string().url(),
    maintenanceMode: z.boolean(),
    maxUsers: z.number().min(1),
    maxSmells: z.number().min(1),
  }),
  email: z.object({
    smtpHost: z.string(),
    smtpPort: z.number().min(1).max(65535),
    smtpUser: z.string(),
    smtpPassword: z.string(),
    fromEmail: z.string().email(),
    fromName: z.string(),
    enabled: z.boolean(),
  }),
  security: z.object({
    sessionTimeout: z.number().min(1).max(168),
    maxLoginAttempts: z.number().min(1).max(10),
    requireEmailVerification: z.boolean(),
    allowRegistration: z.boolean(),
    passwordMinLength: z.number().min(6).max(32),
  }),
  features: z.object({
    enableAnalytics: z.boolean(),
    enableNotifications: z.boolean(),
    enableComments: z.boolean(),
    enableRatings: z.boolean(),
    enableSharing: z.boolean(),
  }),
  appearance: z.object({
    theme: z.enum(["light", "dark", "auto"]),
    primaryColor: z.string(),
    logoUrl: z.string().url().optional(),
    faviconUrl: z.string().url().optional(),
  }),
});

async function handler(req: NextRequest, context: { params: Promise<{}> }) {
  try {
    if (req.method === "GET") {
      // Get current settings
      const settings = await prisma.setting.findMany();

      // Convert array to object
      const settingsObj = settings.reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {} as Record<string, any>);

      // Return default settings if none exist
      if (Object.keys(settingsObj).length === 0) {
        return NextResponse.json({
          general: {
            siteName: "Refactorium",
            siteDescription: "Learn and practice code refactoring",
            siteUrl: "http://localhost:3000",
            maintenanceMode: false,
            maxUsers: 1000,
            maxSmells: 500,
          },
          email: {
            smtpHost: "",
            smtpPort: 587,
            smtpUser: "",
            smtpPassword: "",
            fromEmail: "noreply@refactorium.com",
            fromName: "Refactorium",
            enabled: false,
          },
          security: {
            sessionTimeout: 24,
            maxLoginAttempts: 5,
            requireEmailVerification: true,
            allowRegistration: true,
            passwordMinLength: 8,
          },
          features: {
            enableAnalytics: true,
            enableNotifications: true,
            enableComments: false,
            enableRatings: true,
            enableSharing: true,
          },
          appearance: {
            theme: "auto",
            primaryColor: "blue",
            logoUrl: "",
            faviconUrl: "",
          },
        });
      }

      return NextResponse.json(settingsObj);
    }

    if (req.method === "PUT") {
      // Update settings
      const body = await req.json();
      const validatedSettings = settingsSchema.parse(body);

      // Update or create settings
      for (const [section, values] of Object.entries(validatedSettings)) {
        for (const [key, value] of Object.entries(values)) {
          await prisma.setting.upsert({
            where: {
              key: `${section}.${key}`,
            },
            update: {
              value: JSON.stringify(value),
            },
            create: {
              key: `${section}.${key}`,
              value: JSON.stringify(value),
            },
          });
        }
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  } catch (error) {
    console.error("Error in settings API:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid settings data", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export const GET = withAdminAuth(handler);
export const PUT = withAdminAuth(handler);
