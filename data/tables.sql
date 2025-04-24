PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS
    `sources` (
        `key` TEXT NOT NULL UNIQUE,
        `name` TEXT NOT NULL
    );

CREATE TABLE IF NOT EXISTS
    `words` (
        `id` INTEGER PRIMARY KEY AUTOINCREMENT,
        `muchik` TEXT NOT NULL,
        `spanish` TEXT NOT NULL
    );