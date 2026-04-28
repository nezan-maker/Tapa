import express from "express";
import authRouter from "./routes/userRoutes.js";
import databaseHandler from "./config/db.js";
import cookie from "cookie-parser";
import morgan from "morgan";
import debug from "debug";
import dotenv from "dotenv";
import { error } from "node:console";
dotenv.config();
let serverDebug = debug("app:server");

const startServer = async () => {
  const app = express();
  await databaseHandler();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookie());
  app.use("/auth", authRouter);
  app.listen(process.env.PORT);
};
startServer()
  .then(() => {
    serverDebug(
      `Server configured correctly and running on port ${process.env.PORT}`,
    );
  })
  .catch((error) => {
    console.error(error);
    serverDebug("Server failed to start");
  });
