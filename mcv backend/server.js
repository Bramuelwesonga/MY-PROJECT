// Import express, the framework that creates the web server and routes.
const express = require("express");

// Import cors, which lets your React app (a different port) call this server.
// Browsers block such requests unless the server allows them.
const cors = require("cors");

// Load the .env file so process.env.PORT works below.
require("dotenv").config();

// Import the database connection we created in db.js.
const pool = require("./db");

// Create the Express application. "app" is your server.
const app = express();

// Middleware: runs on every request before your routes.
// This one adds the headers that allow the React app to call the backend.
app.use(cors());

// Middleware: lets the server read JSON sent in a request body
// (needed later for forms, bookings, payments).
app.use(express.json());

// A route: when someone sends a GET request to /api/test, run this function.
// "req" is the incoming request, "res" is what you send back.
// "async" lets us use "await" to wait for the database.
app.get("/api/test", async (req, res) => {
  try {
    // Ask PostgreSQL for the current time. If this works,
    // the database connection is good. "await" pauses until it replies.
    const result = await pool.query("SELECT NOW()");

    // Send a JSON response back to whoever called this route.
    // result.rows is an array of rows; [0] is the first row,
    // and .now is the column returned by SELECT NOW().
    res.json({
      message: "Backend and database connected",
      time: result.rows[0].now,
    });
  } catch (err) {
    // If anything fails (wrong password, database off), land here.
    // Print the error in the terminal so you can read it.
    console.error(err);

    // Send status 500 (server error) so the frontend knows it failed.
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Use the port from .env, or 5000 if none is set.
const PORT = process.env.PORT || 5000;

// Start the server and listen for requests on that port.
// The function runs once the server is ready.
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));