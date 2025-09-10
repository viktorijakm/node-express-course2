require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const path = require("path");

// Import DB connection
const connectDB = require("./db/connect");

// Import routes
const mainRouter = require("./routes/main");       // login + dashboard
const expensesRouter = require("./routes/expenses"); // CRUD for expenses

// Import middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authMiddleware = require("./middleware/auth");

// Middleware
app.use(express.static(path.join(__dirname, "public"))) // serve public files (HTML/JS)
app.use(express.json());             // parse JSON bodies

// Routes
app.use("/api/v1", mainRouter);
app.use("/api/v1/expenses", expensesRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "expenses.html"));
});

// Error handling
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


// Start server
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI); // connect to MongoDB
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log("Error starting server:", error);
  }
};

start();
