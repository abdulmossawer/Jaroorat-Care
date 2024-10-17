const express = require('express');
const connectDB = require('./utils/db');
const bodyParser = require('body-parser');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// connect with mongoDB

connectDB();

app.use(bodyParser.json());

// Import the router files
const serviceRoutes = require("./routes/serviceRoutes");

// Use the routes
app.use("/api/services", serviceRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
