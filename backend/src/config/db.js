import mongoose, { mongo } from "mongoose";
import env from "./env.js";
import debug from "debug";
let dbDebug = debug("app:db");
const reconnect = async () => {
  const max_attempts = 5;
  for (let attempts = 1; attempts <= max_attempts; attempts++) {
    await mongoose
      .connect(env.MONGO_URI, {
        socketTimeoutMS: 15000,
      })
      .then(() => {
        dbDebug("Mongo DB reconnected");
      })
      .catch((error) => {
        dbDebug("Not connecting");
        console.error(error);
      });
  }
};
const databaseHandler = async () => {
  try {
    let URI = env.MONGO_URI;
    if (!URI) {
      throw new Error("Database environment variables could not be loaded");
    }

    mongoose.connection.on("error", (error) => {
      dbDebug("Not connecting");
      console.log(error);
    });
    mongoose.connection.on("connect", () => {
      dbDebug("Connected");
    });
    mongoose.connection.on("disconnected", reconnect);
    await mongoose
      .connect(URI)
      .then(() => {
        dbDebug("MONGO DB CONNECTED");
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    dbDebug("Connecting to the database failed");
    console.error(error);
  }
};
export default databaseHandler;
