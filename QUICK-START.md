# 🚀 Quick Start Guide

Get your MOH Website development environment running in minutes!

## Step-by-Step Setup

### 1️ Create Your Applications (First Time Only)

#### Create Remix Frontend
```bash
cd frontend
npx create-remix@latest . --template remix-run/remix/templates/remix
```

When prompted:
- Choose **"Just the basics"**
- Deployment target: **"Remix App Server"**
- Language: **Your preference** (TypeScript recommended)
- Install dependencies: **Yes**

#### Create Strapi Backend
```bash
cd ..
cd backend
npx create-strapi-app@latest . --quickstart --no-run
```

This will create a new Strapi project without running it immediately.

### 2️ Set Up Environment Variables

From the project root:
```bash
cp .env.example .env
```

> **Note**: For now, you can use the default values. For production, you MUST change these!

### 3️ Start Everything with Docker

From the project root:
```bash
docker-compose up --build
```

**What's happening?**
- 🐘 PostgreSQL database starts
- 🚀 Strapi backend builds and starts
- ⚛️ Remix frontend builds and starts

**First time will take 5-10 minutes** as Docker downloads images and installs dependencies.

### 4️ Access Your Applications

Once you see "Server started on port 1337" and "Remix server started":

- **Frontend**: Open http://localhost:3000
- **Strapi Admin**: Open http://localhost:1337/admin

##  You're Done!

### Create Your First Strapi Admin User

1. Go to http://localhost:1337/admin
2. Fill in the registration form
3. Click "Let's start"

### Start Developing

- Edit files in `frontend/` - changes reload automatically
- Edit files in `backend/` - Strapi reloads automatically
- Create content types in Strapi admin panel
- Build your Remix routes and components

##  Stop the Environment

Press `Ctrl+C` in the terminal, or run:
```bash
docker-compose down
```

## ▶ Start Again (After First Setup)

```bash
docker-compose up
```

No need for `--build` unless you change dependencies.

##  Useful Commands

```bash
# View logs
docker-compose logs -f

# Restart a service
docker-compose restart frontend

# Install a package in frontend
docker-compose exec frontend npm install <package>

# Install a package in backend
docker-compose exec backend npm install <package>

# Access database
docker-compose exec database psql -U strapi -d strapi
```

##  Something Wrong?

Check the logs:
```bash
docker-compose logs backend
docker-compose logs frontend
docker-compose logs database
```

For more help, see the full [README.md](README.md)

