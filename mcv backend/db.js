// Import the Pool class from the "pg" package.
// pg is the library that lets Node.js talk to PostgreSQL.
const { Pool } = require("pg");

// Load the values from your .env file into process.env.
// Without this line, process.env.DB_PASSWORD etc. would be undefined.
require("dotenv").config();

// A Pool keeps several database connections open and reuses them,
// which is faster than opening a new connection for every request.
const pool = new Pool({
  host: process.env.DB_HOST,         // where PostgreSQL runs (localhost = your computer)
  port: process.env.DB_PORT,         // PostgreSQL's port (5432 by default)
  database: process.env.DB_NAME,     // which database to use (MCV)
  user: process.env.DB_USER,         // PostgreSQL username (postgres)
  password: process.env.DB_PASSWORD, // your PostgreSQL password, read from .env
});

// Share the pool so other files can use it with require("./db").
module.exports = pool;