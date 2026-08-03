import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./Users/router.js";
import db from "./Db.js";

const app = express();
const PORT = process.env.PORT || 3000;

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Middleware
app.use(express.json());
app.use('/api/users', userRouter);

app.use((err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  } else {
    return res.status(400).json({ message: err.message || "Something went wrong" });
  }
});

app.listen(PORT, () => {
  db();
  console.log(`Server listening on http://localhost:${PORT}`);
});
