# Development Log - 1: Local PostgreSQL Setup

**Date**: December 2024  
**Status**: 🔄 In Progress  
**Duration**: ~30 minutes

## 📋 Overview
Setting up local PostgreSQL database for development environment. Moving away from external database services to local development setup.

## 🎯 Goals
- [x] PostgreSQL installation guide
- [x] Database configuration
- [ ] Prisma migration setup
- [ ] Initial database seeding
- [ ] Connection testing

## 🐘 PostgreSQL Installation

### Windows Installation Steps
1. **Download**: Visit https://www.postgresql.org/download/windows/
2. **Install**: Run installer with default settings
   - Port: 5432 (default)
   - Superuser password: [Set strong password]
   - Locale: Turkish, Turkey (TR-TR)
3. **Verify**: `psql --version` command

### Docker Alternative (Recommended)
```bash
# Start PostgreSQL container
docker run --name refactorium-postgres \
  -e POSTGRES_DB=refactorium \
  -e POSTGRES_USER=refactorium \
  -e POSTGRES_PASSWORD=refactorium123 \
  -p 5432:5432 \
  -d postgres:16

# Check container status
docker ps
```

## 🔧 Database Configuration

### Environment Variables
```env
# Local PostgreSQL
DATABASE_URL="postgresql://refactorium:refactorium123@localhost:5432/refactorium"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
```

### Database Credentials
- **Database**: `refactorium`
- **Username**: `refactorium`
- **Password**: `refactorium123`
- **Host**: `localhost`
- **Port**: `5432`

## 📊 Schema Overview
Current Prisma schema includes:
- **User**: Authentication and profile data
- **Account**: OAuth provider accounts
- **Session**: User sessions
- **VerificationToken**: Email verification
- **Smell**: Code smell definitions
- **UserSmell**: User favorites
- **UserProgress**: Learning progress

## 🚀 Next Steps
1. Create database user and database
2. Run Prisma migrations
3. Seed initial data
4. Test database connection
5. Verify authentication flow

## 🔍 Troubleshooting

### Common Issues
- **Port conflict**: Ensure port 5432 is available
- **Permission denied**: Check user permissions
- **Connection refused**: Verify PostgreSQL service is running

### Useful Commands
```bash
# Check PostgreSQL status
pg_ctl status

# Connect to database
psql -U refactorium -d refactorium -h localhost

# List databases
\l

# List users
\du
```

## 📝 Notes
- Using PostgreSQL 16.x for latest features
- Docker approach recommended for consistency
- Environment variables properly configured
- Prisma schema ready for migration

---
**Next Log**: [2-database-migrations.md](./2-database-migrations.md)
