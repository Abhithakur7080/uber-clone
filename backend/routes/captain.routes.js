import express from "express";
import { body } from "express-validator";
import authMiddlewares from "../middlewares/auth.middlewares.js";
import captainControllers from "../controllers/captain.controllers.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("fullName.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be at least 3 characters long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be atleast 1"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid vehicle type"),
  ],
  captainControllers.registerCaptain
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  captainControllers.loginCaptain
);

router.get("/profile", authMiddlewares.authCaptain, captainControllers.getCaptainProfile);

router.get("/logout", authMiddlewares.authCaptain, captainControllers.logoutCaptain);

export default router;
