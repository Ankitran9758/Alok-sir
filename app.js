const express = require("express");
const session = require("express-session");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(session({
  secret: "mysecret",
  resave: false,
  saveUninitialized: false
}));

// ✅ Add this
app.get("/", (req, res) => {
  res.send("Project 2 API is running 🚀");
});

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

app.listen(4000, () => {
  console.log("API running on http://localhost:4000");
});