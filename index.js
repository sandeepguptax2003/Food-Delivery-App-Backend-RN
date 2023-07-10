const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db");
const apiRoutes = require("./routes/api");

//dotenv
require("dotenv").config();

//Middleware
app.use(express.json());
app.use(cors());

//Connect to DB
connectDB();

//Routes
app.use("/api", apiRoutes);

//Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

//Start server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server Started At ${PORT}`);
});
