import express from "express";
import userControllers from "../controllers/user.controllers.js";
import authMiddlewares from "../middlewares/auth.middlewares.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("fullName.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("fullName.lastname")
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),
  ],
  userControllers.registerUser
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  userControllers.loginUser
);

router.get("/profile", authMiddlewares.authUser, userControllers.getUserProfile);

router.get("/logout", authMiddlewares.authUser, userControllers.logoutUser);

export default router;
