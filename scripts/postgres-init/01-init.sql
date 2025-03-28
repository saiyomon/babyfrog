-- Initialize the PostgreSQL database with optimized settings for the frog application

-- Create extensions
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Set up schema
-- (Drizzle ORM will handle this part through migrations)

-- Set up optimizations for our database
ALTER SYSTEM SET effective_cache_size = '1GB';
ALTER SYSTEM SET maintenance_work_mem = '128MB';
ALTER SYSTEM SET work_mem = '5242kB';
ALTER SYSTEM SET random_page_cost = 1.1;
ALTER SYSTEM SET effective_io_concurrency = 200;

-- Autovacuum settings
ALTER SYSTEM SET autovacuum = on;
ALTER SYSTEM SET autovacuum_vacuum_scale_factor = 0.05;
ALTER SYSTEM SET autovacuum_analyze_scale_factor = 0.025;

-- Create roles and permissions for the app
-- DO $$
-- BEGIN
--     IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'froggy_app_role') THEN
--         CREATE ROLE froggy_app_role;
--     END IF;
-- END
-- $$;

-- GRANT ALL PRIVILEGES ON DATABASE froggy_app TO froggy_app_role;
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO froggy_app_role;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO froggy_app_role;

-- Set up function to refresh materialized views (if needed in the future)
CREATE OR REPLACE FUNCTION refresh_materialized_views()
RETURNS void AS $$
DECLARE
    view_name text;
BEGIN
    FOR view_name IN
        SELECT matviewname FROM pg_matviews
    LOOP
        EXECUTE 'REFRESH MATERIALIZED VIEW ' || view_name;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Create an index maintenance function
CREATE OR REPLACE FUNCTION maintain_indexes()
RETURNS void AS $$
BEGIN
    -- Reindex important tables
    REINDEX TABLE public.images;
    REINDEX TABLE public.messages;
    
    -- Analyze the database
    ANALYZE;
END;
$$ LANGUAGE plpgsql;

-- Create a table cleanup function to optionally purge old data
CREATE OR REPLACE FUNCTION cleanup_old_data(age_in_days integer DEFAULT 365)
RETURNS void AS $$
BEGIN
    -- Not implemented by default, but can be customized in the future
    -- DELETE FROM logs WHERE created_at < now() - interval '1 day' * age_in_days;
    RAISE NOTICE 'Cleanup function called, but no cleanup was performed.';
END;
$$ LANGUAGE plpgsql;