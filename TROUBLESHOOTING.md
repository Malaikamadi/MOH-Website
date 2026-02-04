# MOH Website - Troubleshooting Guide

## Quick Local Setup (Faster than Docker)

If Docker build is slow, run the apps locally:

### 1. Start PostgreSQL Database
```bash
docker-compose up database
```

### 2. Start Backend (Strapi) - in new terminal
```bash
cd backend
npm install
npm run develop
```
Backend will run at: http://localhost:1337

### 3. Start Frontend (Vite React) - in new terminal
```bash
cd frontend
npm install
npm run dev
```
Frontend will run at: http://localhost:5173

---

## Docker Setup

### Build Docker Images
```bash
docker-compose build
```

### Start All Services
```bash
docker-compose up
```

### Stop All Services
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f
```

### Rebuild After Changes
```bash
docker-compose down
docker-compose build
docker-compose up
```

---

## Common Issues

### Issue: "Cannot find module 'pg'"
**Solution**: Install PostgreSQL driver
```bash
cd backend
npm install pg
```

### Issue: Node version warnings
**Solution**: Use Node 20+
- Update Dockerfiles to use `FROM node:20-bullseye`
- Or install Node 20 locally via nvm:
  ```bash
  nvm install 20
  nvm use 20
  ```

### Issue: Port already in use
**Solution**: Kill the process using the port
```bash
# Kill process on port 1337 (Strapi)
lsof -ti:1337 | xargs kill -9

# Kill process on port 5173 (Vite)
lsof -ti:5173 | xargs kill -9

# Kill process on port 5432 (PostgreSQL)
lsof -ti:5432 | xargs kill -9
```

### Issue: Docker build stuck/slow
**Solution**:
1. Cancel the build (Ctrl+C)
2. Clear Docker cache:
   ```bash
   docker system prune -a
   ```
3. Rebuild:
   ```bash
   docker-compose build --no-cache
   ```

---

## Environment Variables

### Backend (.env)
Create `backend/.env`:
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi_password
DATABASE_SSL=false
```

### Frontend (.env)
Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:1337
```

---

## Accessing the Applications

- **Frontend**: http://localhost:5173
- **Backend Admin**: http://localhost:1337/admin
- **Backend API**: http://localhost:1337/api
- **PostgreSQL**: localhost:5432

### First-time Strapi Setup
1. Go to http://localhost:1337/admin
2. Create your first admin user
3. Start building your content types

---

## Useful Commands

### Check Docker Status
```bash
docker-compose ps
```

### Restart a Single Service
```bash
docker-compose restart backend
docker-compose restart frontend
```

### View Service Logs
```bash
docker-compose logs backend
docker-compose logs frontend
docker-compose logs database
```

### Access Container Shell
```bash
docker exec -it moh-backend sh
docker exec -it moh-frontend sh
docker exec -it moh-postgres sh
```

### Clean Everything and Start Fresh
```bash
docker-compose down -v
docker system prune -a
docker-compose build
docker-compose up
```
