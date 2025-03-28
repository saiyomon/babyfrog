#!/bin/sh
# Post-installation script that runs after deployment

echo "Running post-installation configuration..."

# Set up directories
mkdir -p uploads
mkdir -p logs
mkdir -p pgdata
mkdir -p backups

# Set permissions
chmod 777 uploads
chmod 777 logs
chmod 777 pgdata 
chmod 777 backups

# Create directory for temporary files
mkdir -p /tmp/froggy_app
chmod 777 /tmp/froggy_app

# Run database migrations if needed
if [ -n "$DATABASE_URL" ]; then
  echo "Database URL found, running migrations..."
  npm run migrate
else
  echo "No database URL found, skipping migrations."
fi

echo "Post-installation complete!"