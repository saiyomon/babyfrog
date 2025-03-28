import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";
import { log } from "./vite";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Configure connection pool with optimized settings for handling larger datasets
const maxConnections = parseInt(process.env.PG_MAX_CONNECTIONS || "20", 10);
log(`PostgreSQL max connections: ${maxConnections}`);

export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  max: maxConnections,             // Maximum number of clients the pool should contain
  idleTimeoutMillis: 30000,        // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 5000,   // How long to wait for a connection to become available
  maxUses: 7500,                   // Number of times a connection can be used before being closed
  statement_timeout: 60000,        // Maximum time for any query to run (60 seconds)
  query_timeout: 60000,            // Timeout for queries
});

// Log pool errors
pool.on('error', (err) => {
  log(`Unexpected database pool error: ${err.message}`, 'database-error');
});

// Setup Drizzle ORM with the connection pool
export const db = drizzle({ client: pool, schema });

// Verify database connection on startup
(async () => {
  try {
    const client = await pool.connect();
    log('Successfully connected to PostgreSQL database', 'database');
    client.release();
  } catch (err: any) {
    log(`Failed to connect to database: ${err.message}`, 'database-error');
  }
})();
