// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const formSubmitRoutes = require("./routes/formSubmitRoutes");


app.use("/api/auth", authRoutes);
app.use("/api/submit", formSubmitRoutes);




// Root Route
app.get("/", (req, res) => {
    res.send("Welcome to CoachPro Backend!");
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
