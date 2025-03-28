#!/bin/bash
# Database backup script

# Exit on any error
set -e

# Get current date for filename
BACKUP_DATE=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILE="backups/backup_$BACKUP_DATE.sql"

# Create backups directory if it doesn't exist
mkdir -p backups

# Check for DATABASE_URL
if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL environment variable not set."
  exit 1
fi

# Extract DB connection info from DATABASE_URL
# Expected format: postgres://username:password@hostname:port/database
DB_URL_REGEX='postgres://([^:]+):([^@]+)@([^:]+):([0-9]+)/([^?]+)'

if [[ $DATABASE_URL =~ $DB_URL_REGEX ]]; then
  DB_USER="${BASH_REMATCH[1]}"
  DB_PASSWORD="${BASH_REMATCH[2]}"
  DB_HOST="${BASH_REMATCH[3]}"
  DB_PORT="${BASH_REMATCH[4]}"
  DB_NAME="${BASH_REMATCH[5]}"
else
  echo "Error: Could not parse DATABASE_URL"
  exit 1
fi

echo "Creating backup of database $DB_NAME to $BACKUP_FILE..."

# Use PGPASSWORD to avoid password prompt
export PGPASSWORD="$DB_PASSWORD"

# Dump the database, focusing only on essential tables
pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" \
  --format=plain \
  --schema-only \
  --no-owner \
  --no-privileges \
  > "$BACKUP_FILE"

# Now dump the data
pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" \
  --format=plain \
  --data-only \
  --table=images \
  --table=messages \
  --no-owner \
  --no-privileges \
  >> "$BACKUP_FILE"

# Clean up
unset PGPASSWORD

echo "Backup completed successfully: $BACKUP_FILE"
echo "Backup size: $(du -h "$BACKUP_FILE" | cut -f1)"