// A helper script to run migrations via npm
import { execSync } from 'child_process';

console.log('Starting database migrations...');

try {
  // Run the migration script
  execSync('node --loader tsx/esm scripts/migrate.js', { 
    stdio: 'inherit',
    env: process.env
  });
  
  console.log('Migrations completed successfully');
} catch (error) {
  console.error('Migration failed:', error);
  process.exit(1);
}