import express from "express";
import cors from "cors";
import { errorHandler } from "./api/middlewares/errorHandler.middleware.js";
import apiRouter from "./api/routes/index.js"; // ✅ correct relative path

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("/api", apiRouter); // ✅ this mounts /api from your router
app.use(errorHandler);      // ✅ must be after routes

export { app };
