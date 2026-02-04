# Git Workflow Guide

## Branch Structure

We use a **feature branch workflow** with the following branches:

- **`main`** - Production-ready code (protected)
- **`frontend`** - Frontend development branch (maintained by Frontend Developer)
- **`backend`** - Backend development branch (maintained by Backend Developer)

## Team Responsibilities

### Frontend Developer (You)
- Works on the **`frontend`** branch
- Makes changes to:
  - `frontend/` directory
  - Frontend-related documentation
  - Docker configurations affecting frontend

### Backend Developer
- Works on the **`backend`** branch
- Makes changes to:
  - `backend/` directory
  - Backend-related documentation
  - Docker configurations affecting backend
  - Database configurations

## Daily Workflow

### 1. Start Your Day - Pull Latest from Main
```bash
# Switch to main and get latest code
git checkout main
git pull origin main

# Switch to your branch and merge main changes
git checkout frontend  # or 'backend' for backend developer
git merge main
```

### 2. Work on Features
```bash
# Make your changes in the appropriate directory
# frontend/ for frontend dev
# backend/ for backend dev

# Check what you changed
git status

# Add your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add user authentication form"
```

### 3. Push Your Work
```bash
# Push to your branch
git push origin frontend  # or 'backend' for backend developer
```

### 4. End of Day - Merge to Main
When you're ready to share your work with the team:

```bash
# First, make sure you have the latest main
git checkout main
git pull origin main

# Merge your branch into main
git merge frontend  # or 'backend' for backend developer

# Resolve any conflicts if they occur
# Then push to main
git push origin main
```

### 5. Notify Your Teammate
After pushing to main, let your teammate know so they can pull the latest changes.

## Commit Message Convention

Use clear, descriptive commit messages:

- **feat:** New feature
  - `feat: add login page`
  - `feat: implement user dashboard`

- **fix:** Bug fix
  - `fix: resolve navigation menu issue`
  - `fix: correct API endpoint URL`

- **style:** CSS/styling changes
  - `style: update header colors`
  - `style: make buttons responsive`

- **refactor:** Code refactoring
  - `refactor: reorganize component structure`
  - `refactor: simplify API calls`

- **docs:** Documentation
  - `docs: update README with new setup steps`
  - `docs: add API documentation`

- **chore:** Maintenance tasks
  - `chore: update dependencies`
  - `chore: add new npm packages`

## Handling Merge Conflicts

If you encounter merge conflicts:

```bash
# 1. Git will tell you which files have conflicts
git status

# 2. Open the conflicting files and look for:
<<<<<<< HEAD
Your code
=======
Their code
>>>>>>> branch-name

# 3. Edit the file to keep the correct code
# Remove the conflict markers (<<<<, ====, >>>>)

# 4. Mark as resolved
git add <conflicted-file>

# 5. Complete the merge
git commit -m "merge: resolve conflicts between frontend and backend"
```

## Quick Reference Commands

```bash
# See all branches
git branch -a

# See current branch
git branch

# Switch branches
git checkout <branch-name>

# Create new feature branch (from your main branch)
git checkout -b feature/new-feature

# See commit history
git log --oneline --graph --all

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard local changes
git checkout -- <file>

# See differences
git diff
```

## Collaboration Best Practices

1. **Pull Before You Push**
   - Always pull the latest main before merging your work

2. **Commit Often**
   - Small, focused commits are better than large ones
   - Makes it easier to track changes and resolve conflicts

3. **Test Before Merging**
   - Make sure your code works before merging to main
   - Run `docker-compose up` to test the full stack

4. **Communicate**
   - Let your teammate know when you push to main
   - Coordinate on changes that affect both frontend and backend

5. **Keep Branches Clean**
   - Delete feature branches after merging
   - Regularly merge main into your development branch

## Setting Up Remote Repository (GitHub/GitLab)

Once you create a remote repository:

```bash
# Add remote (only needed once)
git remote add origin <your-repo-url>

# Push all branches to remote
git push -u origin main
git push -u origin frontend
git push -u origin backend

# After initial setup, just use:
git push
git pull
```

## Emergency: Need to Undo Push to Main?

```bash
# Revert to previous commit
git revert HEAD

# Or reset (use with caution!)
git reset --hard HEAD~1
git push -f origin main
```

** Warning:** Only use force push if you're absolutely sure!

## Example Workflow Scenario

**Frontend Developer's Day:**
```bash
# Morning: Get latest code
git checkout main
git pull origin main
git checkout frontend
git merge main

# Work on new feature
# ... edit files in frontend/ ...
git add frontend/
git commit -m "feat: add navigation component"

# Test changes
docker-compose up

# End of day: Share work
git checkout main
git merge frontend
git push origin main

# Notify backend developer
# "Hey, I pushed new nav component to main!"
```

**Backend Developer's Day:**
```bash
# Morning: Pull frontend developer's changes
git checkout main
git pull origin main
git checkout backend
git merge main

# Work on API
# ... edit files in backend/ ...
git add backend/
git commit -m "feat: add user authentication API"

# Test changes
docker-compose up

# End of day: Share work
git checkout main
git merge backend
git push origin main


