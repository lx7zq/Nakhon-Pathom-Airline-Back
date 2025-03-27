require("dotenv").config();
const express = require("express"); // เพิ่มการนำเข้า express
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./lib/db");
const authRoutes = require("./routes/authRoutes");
const flightRoutes = require("./routes/flightRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT;

connectDB();
const app = express();
app.use(cors({ origin: BASE_URL, credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Nakhon Pathom Airline Restful API</h1>");
});

app.use("/api/auth", authRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/bookings", bookingRoutes);

// Start the server using the imported server object
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
