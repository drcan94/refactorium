#!/usr/bin/env tsx

/**
 * PostgreSQL setup script for Refactorium
 * This script sets up the PostgreSQL database and seeds it with initial data
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function setupPostgreSQL() {
  console.log("🚀 Setting up PostgreSQL database for Refactorium...");

  try {
    // Test database connection
    console.log("🔗 Testing database connection...");
    await prisma.$connect();
    console.log("✅ Database connection successful!");

    // Check if we have any existing data
    console.log("📊 Checking existing data...");
    const userCount = await prisma.user.count();
    const smellCount = await prisma.smell.count();
    const settingCount = await prisma.setting.count();

    console.log(
      `📈 Current data: ${userCount} users, ${smellCount} smells, ${settingCount} settings`
    );

    if (userCount === 0 && smellCount === 0 && settingCount === 0) {
      console.log(
        "🌱 No existing data found. Database is ready for fresh start!"
      );
      console.log("");
      console.log("🎯 Next steps:");
      console.log("1. Run: npm run db:seed (to populate with initial data)");
      console.log("2. Start development: npm run dev");
      console.log("3. Visit: http://localhost:3000");
    } else {
      console.log("📋 Existing data found. Database is ready!");
      console.log("");
      console.log("🎯 Next steps:");
      console.log("1. Start development: npm run dev");
      console.log("2. Visit: http://localhost:3000");
    }

    // Test a simple query
    console.log("🧪 Testing database operations...");
    const testSetting = await prisma.setting.upsert({
      where: { key: "database_test" },
      update: { value: "ok" },
      create: {
        key: "database_test",
        value: "ok",
      },
    });
    console.log("✅ Database operations working correctly!");

    // Clean up test data
    await prisma.setting.delete({
      where: { key: "database_test" },
    });

    console.log("🎉 PostgreSQL setup completed successfully!");
  } catch (error) {
    console.error("❌ PostgreSQL setup failed:", error);

    if (error instanceof Error) {
      if (error.message.includes("P1001")) {
        console.log("");
        console.log("💡 Connection error detected. Please check:");
        console.log("1. Your DATABASE_URL environment variable");
        console.log("2. Your Supabase database is running");
        console.log("3. Your network connection");
        console.log("");
        console.log("🔧 To fix this:");
        console.log("1. Copy .env.example to .env.local");
        console.log("2. Update .env.local with your Supabase credentials");
        console.log("3. Run this script again");
      } else if (error.message.includes("P1017")) {
        console.log("");
        console.log("💡 Database connection closed. This might be due to:");
        console.log("1. Connection timeout");
        console.log("2. Database server restart");
        console.log("3. Network issues");
        console.log("");
        console.log("🔧 Try running the script again in a few moments.");
      }
    }

    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run setup if this script is executed directly
if (require.main === module) {
  setupPostgreSQL()
    .then(() => {
      console.log("✅ Setup script completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Setup script failed:", error);
      process.exit(1);
    });
}

export { setupPostgreSQL };
