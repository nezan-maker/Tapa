import mongoose, { mongo } from "mongoose";
const userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
    user_pass: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    user_email: {
      type: String,
      required: true,
      unique: true,
    },
    user_pass_conf: {
      type: String,
      rquired: true,
    },
    isVerified: {
      type: String,
    },
    otpToken: {
      type: String,
    },
    sign_otp_token: {
      type: String,
    },
  },
  { timestamps: true },
);
const User = mongoose.model("Users", userSchema);
export default User;
