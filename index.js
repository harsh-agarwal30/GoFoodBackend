
require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const app = express();

const mongoDB = require("./db");
mongoDB(); // Connect to MongoDB

const port = process.env.PORT || 5000;
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';

// Enable CORS for all routes
app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // Parse JSON bodies

// Test route to verify server is running
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// API routes for various functionalities
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
app.use('/api', require("./Routes/GetLocation"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



