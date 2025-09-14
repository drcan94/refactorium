# Supabase PostgreSQL Deployment Guide

Bu rehber Refactorium projesini Supabase PostgreSQL ile Vercel'e deploy etmek için gerekli adımları açıklar.

## 🗄️ Supabase Kurulumu

### 1. Supabase Projesi Oluşturma
1. [Supabase Dashboard](https://supabase.com/dashboard)'a gidin
2. "New Project" butonuna tıklayın
3. Proje adını `refactorium` olarak ayarlayın
4. Database password oluşturun ve kaydedin
5. Region olarak `Europe West (eu-west-1)` seçin

### 2. Database Connection Strings
Supabase dashboard'da Settings > Database bölümünden:

```env
# Connection pooling (for application)
DATABASE_URL="postgresql://postgres.bmhzffbvozfjllpmlxqd:[YOUR-PASSWORD]@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection (for migrations)
DIRECT_URL="postgresql://postgres.bmhzffbvozfjllpmlxqd:[YOUR-PASSWORD]@aws-1-eu-west-1.pooler.supabase.com:5432/postgres"
```

## 🔧 Local Development Setup

### 1. Environment Variables
`.env.local` dosyası oluşturun:

```env
# Supabase Database Configuration
DATABASE_URL="postgresql://postgres.bmhzffbvozfjllpmlxqd:[YOUR-PASSWORD]@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.bmhzffbvozfjllpmlxqd:[YOUR-PASSWORD]@aws-1-eu-west-1.pooler.supabase.com:5432/postgres"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# GitHub OAuth
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
```

### 2. Database Setup
```bash
# Prisma client'ı generate et
npm run db:generate

# Database schema'sını oluştur
npm run db:push

# Seed data'yı ekle
npm run db:seed
```

### 3. Existing Data Migration
Eğer SQLite'da mevcut verileriniz varsa:

```bash
# Migration script'ini çalıştır
npm run db:migrate-to-postgres
```

## 🚀 Vercel Deployment

### 1. Vercel CLI Setup
```bash
# Vercel CLI kur
npm i -g vercel

# Login ol
vercel login

# Proje oluştur
vercel
```

### 2. Environment Variables
Vercel dashboard'da aşağıdaki environment variables'ları ekleyin:

```env
DATABASE_URL=postgresql://postgres.bmhzffbvozfjllpmlxqd:[YOUR-PASSWORD]@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.bmhzffbvozfjllpmlxqd:[YOUR-PASSWORD]@aws-1-eu-west-1.pooler.supabase.com:5432/postgres
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-app.vercel.app
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

### 3. Database Migration (Production)
```bash
# Production database'e schema push
DATABASE_URL="your-production-database-url" npm run db:push

# Seed data ekle
DATABASE_URL="your-production-database-url" npm run db:seed
```

### 4. Deploy
```bash
# Production'a deploy et
vercel --prod
```

## 📊 Supabase Dashboard Features

### 1. Database Management
- **Table Editor**: Visual table management
- **SQL Editor**: Raw SQL queries
- **Database Backups**: Automatic backups
- **Real-time**: WebSocket connections

### 2. Authentication
- **User Management**: User accounts and sessions
- **Social Auth**: GitHub, Google, etc.
- **Row Level Security**: Database-level permissions

### 3. API
- **Auto-generated API**: REST and GraphQL
- **API Keys**: Secure access management
- **Rate Limiting**: Built-in protection

## 🔒 Security Best Practices

### 1. Row Level Security (RLS)
Supabase'de RLS policies ekleyin:

```sql
-- Enable RLS on users table
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON "User"
  FOR SELECT USING (auth.uid()::text = id);
```

### 2. Environment Variables
- Production password'ları güçlü yapın
- API keys'leri güvenli saklayın
- Regular password rotation yapın

### 3. Database Access
- Production database'e sadece gerekli kişiler erişsin
- Connection pooling kullanın
- Monitor database connections

## 🚨 Troubleshooting

### Common Issues

1. **Connection Pool Exhausted**
   ```bash
   # Connection string'de pgbouncer=true olduğundan emin olun
   # Supabase dashboard'da connection limitlerini kontrol edin
   ```

2. **Migration Failures**
   ```bash
   # Prisma client'ı yeniden generate edin
   npm run db:generate
   
   # Migration'ı yeniden çalıştırın
   npm run db:push
   ```

3. **Environment Variables**
   ```bash
   # Vercel'de environment variables'ları kontrol edin
   vercel env ls
   
   # Local'de .env.local dosyasını kontrol edin
   ```

## 📈 Performance Optimization

### 1. Connection Pooling
```javascript
// prisma/schema.prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")      // Pooled connection
  directUrl = env("DIRECT_URL")        // Direct connection
}
```

### 2. Query Optimization
```javascript
// Efficient queries with includes
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    preferences: true,
    favorites: {
      include: {
        smell: true
      }
    }
  }
});
```

### 3. Indexing
```sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_user_email ON "User"(email);
CREATE INDEX idx_smell_category ON "Smell"(category);
CREATE INDEX idx_user_smell_user_id ON "UserSmell"("userId");
```

## 🔄 Backup & Recovery

### 1. Automatic Backups
- Supabase otomatik günlük backup'lar alır
- 7 günlük backup history
- Point-in-time recovery

### 2. Manual Backups
```bash
# pg_dump ile manual backup
pg_dump "postgresql://postgres.bmhzffbvozfjllpmlxqd:[PASSWORD]@aws-1-eu-west-1.pooler.supabase.com:5432/postgres" > backup.sql
```

### 3. Data Export
```bash
# Prisma ile data export
npx prisma db seed
```

## 📞 Support

Sorun yaşarsanız:
- Supabase Docs: https://supabase.com/docs
- Prisma Docs: https://www.prisma.io/docs
- Vercel Docs: https://vercel.com/docs
- GitHub Issues: https://github.com/drcan94/refactorium/issues

## 🎯 Next Steps

1. **Monitoring**: Supabase dashboard'da metrics takip edin
2. **Scaling**: Connection limits ve plan limits'leri kontrol edin
3. **Security**: RLS policies ve API security'yi gözden geçirin
4. **Performance**: Query performance'ı optimize edin
