require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookiesParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductRouter = require("./routes/auth/admin/Products-routes");
const shopProductRouter = require("./routes/auth/shop/Products-routes");
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const DEFAULT_CLIENT_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
];

const CLIENT_ORIGINS = (
  process.env.CLIENT_ORIGIN
    ? process.env.CLIENT_ORIGIN.split(",")
    : DEFAULT_CLIENT_ORIGINS
)
  .map((origin) => origin.trim())
  .filter(Boolean);

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing from environment variables.");
}

//create db connection
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log("DB connection failed", err);
  });

const app = express();

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || CLIENT_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "cache-control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookiesParser());

app.use("/api/auth", authRouter);

app.use("/api/admin/products", adminProductRouter);

app.use("/api/shop/products", shopProductRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
