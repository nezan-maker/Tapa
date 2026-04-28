import dotenv from "dotenv";
import debug from "debug";
let envDebug = debug("app:env");
dotenv.config();
let env;
try {
  if (
    !process.env.ACCESS_SECRET ||
    !process.env.MONGO_URI ||
    !process.env.REFRESH_SECRET
  ) {
    throw new Error("Could not load environment variables");
  }
  env = {
    MONGO_URI: process.env.MONGO_URI,
    ACCESS_SECRET: process.env.ACCESS_SECRET,
    REFRESH_SECRET: process.env.REFRESH_SECRET,
  };
  envDebug("Success! Environment variables loaded");
} catch (error) {
  envDebug("Error! Environment variable could not be loaded");
  console.error(error);
}

export default env;
