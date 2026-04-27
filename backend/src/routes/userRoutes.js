import express from "express";
const router = express.Router();
router.post("/register", signUp);
router.post("/login", logIn);
router.post("/confirm", confirm);
router.post("/forgot", forgot);
router.post("/verify", verifyCode);
router.post("/reset", reset);

export default router;
