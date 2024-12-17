import { User } from "../modals/user.modal.js";
import { validationResult } from "express-validator";
import expressAsyncHandler from "express-async-handler";
import userService from "../services/user.service.js";

const registerUser = expressAsyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullName, email, password } = req.body;

  const isUserAlready = await User.findOne({ email });

  if (isUserAlready) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await User.hashPassword(password);

  const user = await userService.createUser({
    firstname: fullName.firstname,
    lastname: fullName.lastname,
    email,
    password: hashedPassword,
  });
  const token = user.generateAuthToken();
  return res
    .status(201)
    .json({ message: "User created successfully", user, token });
});

const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }
  const isValid = await user.comparePassword(password);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }
  const token = user.generateAuthToken();
  return res.status(200).json({ message: "Login successful", user, token });
});
export default {
  registerUser,
  loginUser
};
