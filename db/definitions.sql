CREATE TABLE IF NOT EXISTS uploads (
    id      SERIAL PRIMARY KEY,
    name    TEXT UNIQUE NOT NULL CHECK (length(text) < 71),
    size    INTEGER NOT NULL,
    time    TIMESTAMPTZ NOT NULL
);
