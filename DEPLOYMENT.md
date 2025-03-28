# Deployment Guide

This document provides detailed instructions for deploying the Froggy Friend application to various platforms.

## Prerequisites

- A PostgreSQL database (provided by your hosting platform or separately managed)
- Node.js environment for running the application
- Git for version control

## Environment Variables

Ensure these environment variables are set in your hosting platform:

- `DATABASE_URL`: Connection string for your PostgreSQL database
- `PORT` (optional): Port to run the application on (defaults to 5000)
- `NODE_ENV`: Set to "production" for production deployments

## Deployment Options

### Heroku

1. Create a Heroku account and install the Heroku CLI
2. Create a new Heroku app:
   ```
   heroku create your-app-name
   ```

3. Add PostgreSQL add-on:
   ```
   heroku addons:create heroku-postgresql:mini
   ```

4. Deploy your application:
   ```
   git push heroku main
   ```

5. The application will automatically run database migrations during startup

### Railway

1. Create a Railway account and connect your GitHub repository
2. Add a PostgreSQL database service
3. Add the following environment variables:
   - `DATABASE_URL`: Set to your Railway PostgreSQL connection string
   - `NODE_ENV`: Set to "production"
4. Deploy your application
5. The application will automatically run database migrations during startup

### Render

1. Create a Render account and connect your GitHub repository
2. Create a new Web Service
3. Configure the following settings:
   - Build Command: `npm ci && npm run build`
   - Start Command: `./scripts/postinstall.sh && npm start`
4. Add a PostgreSQL database service
5. Add the environment variables:
   - `DATABASE_URL`: Set to your Render PostgreSQL connection string
   - `NODE_ENV`: Set to "production"
6. Deploy your application

### DigitalOcean App Platform

1. Create a DigitalOcean account and connect your GitHub repository
2. Create a new App
3. Add a PostgreSQL database component
4. Configure the Web Service:
   - Build Command: `npm ci && npm run build`
   - Run Command: `./scripts/postinstall.sh && npm start`
5. Add the environment variables:
   - `DATABASE_URL`: Set to your DigitalOcean PostgreSQL connection string
   - `NODE_ENV`: Set to "production"
6. Deploy your application

### Docker Deployment

For deploying with Docker:

1. Build the Docker image:
   ```
   docker build -t froggy-friend-app .
   ```

2. Run the container:
   ```
   docker run -p 5000:5000 -e DATABASE_URL=your_postgres_connection_string -e NODE_ENV=production froggy-friend-app
   ```

3. Or use Docker Compose:
   ```
   docker-compose up -d
   ```

## Troubleshooting

### Database Connection Issues

If you encounter database connection issues:

1. Verify your `DATABASE_URL` is correctly formatted
2. Ensure your database is accessible from your hosting environment
3. Check if your hosting provider requires SSL for database connections

### Running Migrations Manually

If you need to run migrations manually:

```
npm run db:push
```

### Static Files Not Loading

If static files (images, CSS, JS) are not loading:

1. Check if your hosting provider handles static files differently
2. Ensure the build process completed successfully
3. Verify that the static files are being served from the correct location