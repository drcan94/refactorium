import { PrismaClient, SmellCategory, DifficultyLevel } from "@prisma/client";
import { codeExamples } from "./code-examples";

const prisma = new PrismaClient();

// GitHub API'den kullanıcı verilerini çek
async function fetchGitHubUser(username: string) {
  try {
    console.log(`🔍 Fetching GitHub user data for: ${username}`);
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const userData = await response.json();
    return {
      name: userData.name || userData.login,
      email: userData.email || `${userData.login}@users.noreply.github.com`,
      image: userData.avatar_url,
      bio: userData.bio,
      location: userData.location,
      website: userData.blog,
      githubUrl: userData.html_url,
    };
  } catch (error) {
    console.error(`❌ Error fetching GitHub user ${username}:`, error);
    // Fallback data
    return {
      name: username,
      email: `${username}@users.noreply.github.com`,
      image: null,
      bio: null,
      location: null,
      website: null,
      githubUrl: `https://github.com/${username}`,
    };
  }
}

async function main() {
  console.log("🌱 Starting database seeding...");

  // GitHub'dan admin kullanıcı verilerini çek
  const githubUserData = await fetchGitHubUser("drcan94");

  // Find or create admin user
  let existingUser = await prisma.user.findUnique({
    where: { email: githubUserData.email },
  });

  if (!existingUser) {
    console.log("👤 Creating admin user from GitHub data...");
    existingUser = await prisma.user.create({
      data: {
        ...githubUserData,
        role: "ADMIN",
      },
    });
    console.log(
      `✅ Created admin user: ${existingUser.name} (${existingUser.email})`
    );
  } else {
    console.log(`✅ Found user: ${existingUser.name} (${existingUser.email})`);
  }

  // Create sample code smells with different creation times
  const smells = [
    {
      title: "God Function",
      category: SmellCategory.CODE_SMELL,
      description:
        "A function that does too much and violates the Single Responsibility Principle. It handles multiple responsibilities and is hard to understand, test, and maintain.",
      badCode: codeExamples.godFunction.badCode,
      goodCode: codeExamples.godFunction.goodCode,
      testHint:
        "Write unit tests for each method separately. Mock dependencies and test one responsibility per test. Use dependency injection for better testability.",
      difficulty: DifficultyLevel.MEDIUM,
      tags: "functions,complexity,refactoring,single-responsibility",
      createdAt: new Date("2024-01-15T10:30:00Z"),
    },
    {
      title: "Magic Numbers",
      category: SmellCategory.READABILITY,
      description:
        "Unexplained numeric literals that make code hard to understand and maintain. These numbers have no clear meaning and can lead to bugs when changed.",
      badCode: codeExamples.magicNumbers.badCode,
      goodCode: codeExamples.magicNumbers.goodCode,
      testHint:
        "Test with different discount rates and password lengths. Verify constants are used correctly and can be easily modified.",
      difficulty: DifficultyLevel.BEGINNER,
      tags: "constants,readability,maintenance,magic-numbers",
      createdAt: new Date("2024-01-16T14:20:00Z"),
    },
    {
      title: "Duplicate Logic",
      category: SmellCategory.MAINTAINABILITY,
      description:
        "Repeated code blocks that should be extracted into reusable functions. This violates the DRY (Don't Repeat Yourself) principle and makes maintenance harder.",
      badCode: codeExamples.duplicateLogic.badCode,
      goodCode: codeExamples.duplicateLogic.goodCode,
      testHint:
        "Test the validator class separately. Verify all functions use the same validation logic. Test edge cases like empty strings and invalid emails.",
      difficulty: DifficultyLevel.EASY,
      tags: "duplication,reusability,dry,validation",
      createdAt: new Date("2024-01-17T09:15:00Z"),
    },
    {
      title: "Long Parameter List",
      category: SmellCategory.CODE_SMELL,
      description:
        "Functions with too many parameters that are hard to understand and maintain. This makes the function signature complex and error-prone.",
      badCode: codeExamples.longParameterList.badCode,
      goodCode: codeExamples.longParameterList.goodCode,
      testHint:
        "Test with different parameter combinations. Verify that the parameter object approach is more maintainable and less error-prone.",
      difficulty: DifficultyLevel.MEDIUM,
      tags: "functions,parameters,maintainability,refactoring",
      createdAt: new Date("2024-01-18T16:45:00Z"),
    },
    {
      title: "Dead Code",
      category: SmellCategory.MAINTAINABILITY,
      description:
        "Unused code that serves no purpose and clutters the codebase. This includes commented-out code, unused variables, and unreachable code.",
      badCode: codeExamples.deadCode.badCode,
      goodCode: codeExamples.deadCode.goodCode,
      testHint:
        "Use static analysis tools to detect dead code. Regularly review and remove unused code to keep the codebase clean.",
      difficulty: DifficultyLevel.BEGINNER,
      tags: "cleanup,maintenance,readability,unused-code",
      createdAt: new Date("2024-01-19T11:30:00Z"),
    },
    {
      title: "Primitive Obsession",
      category: SmellCategory.DESIGN_PATTERN,
      description:
        "Using primitive types instead of small objects for simple tasks. This makes the code less expressive and harder to maintain.",
      badCode: codeExamples.primitiveObsession.badCode,
      goodCode: codeExamples.primitiveObsession.goodCode,
      testHint:
        "Test value objects thoroughly. Verify that they provide proper validation and encapsulation of business rules.",
      difficulty: DifficultyLevel.HARD,
      tags: "value-objects,encapsulation,type-safety,domain-modeling",
      createdAt: new Date("2024-01-20T13:20:00Z"),
    },
    {
      title: "Feature Envy",
      category: SmellCategory.DESIGN_PATTERN,
      description:
        "A method that seems more interested in a class other than the one it's in. This often indicates that the method should be moved to the other class.",
      badCode: codeExamples.featureEnvy.badCode,
      goodCode: codeExamples.featureEnvy.goodCode,
      testHint:
        "Test the refactored classes independently. Verify that each class has clear responsibilities and minimal coupling.",
      difficulty: DifficultyLevel.MEDIUM,
      tags: "responsibility,cohesion,coupling,refactoring",
      createdAt: new Date("2024-01-21T08:45:00Z"),
    },
    {
      title: "Data Clumps",
      category: SmellCategory.CODE_SMELL,
      description:
        "Groups of data that are always passed around together but not organized into a proper object. This creates tight coupling and makes changes difficult.",
      badCode: codeExamples.dataClumps.badCode,
      goodCode: codeExamples.dataClumps.goodCode,
      testHint:
        "Test the extracted classes for proper validation and behavior. Verify that the clumped data is now properly encapsulated.",
      difficulty: DifficultyLevel.EASY,
      tags: "data-structures,encapsulation,coupling,refactoring",
      createdAt: new Date("2024-01-22T15:10:00Z"),
    },
    {
      title: "Shotgun Surgery",
      category: SmellCategory.MAINTAINABILITY,
      description:
        "Making a small change requires modifications in many different places. This indicates that the code is tightly coupled and not well-organized.",
      badCode: codeExamples.shotgunSurgery.badCode,
      goodCode: codeExamples.shotgunSurgery.goodCode,
      testHint:
        "Test that changes to the domain model only require updates in one place. Verify that the centralized approach is more maintainable.",
      difficulty: DifficultyLevel.HARD,
      tags: "maintainability,coupling,refactoring,architecture",
      createdAt: new Date("2024-01-23T12:00:00Z"),
    },
    {
      title: "Inappropriate Intimacy",
      category: SmellCategory.DESIGN_PATTERN,
      description:
        "Classes that know too much about each other's internal structure. This creates tight coupling and makes the system fragile.",
      badCode: `class Order {
  constructor(private customer: Customer, private items: Item[]) {}
  
  calculateTotal() {
    // Order directly accessing Customer's private data
    if (this.customer.isVip) {
      return this.items.reduce((sum, item) => sum + item.price * 0.9, 0);
    }
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
  
  getCustomerDetails() {
    // Order exposing Customer's internal structure
    return {
      name: this.customer.name,
      email: this.customer.email,
      address: this.customer.address,
      phone: this.customer.phone
    };
  }
}`,
      goodCode: `// Use proper encapsulation and delegation
class Order {
  constructor(
    private customer: Customer,
    private items: Item[],
    private pricingService: PricingService
  ) {}
  
  calculateTotal(): number {
    return this.pricingService.calculateOrderTotal(this.items, this.customer);
  }
  
  getCustomerSummary(): CustomerSummary {
    return this.customer.getSummary();
  }
}

class Customer {
  constructor(
    private name: string,
    private email: string,
    private address: Address,
    private phone: string,
    private membershipLevel: MembershipLevel
  ) {}
  
  getSummary(): CustomerSummary {
    return {
      name: this.name,
      email: this.email,
      membershipLevel: this.membershipLevel
    };
  }
  
  isEligibleForDiscount(): boolean {
    return this.membershipLevel === 'vip' || this.membershipLevel === 'premium';
  }
}`,
      testHint:
        "Test that classes only access what they need through proper interfaces. Verify that internal details are properly encapsulated.",
      difficulty: DifficultyLevel.MEDIUM,
      tags: "encapsulation,coupling,interfaces,design-patterns",
      createdAt: new Date("2024-01-24T17:30:00Z"),
    },
    {
      title: "Lazy Class",
      category: SmellCategory.CODE_SMELL,
      description:
        "A class that doesn't do enough to justify its existence. It might be doing too little or could be merged with another class.",
      badCode: `class UserValidator {
  static validateEmail(email: string): boolean {
    return email.includes('@');
  }
}

class EmailValidator {
  static isValid(email: string): boolean {
    return email.includes('@');
  }
}

class UserEmailChecker {
  static check(email: string): boolean {
    return email.includes('@');
  }
}`,
      goodCode: `// Consolidate similar functionality
class ValidationUtils {
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  static validatePhone(phone: string): boolean {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  }
  
  static validateRequired(value: string): boolean {
    return value && value.trim().length > 0;
  }
}`,
      testHint:
        "Test that the consolidated class provides all necessary functionality. Verify that the refactored code is more maintainable.",
      difficulty: DifficultyLevel.EASY,
      tags: "consolidation,maintainability,refactoring,utility-classes",
      createdAt: new Date("2024-01-25T10:15:00Z"),
    },
    {
      title: "Speculative Generality",
      category: SmellCategory.CODE_SMELL,
      description:
        "Code that is more complex than necessary because it was designed to handle future requirements that may never come.",
      badCode: `// Over-engineered for current needs
interface DataProcessor<T, R> {
  process(data: T): R;
  validate(data: T): boolean;
  transform(data: T): T;
  serialize(data: T): string;
  deserialize(data: string): T;
}

class UserProcessor implements DataProcessor<User, ProcessedUser> {
  process(user: User): ProcessedUser {
    // Complex processing logic that's not needed yet
    return this.transform(this.validate(user) ? user : this.getDefaultUser());
  }
  
  validate(user: User): boolean {
    // Overly complex validation
    return user.email && user.name && user.age > 0 && user.age < 150;
  }
  
  transform(user: User): User {
    // Unnecessary transformation
    return { ...user, name: user.name.toUpperCase() };
  }
  
  serialize(user: User): string {
    return JSON.stringify(user);
  }
  
  deserialize(data: string): User {
    return JSON.parse(data);
  }
  
  private getDefaultUser(): User {
    return { name: '', email: '', age: 0 };
  }
}`,
      goodCode: `// Simple, focused solution for current needs
class UserService {
  createUser(name: string, email: string, age: number): User {
    if (!this.isValidUser(name, email, age)) {
      throw new Error('Invalid user data');
    }
    
    return {
      name: name.trim(),
      email: email.toLowerCase(),
      age: age
    };
  }
  
  private isValidUser(name: string, email: string, age: number): boolean {
    return name && email && age > 0;
  }
}`,
      testHint:
        "Test that the simplified solution meets current requirements. Verify that the code is easier to understand and maintain.",
      difficulty: DifficultyLevel.MEDIUM,
      tags: "simplicity,yagni,maintainability,over-engineering",
      createdAt: new Date("2024-01-26T14:45:00Z"),
    },
  ];

  // Create smells in database
  const createdSmells = [];
  for (const smell of smells) {
    const createdSmell = await prisma.smell.upsert({
      where: { title: smell.title },
      update: smell,
      create: smell,
    });
    createdSmells.push(createdSmell);
  }

  console.log(`✅ Created ${createdSmells.length} code smells`);

  // Add some smells to user's favorites with different timestamps
  const favoriteSmells = [
    {
      smellId: createdSmells[0].id,
      createdAt: new Date("2024-01-20T10:00:00Z"),
    }, // God Function
    {
      smellId: createdSmells[1].id,
      createdAt: new Date("2024-01-21T14:30:00Z"),
    }, // Magic Numbers
    {
      smellId: createdSmells[3].id,
      createdAt: new Date("2024-01-22T09:15:00Z"),
    }, // Long Parameter List
    {
      smellId: createdSmells[5].id,
      createdAt: new Date("2024-01-23T16:45:00Z"),
    }, // Primitive Obsession
  ];

  for (const favorite of favoriteSmells) {
    await prisma.userSmell.upsert({
      where: {
        userId_smellId: {
          userId: existingUser.id,
          smellId: favorite.smellId,
        },
      },
      update: {},
      create: {
        userId: existingUser.id,
        smellId: favorite.smellId,
        createdAt: favorite.createdAt,
      },
    });
  }

  console.log(`✅ Added ${favoriteSmells.length} smells to user favorites`);

  // Add some progress records with different timestamps
  const progressRecords = [
    {
      smellId: createdSmells[0].id,
      completed: true,
      createdAt: new Date("2024-01-20T11:00:00Z"),
    }, // God Function - completed
    {
      smellId: createdSmells[1].id,
      completed: false,
      createdAt: new Date("2024-01-21T15:00:00Z"),
    }, // Magic Numbers - in progress
    {
      smellId: createdSmells[2].id,
      completed: true,
      createdAt: new Date("2024-01-22T10:30:00Z"),
    }, // Duplicate Logic - completed
    {
      smellId: createdSmells[4].id,
      completed: false,
      createdAt: new Date("2024-01-23T12:00:00Z"),
    }, // Dead Code - in progress
  ];

  for (const progress of progressRecords) {
    await prisma.userProgress.upsert({
      where: {
        userId_smellId: {
          userId: existingUser.id,
          smellId: progress.smellId,
        },
      },
      update: {
        completed: progress.completed,
      },
      create: {
        userId: existingUser.id,
        smellId: progress.smellId,
        completed: progress.completed,
        createdAt: progress.createdAt,
      },
    });
  }

  console.log(`✅ Added ${progressRecords.length} progress records`);

  // Update user preferences
  await prisma.userPreferences.upsert({
    where: { userId: existingUser.id },
    update: {
      theme: "DARK",
      defaultDifficulty: "MEDIUM",
      emailUpdates: true,
      progressReminders: true,
      newSmells: true,
      weeklyDigest: false,
      profileVisibility: "PUBLIC",
      showProgress: true,
      allowAnalytics: true,
    },
    create: {
      userId: existingUser.id,
      theme: "DARK",
      defaultDifficulty: "MEDIUM",
      emailUpdates: true,
      progressReminders: true,
      newSmells: true,
      weeklyDigest: false,
      profileVisibility: "PUBLIC",
      showProgress: true,
      allowAnalytics: true,
    },
  });

  console.log("✅ Updated user preferences");

  console.log("🎉 Database seeding completed!");
  console.log(`📊 Summary:`);
  console.log(`   - ${createdSmells.length} code smells created`);
  console.log(`   - ${favoriteSmells.length} favorites added`);
  console.log(`   - ${progressRecords.length} progress records added`);
  console.log(`   - User preferences updated`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
