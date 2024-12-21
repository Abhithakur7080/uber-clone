import { validationResult } from "express-validator";
import { Captain } from "../modals/captain.model.js";
import { BlackListToken } from "../modals/blacklistToken.model.js";
import expressAsyncHandler from "express-async-handler";
import captainService from "../services/captain.service.js";

const registerCaptain = expressAsyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullName, email, password, vehicle } = req.body;

  const isCaptainAlready = await Captain.findOne({ email });

  if (isCaptainAlready) {
    return res.status(400).json({ message: "Captain already exists" });
  }
  const hashedPassword = await Captain.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstname: fullName.firstname,
    lastname: fullName.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });
  const token = captain.generateAuthToken();
  return res
    .status(201)
    .json({ message: "Captain created successfully", captain, token });
});

const loginCaptain = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const captain = await Captain.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }
  const isValid = await captain.comparePassword(password);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }
  const token = captain.generateAuthToken();

  res.cookie("token", token);
  res.cookie("role", "captain");
  return res.status(200).json({ message: "Login successful", captain, token });
});

const  getCaptainProfile = expressAsyncHandler(async (req, res) => {
  const captain = req.captain;
  return res.status(200).json({ captain });
})

const logoutCaptain = expressAsyncHandler(async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await BlackListToken.create({ token });
  res.clearCookie("token");
  res.clearCookie("role");
  return res.status(200).json({ message: "Logout successful" });
})

export default { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain };
