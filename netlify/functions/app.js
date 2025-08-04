import express from "express";
import cors from "cors";
import { errorHandler } from "./api/middlewares/errorHandler.middleware.js";
import { router as apiRouter } from "./api/routes/index.js";

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("/api", apiRouter);
app.use(errorHandler);

export { app };
