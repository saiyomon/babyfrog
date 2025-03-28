FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Copy scripts and migrations
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/migrations ./migrations

# Create data directories with proper permissions
RUN mkdir -p uploads && chmod 777 uploads
RUN mkdir -p pgdata && chmod 777 pgdata
RUN chmod +x ./scripts/postinstall.sh

# Create a data management script
RUN echo '#!/bin/sh' > /app/scripts/clean-data.sh && \
    echo 'echo "Cleaning up old data to free space..."' >> /app/scripts/clean-data.sh && \
    echo 'find /app/uploads -type f -mtime +90 -delete' >> /app/scripts/clean-data.sh && \
    echo 'echo "Done cleaning up old data."' >> /app/scripts/clean-data.sh && \
    chmod +x /app/scripts/clean-data.sh

# Add crontab for automatic data cleanup
RUN apk add --no-cache dcron && \
    echo "0 3 * * 0 /app/scripts/clean-data.sh >> /app/cleanup.log 2>&1" | crontab -

# Set environment variables for storage
ENV UPLOAD_MAX_FILE_SIZE=10485760
ENV UPLOAD_MAX_FILES=500
ENV PG_MAX_CONNECTIONS=20

# Expose port
EXPOSE 5000

# Start with migrations and then the application
CMD ["sh", "-c", "./scripts/postinstall.sh && crond -f -d 8 & npm start"]