CREATE DATABASE 'ERP2'
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE IF NOT EXISTS users (
    id bigserial constraint pk_users PRIMARY KEY,
    username VARCHAR(10) UNIQUE,
    password text,
    removed boolean DEFAULT false
);

CREATE EXTENSION if NOT EXISTS pgcrypto;

INSERT INTO users VALUES 
    (default, 'admin', crypt('admin', gen_salt('bf'))),
    (default, 'john', crypt('john', gen_salt('bf')))
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS bills_to_pay (
    id bigserial constraint pk_bills_to_pay PRIMARY KEY,
    user_id INT,
    description VARCHAR(60),
    amount DECIMAL,
    due_date DATE,
    removed boolean DEFAULT false,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id)
);
