# Vercel Deployment Guide

Bu rehber Refactorium projesini Vercel'e deploy etmek için gerekli adımları açıklar.

## ⚠️ SQLite Sınırlamaları

**ÖNEMLİ**: Vercel serverless ortamında SQLite kullanımı **önerilmez** çünkü:

- Her function çalıştığında yeni bir ortam oluşur
- Veriler kalıcı değildir ve function bittiğinde kaybolur
- Dosya sistemi geçicidir (`/tmp` klasörü sadece 512MB)

## 🗄️ Veritabanı Seçenekleri

### 1. Turso (Önerilen - SQLite uyumlu)
```bash
# Turso CLI kurulumu
curl -sSfL https://get.tur.so/install.sh | bash

# Veritabanı oluştur
turso db create refactorium

# Bağlantı URL'ini al
turso db show refactorium --url
```

### 2. Vercel Postgres
```bash
# Vercel dashboard'dan Postgres ekle
# Veya CLI ile:
vercel env add DATABASE_URL
```

### 3. PlanetScale (MySQL)
```bash
# PlanetScale hesabı oluştur
# Yeni database oluştur
# Connection string'i al
```

## 🚀 Deployment Adımları

### 1. Vercel CLI Kurulumu
```bash
npm i -g vercel
vercel login
```

### 2. Proje Ayarları
```bash
# Vercel projesi oluştur
vercel

# Environment variables ayarla
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL
vercel env add GITHUB_ID
vercel env add GITHUB_SECRET
vercel env add DATABASE_URL
```

### 3. Environment Variables

Vercel dashboard'da aşağıdaki environment variables'ları ayarlayın:

```env
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-app.vercel.app
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
DATABASE_URL=your-database-connection-string
```

### 4. Database Migration

Production veritabanı için:

```bash
# Turso için
DATABASE_URL="libsql://your-turso-url" npx prisma db push

# Vercel Postgres için
DATABASE_URL="postgresql://..." npx prisma db push

# PlanetScale için
DATABASE_URL="mysql://..." npx prisma db push
```

### 5. Seed Data (Opsiyonel)

```bash
DATABASE_URL="your-production-db-url" npm run db:seed
```

## 🔧 Konfigürasyon Dosyaları

### vercel.json
```json
{
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "env": {
    "DATABASE_URL": "@database_url"
  }
}
```

### next.config.mjs
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client']
  },
  output: 'standalone'
}

export default nextConfig
```

## 📊 Monitoring ve Analytics

### Vercel Analytics
```bash
npm install @vercel/analytics
```

### Error Tracking
```bash
npm install @sentry/nextjs
```

## 🔒 Güvenlik

### Environment Variables
- Tüm sensitive bilgileri environment variables olarak saklayın
- `.env.local` dosyasını git'e commit etmeyin
- Vercel dashboard'dan environment variables'ları ayarlayın

### NextAuth
```javascript
// pages/api/auth/[...nextauth].js
export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
})
```

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Error**
   ```bash
   # Connection string'i kontrol et
   echo $DATABASE_URL
   
   # Prisma client'ı yeniden generate et
   npx prisma generate
   ```

2. **Build Error**
   ```bash
   # Dependencies'leri kontrol et
   npm install
   
   # Prisma generate
   npx prisma generate
   
   # Build test
   npm run build
   ```

3. **Environment Variables**
   ```bash
   # Vercel'de environment variables'ları kontrol et
   vercel env ls
   ```

## 📈 Performance Optimization

### Prisma Optimizations
```javascript
// prisma/client.js
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### Caching
```javascript
// API routes'da caching
export const revalidate = 3600 // 1 hour
```

## 🎯 Best Practices

1. **Database**: Production'da SQLite yerine PostgreSQL/MySQL kullanın
2. **Environment**: Tüm sensitive bilgileri environment variables olarak saklayın
3. **Monitoring**: Error tracking ve analytics ekleyin
4. **Performance**: Database queries'leri optimize edin
5. **Security**: HTTPS ve secure headers kullanın

## 📞 Support

Sorun yaşarsanız:
- Vercel docs: https://vercel.com/docs
- Prisma docs: https://www.prisma.io/docs
- GitHub Issues: https://github.com/drcan94/refactorium/issues
