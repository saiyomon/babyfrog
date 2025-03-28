# Deployment Guide

This document provides instructions for deploying the "Smol Dumplings Safe Zone" application, an interactive web application featuring a cute pixel art frog character that generates personalized messages and displays custom images.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Deployment Options](#deployment-options)
  - [Option 1: Docker Compose (Recommended)](#option-1-docker-compose-recommended)
  - [Option 2: Manual Deployment](#option-2-manual-deployment)
  - [Option 3: Cloud Deployment](#option-3-cloud-deployment)
- [Database Setup](#database-setup)
- [Backup and Maintenance](#backup-and-maintenance)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- Node.js (v18 or later)
- PostgreSQL (v15 or later)
- Docker and Docker Compose (for containerized deployment)
- 1GB+ RAM for comfortable operation
- At least 1GB of storage space (more if many images will be uploaded)

## Environment Variables

Create a `.env` file based on the `.env.example` template:

```
# Database connection
DATABASE_URL=postgresql://username:password@localhost:5432/database_name

# Database pool configuration for handling large datasets
PG_MAX_CONNECTIONS=20

# File upload configuration
UPLOAD_MAX_FILE_SIZE=10485760   # 10MB limit for image uploads
UPLOAD_MAX_FILES=500            # Maximum number of files the app can store

# Port configuration (optional, defaults to 5000)
PORT=5000

# Node environment 
NODE_ENV=production
```

## Deployment Options

### Option 1: Docker Compose (Recommended)

The easiest way to deploy the application is using Docker Compose, which sets up both the application and a PostgreSQL database.

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd froggy-app
   ```

2. Create necessary directories:
   ```bash
   mkdir -p pgdata uploads logs backups
   chmod 777 pgdata uploads logs backups
   ```

3. Start the application stack:
   ```bash
   docker-compose up -d
   ```

4. Access the application at http://localhost:5000

### Option 2: Manual Deployment

If you prefer to run the application directly:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd froggy-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the application:
   ```bash
   npm run build
   ```

4. Set up your PostgreSQL database and update the DATABASE_URL in your .env file.

5. Run database migrations:
   ```bash
   npm run migrate
   ```

6. Start the application:
   ```bash
   npm start
   ```

7. Access the application at http://localhost:5000 (or the port you configured)

### Option 3: Cloud Deployment

#### Deploying to Replit

1. Create a new Replit project using the repository URL
2. Configure the PostgreSQL database in Replit
3. Set the necessary environment variables in the Secrets tool
4. Run the application with the "Run" button

## Database Setup

The application uses PostgreSQL for data storage. The database schema will be automatically created when you run:

```bash
npm run migrate
```

This command creates the necessary tables and indexes for optimal performance.

## Backup and Maintenance

### Automated Backups

When using Docker Compose, backups are automatically scheduled daily and stored in the `backups` directory.

To manually trigger a backup:

```bash
docker-compose exec backup /backup.sh
```

### Database Maintenance

For routine maintenance and optimization:

```bash
# Connect to the PostgreSQL container
docker-compose exec postgres psql -U postgres -d froggy_app

# Then run maintenance functions
SELECT maintain_indexes();
```

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Check if your PostgreSQL service is running
   - Verify DATABASE_URL format and credentials
   - Ensure network connectivity between app and database

2. **Upload Issues**
   - Check if the `uploads` directory exists and has appropriate permissions
   - Verify that UPLOAD_MAX_FILE_SIZE is not set too low
   - Check if you've hit the UPLOAD_MAX_FILES limit

3. **Performance Problems**
   - Consider increasing PG_MAX_CONNECTIONS for more concurrent users
   - Check disk space for uploads and database
   - Optimize the PostgreSQL settings in docker-compose.yml

For additional help, check the logs in the `logs` directory.