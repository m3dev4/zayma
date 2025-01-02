import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./config/db/index.js";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";
import notifyUnverifiedUsers from "./cronJobs/notifyUnverifiedUsers.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());

app.use(errorHandler);

connectDB();
notifyUnverifiedUsers();

const PORT = process.env.PORT;

app.use("/api/users", userRoutes);
app.use("/api/stores", storeRoutes);

app.use((req, res, next) => {
  res.status(200).json({ message: "Bienvenue sur Zayma Ecommerce !" });
});
app.use((req, res, next) => {
  console.log("Requête reçue:", {
    method: req.method,
    path: req.path,
    body: req.body,
    headers: req.headers,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`Le serveur est en marche sur le port ${PORT}`);
});
