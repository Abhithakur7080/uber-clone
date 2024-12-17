import { validationResult } from "express-validator";
import { Captain } from "../modals/captain.model.js";
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

export default { registerCaptain };
