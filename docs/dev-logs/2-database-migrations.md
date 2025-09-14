# Development Log - 2: Database Migrations & Seeding

**Date**: December 2024  
**Status**: ✅ Completed  
**Duration**: ~45 minutes

## 📋 Overview
Successfully set up local SQLite database with Prisma migrations and seeded initial code smell data. Moved from PostgreSQL to SQLite for easier local development.

## 🎯 Goals Achieved
- [x] Database provider selection (SQLite)
- [x] Prisma schema configuration
- [x] Database migration setup
- [x] Initial data seeding
- [x] Database management scripts

## 🗄️ Database Configuration

### Provider Change: PostgreSQL → SQLite
**Reason**: PostgreSQL setup complexity on Windows
- **Original Plan**: Local PostgreSQL installation
- **Actual Solution**: SQLite for development simplicity
- **Future**: Can easily switch back to PostgreSQL for production

### Schema Modifications for SQLite
```prisma
// Removed PostgreSQL-specific types
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

// Removed @db.Text annotations
refresh_token     String?  // was: String? @db.Text
access_token      String?  // was: String? @db.Text

// Changed String[] to String for tags
tags        String  // was: String[]

// Added unique constraint
title       String   @unique
```

## 📊 Database Schema

### Core Models
- **User**: Authentication and profile data
- **Account**: OAuth provider accounts  
- **Session**: User sessions
- **VerificationToken**: Email verification
- **Smell**: Code smell definitions (3 sample records)
- **UserSmell**: User favorites relationship
- **UserProgress**: Learning progress tracking

### Relationships
- User → Account (1:many)
- User → Session (1:many)
- User → UserSmell (1:many)
- User → UserProgress (1:many)
- Smell → UserSmell (1:many)
- Smell → UserProgress (1:many)

## 🌱 Database Seeding

### Sample Code Smells Created
1. **God Function** (Difficulty: 3)
   - Category: Size & Complexity
   - Complete bad/good code examples
   - Test hints for validation

2. **Magic Numbers** (Difficulty: 1)
   - Category: Magic & Hidden Knowledge
   - Before/after constants examples
   - Password validation scenarios

3. **Duplicate Logic** (Difficulty: 2)
   - Category: Duplication & Coupling
   - DRY principle demonstration
   - Validation logic extraction

### Seed Data Structure
```typescript
{
  title: string,
  category: string,
  description: string,
  badCode: string,      // Complete code example
  goodCode: string,     // Refactored version
  testHint: string,     // Testing guidance
  difficulty: number,   // 1-5 scale
  tags: string         // Comma-separated tags
}
```

## 🛠️ Database Management Scripts

### Package.json Scripts Added
```json
{
  "db:seed": "tsx prisma/seed.ts",
  "db:studio": "prisma studio", 
  "db:push": "prisma db push"
}
```

### Tools Used
- **tsx**: TypeScript execution for seed script
- **Prisma Studio**: Database GUI (running on http://localhost:5555)
- **Prisma CLI**: Migration and schema management

## 🔧 Technical Decisions

### SQLite Benefits
- ✅ No installation required
- ✅ File-based database
- ✅ Perfect for development
- ✅ Easy backup/restore
- ✅ Cross-platform compatibility

### Schema Optimizations
- **Unique constraints**: Added to `title` field
- **Cascade deletes**: Proper relationship cleanup
- **Default values**: Timestamps and difficulty levels
- **String types**: Simplified for SQLite compatibility

## 📁 Files Created/Modified

### New Files
- `prisma/seed.ts` - Database seeding script
- `dev.db` - SQLite database file
- `docs/dev-logs/2-database-migrations.md` - This log

### Modified Files
- `prisma/schema.prisma` - SQLite compatibility
- `package.json` - Database management scripts

## 🚀 Database Status

### Current State
- **Database**: SQLite (dev.db)
- **Records**: 3 code smells seeded
- **Schema**: Fully migrated
- **Studio**: Running on port 5555

### Verification Commands
```bash
# Check database status
npx prisma db push

# View database in browser
npx prisma studio

# Reseed database
npm run db:seed
```

## 🔄 Next Steps
1. Create API routes for smells
2. Build smell detail pages
3. Implement search functionality
4. Add user authentication flow
5. Create admin panel for smell management

## 💡 Key Learnings
- SQLite is perfect for local development
- Prisma schema needs adjustment for different providers
- Seed scripts should use upsert for idempotency
- Database Studio is invaluable for development
- Unique constraints prevent duplicate data

## 🐛 Issues Resolved
- **PostgreSQL Installation**: Switched to SQLite
- **Schema Compatibility**: Removed PostgreSQL-specific types
- **Unique Constraints**: Added proper constraints
- **Seed Validation**: Fixed upsert requirements

## 📊 Performance
- **Migration Time**: ~4 seconds
- **Seed Time**: ~1 second
- **Database Size**: <1MB
- **Query Performance**: Excellent for development

---
**Next Log**: [3-api-routes-setup.md](./3-api-routes-setup.md)
