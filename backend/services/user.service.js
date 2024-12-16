import { User } from "../modals/user.modal.js";

const createUser = async ({ firstname, lastname, email, password }) => {
  if (!firstname || !email || !password) {
    throw new Error("All fields are required");
  }
  const user = await User.create({
    fullName: {
      firstname,
      lastname,
    },
    email,
    password,
  });
  return user;
};
export default {
  createUser,
};
