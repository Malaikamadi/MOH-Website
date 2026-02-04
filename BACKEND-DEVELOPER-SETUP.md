# Backend Developer Setup Guide

**Welcome to the MOH Website Project!**

This guide will help you clone the repository, set up your development environment, and start working on the backend.

---

## 📋 Prerequisites

Before you begin, make sure you have:

- [ ] **Git** installed on your computer
- [ ] **Docker Desktop** installed ([Download here](https://www.docker.com/products/docker-desktop))
- [ ] **GitHub account** with access to the repository
- [ ] Basic knowledge of Strapi CMS

---

## 🚀 Getting Started

### Step 1: Clone the Repository

Open your terminal and run:

```bash
# Clone the repository
git clone https://github.com/Malaikamadi/MOH-Website.git

# Navigate into the project
cd MOH-Website
```

### Step 2: Switch to Backend Branch

```bash
# Switch to your working branch
git checkout backend

# Verify you're on the backend branch
git branch
# You should see: * backend
```

### Step 3: Start Docker Desktop

1. Open **Docker Desktop** application
2. Wait for it to fully start (you'll see the whale icon in your menu bar)
3. Verify it's running (the whale icon should be steady, not spinning)

### Step 4: Start the Development Environment

```bash
# Start all services (database, backend, frontend)
make up
```

**What happens:**
- PostgreSQL database starts
- Strapi backend starts and installs dependencies
- Frontend starts (runs automatically)
- First time will take 5-10 minutes

### Step 5: Access Strapi Admin

Once you see "Strapi started successfully" in the terminal:

1. Open your browser and go to: **http://localhost:1337/admin**
2. Create your first admin account:
   - Choose a username
   - Enter your email
   - Choose a strong password
3. Click "Let's start"

✅ **You're ready to develop!**

---

## 📁 Your Workspace

**You should only work in the `backend/` directory:**

```
MOH-Website/
├── backend/              ← YOUR WORKSPACE
│   ├── config/          ← Strapi configuration
│   ├── src/
│   │   ├── api/        ← Your API endpoints
│   │   ├── admin/      ← Admin panel customizations
│   │   └── index.ts    ← Entry point
│   ├── database/       ← Database migrations
│   ├── public/         ← Upload files
│   ├── Dockerfile      ← Backend container config
│   └── package.json    ← Dependencies
│
├── frontend/            ← Frontend developer's workspace (don't edit)
├── docker-compose.yml   ← Container orchestration (shared)
└── Documentation/       ← Read these!
```

---

## 🔄 Daily Git Workflow

### Morning - Start Your Day

```bash
# 1. Switch to main branch
git checkout main

# 2. Pull latest changes from GitHub
git pull origin main

# 3. Switch back to your backend branch
git checkout backend

# 4. Merge latest changes from main into your branch
git merge main

# 5. If there are conflicts, resolve them (see below)

# 6. Start development
make up
```

### During the Day - Making Changes

```bash
# 1. Make your changes in backend/ directory
# ... edit files, create content types, etc ...

# 2. Check what you changed
git status

# 3. Add your changes
git add backend/

# 4. Commit with a descriptive message
git commit -m "feat: add user authentication API"
```

**Commit Message Convention:**
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `docs:` - Documentation changes

### End of Day - Share Your Work

```bash
# 1. Make sure all changes are committed
git status
# Should say: "nothing to commit, working tree clean"

# 2. Switch to main branch
git checkout main

# 3. Merge your backend work into main
git merge backend

# 4. Push to GitHub
git push origin main

# 5. Switch back to backend branch for tomorrow
git checkout backend

# 6. Notify frontend developer that you pushed to main
```

---

## 🔀 Handling Merge Conflicts

If you see a conflict message when merging:

```bash
# 1. Git will tell you which files have conflicts
git status

# 2. Open the conflicting files
# Look for these markers:
# <<<<<<< HEAD
# Your code
# =======
# Their code
# >>>>>>> branch-name

# 3. Edit the file to keep the correct code
# Remove the conflict markers (<<<<, ====, >>>>)

# 4. Mark as resolved
git add <conflicted-file>

# 5. Complete the merge
git commit -m "merge: resolve conflicts with frontend changes"
```

---

## 🛠️ Useful Commands

### Docker Commands

```bash
make up              # Start all services
make down            # Stop all services
make logs-be         # View backend logs
make restart-be      # Restart backend only
make shell-be        # Access backend container shell
make rebuild-be      # Rebuild backend container
```

### Git Commands

```bash
git status           # Check current status
git log --oneline    # See commit history
git diff             # See what changed
git branch           # List all branches
```

### Installing Backend Dependencies

```bash
# If you need to add a new npm package
make install-be PKG=package-name

# Or access the container and install manually
make shell-be
npm install package-name
exit
```

---

## 🎯 Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| **Strapi Admin** | http://localhost:1337/admin | Manage content types and data |
| **Strapi API** | http://localhost:1337/api | Your API endpoints |
| **Frontend** | http://localhost:5173 | Frontend preview (auto-runs) |
| **Database** | localhost:5432 | PostgreSQL (use DB client) |

---

## 📚 Important Documentation

**Read these files in the repository:**

1. **GIT-WORKFLOW.md** - Detailed collaboration workflow ⭐
2. **README.md** - Full project documentation
3. **QUICK-START.md** - Quick setup reference
4. **TROUBLESHOOTING.md** - Common issues and fixes

---

## ⚠️ Important Rules

### ✅ DO:
- Work only in the `backend/` directory
- Pull from `main` every morning
- Commit often with clear messages
- Push to `main` at end of day
- Notify frontend developer when you push
- Test your changes before pushing

### ❌ DON'T:
- Edit files in `frontend/` directory
- Push directly to `main` from other branches (always merge first)
- Commit to `main` branch directly (work in `backend` branch)
- Force push (`git push -f`) unless absolutely necessary
- Commit `node_modules/` or `.env` files

---

## 🔐 Security

- The `.env` file contains sensitive data and is **gitignored**
- Use `.env.example` as a template
- Never commit passwords or API keys
- Change default credentials before production

---

## 🐛 Troubleshooting

### Docker Won't Start
```bash
# Make sure Docker Desktop is running
# Check the whale icon in your menu bar

# Try restarting Docker Desktop
# Or restart containers:
make down
make up
```

### Port Already in Use
```bash
# Check what's using the port
lsof -i :1337  # for backend
lsof -i :5432  # for database

# Kill the process or change ports in docker-compose.yml
```

### Backend Won't Start
```bash
# Check logs
make logs-be

# Rebuild backend
make rebuild-be
```

### Database Connection Issues
```bash
# Restart database
make restart-db

# Then restart backend
make restart-be
```

### Git Merge Conflicts
```bash
# Abort the merge and try again
git merge --abort

# Or resolve conflicts manually (see "Handling Merge Conflicts" above)
```

---

## 💬 Communication with Frontend Developer

**When to notify the frontend developer:**

1. ✅ After pushing to `main` branch
2. ✅ When you add new API endpoints
3. ✅ When you change the database schema
4. ✅ When you update environment variables
5. ✅ Before making changes to `docker-compose.yml`

**How to communicate:**
- Use GitHub issues for bug reports
- Document API changes in comments
- Update README if you add new features

---

## 📞 Getting Help

- **Check logs**: `make logs-be`
- **Read docs**: See `GIT-WORKFLOW.md` and `TROUBLESHOOTING.md`
- **Ask frontend developer**: For coordination issues
- **GitHub Issues**: For project-specific problems

---

## ✅ Quick Checklist

Before you start coding:
- [ ] Docker Desktop is running
- [ ] You're on the `backend` branch
- [ ] You've pulled latest from `main`
- [ ] Containers are running (`make up`)
- [ ] Strapi admin is accessible at http://localhost:1337/admin

Before you finish for the day:
- [ ] All changes are committed
- [ ] Changes are merged to `main`
- [ ] Changes are pushed to GitHub
- [ ] Frontend developer is notified

---

## 🎊 You're All Set!

Your backend development environment is ready. Start building amazing APIs with Strapi!

**Quick Start Commands:**
```bash
git checkout backend    # Switch to your branch
make up                # Start everything
# Open http://localhost:1337/admin
# Start coding in backend/ directory
```

**Happy Coding! 🚀**
