import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to migrations directory
const MIGRATIONS_DIR = path.join(__dirname, '..', 'migrations');

console.log('Running database migrations...');

try {
  // Run drizzle-kit push to apply any schema changes
  console.log('Applying schema with drizzle-kit push...');
  execSync('npm run db:push', { stdio: 'inherit' });
  
  console.log('Database migration completed successfully!');
} catch (error) {
  console.error('Error running migrations:', error);
  process.exit(1);
}