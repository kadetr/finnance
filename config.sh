#!/bin/bash

# Exit script if any command fails
set -e

# Function to echo in green color for success messages
echo_success() {
    echo -e "\033[0;32m$1\033[0m"
}

# Function to echo in yellow color for progress messages
echo_progress() {
    echo -e "\033[0;33m$1\033[0m"
}

# Setup Database
echo_progress "Setting up database..."
cd backend || { echo "Failed to change directory to backend"; exit 1; }
docker compose up -d

# Setup Backend
echo_progress "Setting up backend..."
npm install || { echo "npm install failed"; exit 1; }
echo_success "Done setting up backend."

# Setup Prisma
npx prisma migrate dev --name init

cd .. # Go back to the root directory

# Setup Frontend
echo_progress "Setting up frontend..."
cd frontend || { echo "Failed to change directory to frontend"; exit 1; }
npm install || { echo "npm install failed"; exit 1; }
echo_success "Done setting up frontend."

echo_success "Project is ready."
echo_success "1. Get a Finnhub API key"
echo_success "2. Set FINNHUB_API_KEY in 'backend/.env.example' file"

