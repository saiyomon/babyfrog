#!/bin/bash
# Database setup script

echo "Setting up database for the Froggy App..."

# Check if database exists
if [ -n "$DATABASE_URL" ]; then
  echo "Database URL found in environment variables."
else
  echo "No DATABASE_URL found in environment variables."
  echo "Please set up a PostgreSQL database and set the DATABASE_URL environment variable."
  exit 1
fi

# Create migrations directory if it doesn't exist
mkdir -p migrations

# Run database schema push
echo "Pushing database schema..."
npm run db:push

# Run migrations
echo "Running migrations and creating indexes..."
node --loader tsx/esm scripts/migrate.js

echo "Database setup complete!"