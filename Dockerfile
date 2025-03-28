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

# Create uploads directory
RUN mkdir -p uploads && chmod 777 uploads
RUN chmod +x ./scripts/postinstall.sh

# Expose port
EXPOSE 5000

# Start with migrations and then the application
CMD ["sh", "-c", "./scripts/postinstall.sh && npm start"]