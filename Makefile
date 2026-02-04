# Makefile for MOH Website Docker Environment
# Provides convenient shortcuts for common Docker commands

.PHONY: help up down restart build rebuild logs clean install-fe install-be backup restore shell-fe shell-be shell-db status

# Colors for output
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[0;33m
NC := \033[0m # No Color

help: ## Show this help message
	@echo "$(BLUE)MOH Website - Docker Commands$(NC)"
	@echo ""
	@echo "$(GREEN)Usage:$(NC)"
	@echo "  make [command]"
	@echo ""
	@echo "$(GREEN)Available commands:$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-15s$(NC) %s\n", $$1, $$2}'

up: ## Start all services
	@echo "$(GREEN)Starting all services...$(NC)"
	docker-compose up

up-d: ## Start all services in detached mode (background)
	@echo "$(GREEN)Starting all services in background...$(NC)"
	docker-compose up -d

down: ## Stop and remove all containers
	@echo "$(YELLOW)Stopping all services...$(NC)"
	docker-compose down

stop: ## Stop all services without removing containers
	@echo "$(YELLOW)Stopping all services...$(NC)"
	docker-compose stop

restart: ## Restart all services
	@echo "$(YELLOW)Restarting all services...$(NC)"
	docker-compose restart

restart-fe: ## Restart frontend only
	@echo "$(YELLOW)Restarting frontend...$(NC)"
	docker-compose restart frontend

restart-be: ## Restart backend only
	@echo "$(YELLOW)Restarting backend...$(NC)"
	docker-compose restart backend

restart-db: ## Restart database only
	@echo "$(YELLOW)Restarting database...$(NC)"
	docker-compose restart database

build: ## Build all containers
	@echo "$(GREEN)Building all containers...$(NC)"
	docker-compose build

rebuild: ## Rebuild and start all containers
	@echo "$(GREEN)Rebuilding and starting all containers...$(NC)"
	docker-compose up --build

rebuild-fe: ## Rebuild frontend container
	@echo "$(GREEN)Rebuilding frontend...$(NC)"
	docker-compose build --no-cache frontend

rebuild-be: ## Rebuild backend container
	@echo "$(GREEN)Rebuilding backend...$(NC)"
	docker-compose build --no-cache backend

logs: ## View logs from all services
	docker-compose logs -f

logs-fe: ## View frontend logs
	docker-compose logs -f frontend

logs-be: ## View backend logs
	docker-compose logs -f backend

logs-db: ## View database logs
	docker-compose logs -f database

clean: ## Remove all containers, volumes, and networks
	@echo "$(YELLOW)⚠️  WARNING: This will delete all data!$(NC)"
	@echo "Press Ctrl+C to cancel, or Enter to continue..."
	@read confirm
	docker-compose down -v
	docker system prune -f

status: ## Show status of all containers
	@echo "$(BLUE)Container Status:$(NC)"
	docker-compose ps

shell-fe: ## Access frontend container shell
	@echo "$(GREEN)Accessing frontend container...$(NC)"
	docker-compose exec frontend sh

shell-be: ## Access backend container shell
	@echo "$(GREEN)Accessing backend container...$(NC)"
	docker-compose exec backend sh

shell-db: ## Access database container shell
	@echo "$(GREEN)Accessing database...$(NC)"
	docker-compose exec database psql -U strapi -d strapi

install-fe: ## Install npm package in frontend (usage: make install-fe PKG=package-name)
	@if [ -z "$(PKG)" ]; then \
		echo "$(YELLOW)Usage: make install-fe PKG=package-name$(NC)"; \
	else \
		echo "$(GREEN)Installing $(PKG) in frontend...$(NC)"; \
		docker-compose exec frontend npm install $(PKG); \
	fi

install-be: ## Install npm package in backend (usage: make install-be PKG=package-name)
	@if [ -z "$(PKG)" ]; then \
		echo "$(YELLOW)Usage: make install-be PKG=package-name$(NC)"; \
	else \
		echo "$(GREEN)Installing $(PKG) in backend...$(NC)"; \
		docker-compose exec backend npm install $(PKG); \
	fi

backup: ## Backup database to backup.sql
	@echo "$(GREEN)Creating database backup...$(NC)"
	docker-compose exec database pg_dump -U strapi strapi > backup.sql
	@echo "$(GREEN)Backup created: backup.sql$(NC)"

restore: ## Restore database from backup.sql
	@if [ ! -f backup.sql ]; then \
		echo "$(YELLOW)Error: backup.sql not found$(NC)"; \
		exit 1; \
	fi
	@echo "$(YELLOW)Restoring database from backup.sql...$(NC)"
	docker-compose exec -T database psql -U strapi -d strapi < backup.sql
	@echo "$(GREEN)Database restored$(NC)"

init: ## First-time setup (create apps and start containers)
	@echo "$(BLUE)Starting first-time setup...$(NC)"
	@echo ""
	@echo "$(GREEN)This will guide you through creating the Remix and Strapi apps$(NC)"
	@echo ""
	@echo "$(YELLOW)Step 1: Creating Remix frontend...$(NC)"
	@cd frontend && npx create-remix@latest . --template remix-run/remix/templates/remix
	@echo ""
	@echo "$(YELLOW)Step 2: Creating Strapi backend...$(NC)"
	@cd backend && npx create-strapi-app@latest . --quickstart --no-run
	@echo ""
	@echo "$(YELLOW)Step 3: Setting up environment variables...$(NC)"
	@cp .env.example .env
	@echo ""
	@echo "$(GREEN)Setup complete! Starting containers...$(NC)"
	@make rebuild

.DEFAULT_GOAL := help
