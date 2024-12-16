import { User } from "../modals/user.modal.js";
import expressAsyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
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
export default {
  registerUser,
};
