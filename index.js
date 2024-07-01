const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

const mongoDB = require("./db");
mongoDB(); // Connect to MongoDB

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000',
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
  console.log(`Example app listening on port ${port}`);
});





