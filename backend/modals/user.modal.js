import { model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new Schema({
  fullName: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "first name must be at least 3 characters long"],
    },

    lastname: {
      type: String,
      minlength: [3, "last name must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
//   const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, 10);
};

export const User = model("User", userSchema);