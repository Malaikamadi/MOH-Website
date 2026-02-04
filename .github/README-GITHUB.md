# MOH Website - Ministry of Health

**Full-stack web application with Docker development environment**

[![Repository](https://img.shields.io/badge/GitHub-MOH--Website-blue)](https://github.com/Malaikamadi/MOH-Website)

---

##  Quick Links

- **Repository**: https://github.com/Malaikamadi/MOH-Website
- **Documentation**: See [README.md](../README.md)
- **Quick Start**: See [QUICK-START.md](../QUICK-START.md)
- **Git Workflow**: See [GIT-WORKFLOW.md](../GIT-WORKFLOW.md)

---

##  Branch Structure

### Main Branches

- **`main`** - Production-ready code (protected)
- **`frontend`** - Frontend development (React + Vite)
- **`backend`** - Backend development (Strapi CMS)

### How to Clone & Setup

**For Frontend Developer:**
```bash
git clone https://github.com/Malaikamadi/MOH-Website.git
cd MOH-Website
git checkout frontend
```

**For Backend Developer:**
```bash
git clone https://github.com/Malaikamadi/MOH-Website.git
cd MOH-Website
git checkout backend
```

---

##  Tech Stack

| Component | Technology | Port |
|-----------|-----------|------|
| **Frontend** | Vite + React + TypeScript | 5173 |
| **Backend** | Strapi CMS | 1337 |
| **Database** | PostgreSQL 15 | 5432 |
| **Container** | Docker + Docker Compose | - |

---

## 👥 Team Collaboration

### Frontend Developer
- **Branch**: `frontend`
- **Workspace**: `frontend/` directory
- **Responsibilities**: UI/UX, React components, frontend logic

### Backend Developer  
- **Branch**: `backend`
- **Workspace**: `backend/` directory
- **Responsibilities**: Strapi CMS, API, database schema

### Workflow
1. Pull latest from `main` daily
2. Work in your feature branch
3. Merge to `main` when ready
4. Push to GitHub
5. Notify teammate

See [GIT-WORKFLOW.md](../GIT-WORKFLOW.md) for detailed workflow.

---

##  Project Structure

```
MOH-Website/
├── frontend/          # React + Vite application
├── backend/           # Strapi CMS
├── docker-compose.yml # Container orchestration
├── Makefile          # Convenience commands
└── Documentation/
    ├── README.md
    ├── QUICK-START.md
    ├── GIT-WORKFLOW.md
    └── TROUBLESHOOTING.md
```

---

##  Getting Started

### Prerequisites
- Docker Desktop
- Git
- Node.js 20+ (for local development)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Malaikamadi/MOH-Website.git
   cd MOH-Website
   ```

2. **Checkout your branch**
   ```bash
   # Frontend developer
   git checkout frontend
   
   # Backend developer
   git checkout backend
   ```

3. **Start Docker**
   ```bash
   make up
   ```

4. **Access the applications**
   - Frontend: http://localhost:5173
   - Backend Admin: http://localhost:1337/admin

For detailed instructions, see [QUICK-START.md](../QUICK-START.md)

---

## Documentation

- **[README.md](../README.md)** - Complete setup guide
- **[QUICK-START.md](../QUICK-START.md)** - Get started in 5 minutes
-**[GIT-WORKFLOW.md](../GIT-WORKFLOW.md)** - Team collaboration workflow
- **[TROUBLESHOOTING.md](../TROUBLESHOOTING.md)** - Common issues & fixes
- **[SETUP-COMPLETE.md](../SETUP-COMPLETE.md)** - Environment overview

---

##  Contributing

### For Team Members

1. **Pull latest changes**
   ```bash
   git checkout main
   git pull origin main
   git checkout <your-branch>
   git merge main
   ```

2. **Make your changes**
   ```bash
   # Work in your directory
   git add .
   git commit -m "feat: your feature description"
   ```

3. **Share your work**
   ```bash
   git checkout main
   git merge <your-branch>
   git push origin main
   ```

4. **Notify your teammate** that you've pushed to main

---

## 📞 Support

- **Issues**: [Create an issue](https://github.com/Malaikamadi/MOH-Website/issues)
- **Documentation**: Check docs in the repository
- **Troubleshooting**: See [TROUBLESHOOTING.md](../TROUBLESHOOTING.md)

---



---


