CREATE TABLE table_name (
    /* Do not delete or replace the id field */
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    title TEXT,
    content LONGTEXT
);