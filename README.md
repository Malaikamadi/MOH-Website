# MOH Website - Docker Development Environment

A complete Docker-based development environment for a Remix React frontend and Strapi backend with PostgreSQL database.

##  Architecture

- **Frontend**: Remix + React (Port 3000)
- **Backend**: Strapi CMS (Port 1337)
- **Database**: PostgreSQL 15 (Port 5432)

##  Prerequisites

- Docker Desktop installed ([Download here](https://www.docker.com/products/docker-desktop))
- Docker Compose (included with Docker Desktop)
- Git (optional, for version control)

## First-Time Setup

### 1. Create Your Applications

If you don't have existing Remix and Strapi applications, create them:

#### Create Remix Frontend
```bash
cd frontend
npx create-remix@latest . --template remix-run/remix/templates/remix
# Choose "Just the basics" when prompted
# Choose "Remix App Server" for deployment target
# Choose "TypeScript" or "JavaScript" based on preference
# Choose "Yes" to install dependencies
```

#### Create Strapi Backend
```bash
cd backend
npx create-strapi-app@latest . --quickstart --no-run
```

### 2. Configure Environment Variables

Copy the example environment file:
```bash
cp .env.example .env
```

**IMPORTANT**: For production, generate secure random strings for all the keys in `.env`:
```bash
# Generate secure keys (on macOS/Linux)
openssl rand -base64 32
```

Replace the `toBeModified` values with generated keys.

##  Quick Start

### Start All Services
```bash
docker-compose up
```

Or run in detached mode (background):
```bash
docker-compose up -d
```

### First-Time Container Build (or after dependency changes)
```bash
docker-compose up --build
```

### Access Your Applications

- **Frontend (Remix)**: http://localhost:3000
- **Backend (Strapi Admin)**: http://localhost:1337/admin
- **PostgreSQL Database**: localhost:5432

##  Common Commands

### View Running Containers
```bash
docker-compose ps
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f database
```

### Stop All Services
```bash
docker-compose stop
```

### Stop and Remove Containers (keeps volumes/data)
```bash
docker-compose down
```

### Stop and Remove Everything (including data)
```bash
docker-compose down -v
```

### Restart a Specific Service
```bash
docker-compose restart frontend
docker-compose restart backend
```

### Rebuild Containers
```bash
# Rebuild all
docker-compose build

# Rebuild specific service
docker-compose build frontend
docker-compose build backend

# Rebuild and start
docker-compose up --build
```

### Execute Commands Inside Containers
```bash
# Access frontend container shell
docker-compose exec frontend sh

# Access backend container shell
docker-compose exec backend sh

# Access database
docker-compose exec database psql -U strapi -d strapi

# Run npm commands
docker-compose exec frontend npm install <package>
docker-compose exec backend npm install <package>
```

## 🔄 Hot Reload

Both frontend and backend support hot reload:

- **Frontend**: Files in `./frontend` are mounted. Changes are reflected immediately.
- **Backend**: Files in `./backend` are mounted. Strapi will auto-reload on changes.

## 📁 Project Structure

```
MOH-Website/
├── frontend/                 # Remix React application
│   ├── app/                 # Remix app directory
│   ├── public/              # Static files
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
├── backend/                 # Strapi application
│   ├── src/                # Strapi source code
│   ├── config/             # Strapi configuration
│   ├── database/           # Database files (if using SQLite locally)
│   ├── public/             # Uploads and public files
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
├── docker-compose.yml      # Docker orchestration
├── .env.example           # Environment variables template
├── .env                   # Your local environment (git-ignored)
└── README.md             # This file
```

## 🗄️ Database Management

### Access PostgreSQL CLI
```bash
docker-compose exec database psql -U strapi -d strapi
```

### Backup Database
```bash
docker-compose exec database pg_dump -U strapi strapi > backup.sql
```

### Restore Database
```bash
docker-compose exec -T database psql -U strapi -d strapi < backup.sql
```

### View Database Logs
```bash
docker-compose logs database
```

## 🐛 Troubleshooting

### Port Already in Use
If you see "port already allocated" errors:
```bash
# Check what's using the port
lsof -i :3000  # for frontend
lsof -i :1337  # for backend
lsof -i :5432  # for database

# Kill the process or change the port in docker-compose.yml
```

### Permission Issues
If you encounter permission errors:
```bash
# On macOS/Linux, fix ownership
sudo chown -R $USER:$USER frontend backend
```

### Clear Everything and Start Fresh
```bash
# Stop all containers
docker-compose down -v

# Remove all unused containers, networks, images
docker system prune -a

# Rebuild from scratch
docker-compose up --build
```

### Container Won't Start
```bash
# Check logs for errors
docker-compose logs backend
docker-compose logs frontend
docker-compose logs database

# Rebuild specific service
docker-compose build --no-cache backend
```

### Database Connection Issues
```bash
# Check if database is healthy
docker-compose ps

# Restart database and backend
docker-compose restart database
docker-compose restart backend
```

##  Security Notes

1. **Never commit `.env` to version control** - Add it to `.gitignore`
2. **Change all default passwords and secrets** before deploying to production
3. **Use strong, randomly generated keys** for JWT secrets and API tokens
4. **Limit database port exposure** in production (remove ports mapping for database service)

## Adding npm Packages

### To Frontend
```bash
# While containers are running
docker-compose exec frontend npm install <package-name>

# Or add to package.json and rebuild
docker-compose build frontend
```

### To Backend
```bash
# While containers are running
docker-compose exec backend npm install <package-name>

# Or add to package.json and rebuild
docker-compose build backend
```

## Production Deployment

For production deployment, you'll need to:

1. Create production Dockerfiles (without dev dependencies)
2. Use environment-specific configuration
3. Set up proper secrets management
4. Configure reverse proxy (nginx)
5. Set up SSL certificates
6. Use managed database service
7. Implement proper logging and monitoring

##  Additional Resources

- [Remix Documentation](https://remix.run/docs)
- [Strapi Documentation](https://docs.strapi.io)
- [Docker Documentation](https://docs.docker.com)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)

