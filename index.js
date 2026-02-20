// index.js
// Import express
import express from "express";

const app = express();
const PORT = 3000;

// Set view engine to EJS
app.set("view engine", "ejs");

// Serve static files from public folder
app.use(express.static("public"));

// ---------------------------
// Middleware: Working Hours
// ---------------------------
const workingHours = (req, res, next) => {
  const now = new Date(); // get current date and time
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday
  const hour = now.getHours(); // current hour in 24h format

  // check if it's outside working hours
  if (day === 0 || day === 6 || hour < 9 || hour >= 17) {
    // Send closed message
    return res.send("<h1>Sorry, we are closed now.</h1>");
  }

  next(); // continue to the requested route
};

// Apply middleware globally
app.use(workingHours);

// ---------------------------
// Routes
// ---------------------------
app.get("/", (req, res) => {
  res.render("home"); // render home.ejs
});

app.get("/services", (req, res) => {
  res.render("services"); // render services.ejs
});

app.get("/contact", (req, res) => {
  res.render("contact"); // render contact.ejs
});

// ---------------------------
// Start server
// ---------------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
