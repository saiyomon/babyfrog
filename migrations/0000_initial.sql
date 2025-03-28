CREATE TABLE IF NOT EXISTS "images" (
    "id" SERIAL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "data" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "messages" (
    "id" SERIAL PRIMARY KEY,
    "text" TEXT NOT NULL
);