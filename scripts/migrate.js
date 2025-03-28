import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to migrations directory
const MIGRATIONS_DIR = path.join(__dirname, '..', 'migrations');

// Configure WebSocket for Neon
neonConfig.webSocketConstructor = ws;

// Database connection function
async function connectToDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  try {
    const pool = new Pool({ 
      connectionString: process.env.DATABASE_URL,
    });
    
    // Test the connection
    const client = await pool.connect();
    console.log('Successfully connected to database');
    
    // Return the client for further operations
    return client;
  } catch (error) {
    console.error('Failed to connect to database:', error.message);
    throw error;
  }
}

// Create indexes for better performance
async function createIndexes(client) {
  const indexes = [
    // Create indexes on frequently queried columns
    'CREATE INDEX IF NOT EXISTS idx_images_id ON images (id)',
    'CREATE INDEX IF NOT EXISTS idx_messages_id ON messages (id)',
    
    // Vacuum analyze to optimize the database
    'VACUUM ANALYZE'
  ];

  try {
    console.log('Creating indexes for performance optimization...');
    
    for (const indexSQL of indexes) {
      console.log(`Executing: ${indexSQL}`);
      await client.query(indexSQL);
    }
    
    console.log('Indexes created successfully');
  } catch (error) {
    console.error('Error creating indexes:', error.message);
    throw error;
  }
}

// Main migration function
async function runMigrations() {
  console.log('Running database migrations...');
  
  try {
    // Run drizzle-kit push to apply any schema changes
    console.log('Applying schema with drizzle-kit push...');
    execSync('npm run db:push', { stdio: 'inherit' });
    
    // Connect to the database and create indexes
    const client = await connectToDatabase();
    
    try {
      await createIndexes(client);
      console.log('Database optimization completed successfully!');
    } finally {
      // Always release the client
      client.release();
    }
    
    console.log('Database migration completed successfully!');
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1);
  }
}

// Execute the migration process
runMigrations();