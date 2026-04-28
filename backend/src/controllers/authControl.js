import User from "../models/User.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import debug from "debug";
import jwt from "jsonwebtoken";
function normalizeEmail(text) {
  text.toString().toLowerCase();
  return text;
}
function hashPassword(password) {
  let hashedPassword = bcrypt.hash(password, 10);
  return hashedPassword;
}
const sign_upD = debug("app:sign_up");
export const signUp = async (req, res) => {
  try {
    const {
      user_name,
      user_email,
      user_pass,
      user_pass_conf,
      phone,
      location,
    } = req.body;
    user_email = normalizeEmail(text);
    const oldUser = await User.findOne({ user_email });
    if (oldUser) {
      return res.status(401).json({ duplicate_error: "User already exists" });
    }
    user_pass = hashPassword(user_pass);
    const databaseBody = {
      user_name: user_name,
      user_pass: user_pass,
      user_pass_conf: user_pass,
      user_email: user_email,
      phone: phone,
    };
    const otp_token = crypto.randomInt(100000).toString().padStart(6, "0");
    const newUser = await User(databaseBody);
    newUser.sign_otp_token = otp_token;
    await User.save(newUser);
    res
      .status(201)
      .json({ success: "Account created successfully", token: otp_token });
    sign_upD("Sign up succeeded");
  } catch (error) {
    sign_upD("Sign up failed");
    console.error(Error);
    res.status(500).json({ server_error: "Internal server error" });
  }
};
export const confirm = async (req, res) => {};
export const logIn = async (req, res) => {};
export const forgot = async (req, res) => {};
export const verifyCode = async (req, res) => {};
export const reset = async (req, res) => {};
