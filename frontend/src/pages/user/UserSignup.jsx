import React from "react";
import logo from "../../assets/Uber-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createAccount, userLogin } from "../../redux/slices/user.slice";

const UserSignup = () => {
  // Initialize form handling with react-hook-form
  const {
    handleSubmit,
    register,
    formState: { errors },
    resetField,
  } = useForm();

  // Initialize dispatch and navigate hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle form submission
  const onSignupSubmit = async (data) => {
    // Prepare user data for account creation
    const userData = {
      fullName: {
        firstname: data.firstname,
        lastname: data.lastname,
      },
      email: data.email,
      password: data.password,
    };

    // Dispatch createAccount action
    const user = dispatch(createAccount(userData));
    if (user) {
      // If account creation is successful, log the user in
      const loggedUser = await dispatch(
        userLogin({
          email: data.email,
          password: data.password,
        })
      );
      if (loggedUser) {
        // Navigate to home page after successful login
        navigate("/home");
      }
    }

    // Reset form fields after submission
    resetField("firstname");
    resetField("lastname");
    resetField("email");
    resetField("password");
  };

  return (
    <div className="p-7 flex justify-between flex-col h-screen md:w-[50vw] md:max-w-[520px] md:ml-12 max-h-screen sm:max-h-[90vh] overflow-y-auto  bg-white bg-opacity-70">
      <form onSubmit={handleSubmit(onSignupSubmit)}>
        <img className="w-16 mb-10" src={logo} alt="logo" />
        <div className="mb-7">
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex gap-4">
            <div className="w-1/2">
              <input
                type="text"
                placeholder="John"
                className={`bg-white rounded w-full px-4 py-2 border text-base placeholder:text-sm ${
                  errors.firstname ? "border-red-500" : ""
                }`}
                {...register("firstname", {
                  required: "First name is required",
                })}
              />
              {errors.firstname && (
                <span className="text-xs text-red-600">
                  {errors.firstname?.message}
                </span>
              )}
            </div>
            <div className="w-1/2">
              <input
                type="text"
                placeholder="Doe"
                className={`bg-white rounded w-full px-4 py-2 border text-base placeholder:text-sm ${
                  errors.lastname ? "border-red-500" : ""
                }`}
                {...register("lastname")}
              />
              {errors.lastname && (
                <span className="text-xs text-red-600">
                  {errors.lastname?.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="mb-7">
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            type="email"
            placeholder="email@example.com"
            className={`bg-white rounded px-4 py-2 w-full border text-lg placeholder:text-base ${
              errors.email ? "border-red-500" : ""
            }`}
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-xs text-red-600">
              {errors.email?.message}
            </span>
          )}
        </div>
        <div className="mb-7">
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            type="password"
            placeholder="password"
            className={`bg-white rounded px-4 py-2 w-full border text-lg placeholder:text-base ${
              errors.password ? "border-red-500" : ""
            }`}
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <span className="text-xs text-red-600">
              {errors.password?.message}
            </span>
          )}
        </div>

        <button
          className="bg-[#111] mb-7 rounded px-4 py-2 w-full text-white font-semibold"
          type="submit"
        >
          Submit
        </button>
        <p className="text-center font-medium">
          Already have a account?{" "}
          <Link to={"/login"} className="text-blue-800">
            Login here
          </Link>
        </p>
      </form>
      <div>
        <p className="text-xs leading-tight text-gray-600">
          By Proceeding, you consent to get{" "}
          <span className="underline text-black">calls</span>,{" "}
          <span className="underline text-black">whatsApp</span> or{" "}
          <span className="underline text-black">SMS messages</span>, included
          by automated means, from Uber and its affiliates, including for{" "}
          <span className="underline text-black">customer service</span> and
          marketing purposes.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
