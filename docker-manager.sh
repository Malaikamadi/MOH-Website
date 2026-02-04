#!/bin/bash

# MOH Website - Docker Environment Helper Script
# This script provides an interactive menu for managing your Docker environment

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_header() {
    echo -e "\n${BLUE}════════════════════════════════════════════${NC}"
    echo -e "${BLUE}   MOH Website - Docker Manager${NC}"
    echo -e "${BLUE}════════════════════════════════════════════${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${CYAN}ℹ $1${NC}"
}

# Check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker Desktop and try again."
        exit 1
    fi
}

# Main menu
show_menu() {
    print_header
    echo "Choose an option:"
    echo ""
    echo "  ${GREEN}1)${NC} Start all services"
    echo "  ${GREEN}2)${NC} Start all services (background)"
    echo "  ${GREEN}3)${NC} Stop all services"
    echo "  ${GREEN}4)${NC} Restart all services"
    echo "  ${GREEN}5)${NC} Rebuild and start"
    echo "  ${GREEN}6)${NC} View logs (all)"
    echo "  ${GREEN}7)${NC} View logs (specific service)"
    echo "  ${GREEN}8)${NC} Check service status"
    echo "  ${GREEN}9)${NC} Access container shell"
    echo "  ${GREEN}10)${NC} Install npm package"
    echo "  ${GREEN}11)${NC} Backup database"
    echo "  ${GREEN}12)${NC} Restore database"
    echo "  ${GREEN}13)${NC} Clean everything (⚠️  deletes data)"
    echo "  ${RED}0)${NC} Exit"
    echo ""
    read -p "Enter choice: " choice
    echo ""
}

# Start services
start_services() {
    print_info "Starting all services..."
    docker-compose up
}

start_services_detached() {
    print_info "Starting all services in background..."
    docker-compose up -d
    print_success "Services started!"
    print_info "Access points:"
    echo "  - Frontend: http://localhost:3000"
    echo "  - Backend: http://localhost:1337"
    echo "  - Database: localhost:5432"
}

# Stop services
stop_services() {
    print_info "Stopping all services..."
    docker-compose down
    print_success "Services stopped!"
}

# Restart services
restart_services() {
    print_info "Restarting all services..."
    docker-compose restart
    print_success "Services restarted!"
}

# Rebuild and start
rebuild_services() {
    print_info "Rebuilding and starting all services..."
    docker-compose up --build
}

# View all logs
view_logs() {
    print_info "Showing logs (Ctrl+C to exit)..."
    docker-compose logs -f
}

# View specific service logs
view_specific_logs() {
    echo "Choose service:"
    echo "  1) Frontend"
    echo "  2) Backend"
    echo "  3) Database"
    read -p "Enter choice: " service_choice
    
    case $service_choice in
        1) docker-compose logs -f frontend ;;
        2) docker-compose logs -f backend ;;
        3) docker-compose logs -f database ;;
        *) print_error "Invalid choice" ;;
    esac
}

# Check status
check_status() {
    print_info "Container Status:"
    docker-compose ps
}

# Access shell
access_shell() {
    echo "Choose container:"
    echo "  1) Frontend"
    echo "  2) Backend"
    echo "  3) Database (PostgreSQL)"
    read -p "Enter choice: " shell_choice
    
    case $shell_choice in
        1) docker-compose exec frontend sh ;;
        2) docker-compose exec backend sh ;;
        3) docker-compose exec database psql -U strapi -d strapi ;;
        *) print_error "Invalid choice" ;;
    esac
}

# Install package
install_package() {
    echo "Choose target:"
    echo "  1) Frontend"
    echo "  2) Backend"
    read -p "Enter choice: " target_choice
    read -p "Enter package name: " package_name
    
    case $target_choice in
        1)
            print_info "Installing $package_name in frontend..."
            docker-compose exec frontend npm install "$package_name"
            print_success "Package installed!"
            ;;
        2)
            print_info "Installing $package_name in backend..."
            docker-compose exec backend npm install "$package_name"
            print_success "Package installed!"
            ;;
        *)
            print_error "Invalid choice"
            ;;
    esac
}

# Backup database
backup_database() {
    print_info "Creating database backup..."
    docker-compose exec database pg_dump -U strapi strapi > backup.sql
    print_success "Backup created: backup.sql"
}

# Restore database
restore_database() {
    if [ ! -f backup.sql ]; then
        print_error "backup.sql not found!"
        return
    fi
    
    print_warning "This will overwrite the current database!"
    read -p "Continue? (y/N): " confirm
    
    if [[ $confirm == [yY] ]]; then
        print_info "Restoring database..."
        docker-compose exec -T database psql -U strapi -d strapi < backup.sql
        print_success "Database restored!"
    else
        print_info "Restore cancelled"
    fi
}

# Clean everything
clean_all() {
    print_warning "This will remove all containers, volumes, and data!"
    print_warning "This action CANNOT be undone!"
    read -p "Are you sure? (type 'yes' to confirm): " confirm
    
    if [[ $confirm == "yes" ]]; then
        print_info "Cleaning everything..."
        docker-compose down -v
        docker system prune -f
        print_success "Clean complete!"
    else
        print_info "Clean cancelled"
    fi
}

# Main loop
main() {
    check_docker
    
    while true; do
        show_menu
        
        case $choice in
            1) start_services ;;
            2) start_services_detached ;;
            3) stop_services ;;
            4) restart_services ;;
            5) rebuild_services ;;
            6) view_logs ;;
            7) view_specific_logs ;;
            8) check_status ;;
            9) access_shell ;;
            10) install_package ;;
            11) backup_database ;;
            12) restore_database ;;
            13) clean_all ;;
            0)
                print_info "Goodbye!"
                exit 0
                ;;
            *)
                print_error "Invalid choice!"
                ;;
        esac
        
        echo ""
        read -p "Press Enter to continue..."
    done
}

# Run main function
main
