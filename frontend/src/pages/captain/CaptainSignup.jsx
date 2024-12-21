import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { captainLogin, createCaptainAccount } from "../../redux/slices/captain.slice";

const CaptainSignup = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    resetField,
    setValue,
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSignupSubmit = async (data) => {
    const captainData = {
      fullName: {
        firstname: data.firstname,
        lastname: data.lastname,
      },
      email: data.email,
      password: data.password,
      vehicle: {
        color: data.color,
        plate: data.plate,
        capacity: data.capacity,
        vehicleType: data.type,
      },
    };
    const captain = await dispatch(createCaptainAccount(captainData));
    if (captain) {
      console.log(captain)
          // If account creation is successful, log the captain in
          const loggedCaptain = await dispatch(
            captainLogin({
              email: data.email,
              password: data.password,
            })
          );
          if (loggedCaptain) {
            // Navigate to home page after successful login
            navigate("/captain/home");
          }
        }
        resetField("firstname");
        resetField("lastname");
        resetField("email");
        resetField("password");
        resetField("color");
        resetField("plate");
        resetField("capacity");
        resetField("type");

  };
  return (
    <div className="p-7 flex justify-between flex-col h-screen md:w-[50vw] md:max-w-[520px] md:ml-12 max-h-screen sm:max-h-[90vh] overflow-y-auto  bg-white bg-opacity-70">
      <form onSubmit={handleSubmit(onSignupSubmit)}>
        <img
          className="w-[4rem]"
          src={"https://www.svgrepo.com/show/505031/uber-driver.svg"}
          alt="logo"
        />
        <div className="mb-7">
          <h3 className="text-lg font-medium mb-2">
            What's our captain's name
          </h3>
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
          <h3 className="text-lg font-medium mb-2">
            What's our captain's email
          </h3>
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
        <div className="mb-7">
          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
          <div className="grid grid-cols-2 gap-4 flex-wrap">
            <div>
              <div
                className={`flex items-center justify-center bg-white ${
                  errors.color ? "border border-red-500 rounded-md" : ""
                }`}
              >
                <input
                  type="text"
                  placeholder="Color - red or #ff0000"
                  className={
                    "bg-white rounded w-[80%] border text-base py-2 pl-2 placeholder:text-sm focus:outline-none focus:ring-0 focus:border-transparent"
                  }
                  {...register("color", {
                    required: "Vehicle Color is required",
                  })}
                />
                <input
                  type="color"
                  onChange={(e) => setValue("color", e.target.value)}
                  className="bg-white rounded w-8 text-base placeholder:text-sm border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent mx-2"
                />
              </div>

              {errors.color && (
                <span className="text-xs text-red-600">
                  {errors.color?.message}
                </span>
              )}
            </div>
            <div className="">
              <select
                placeholder="Vehicle Type"
                className={`bg-white rounded w-full px-4 py-2 border text-base placeholder:text-sm ${
                  errors.type ? "border-red-500" : ""
                }`}
                {...register("type", {
                  required: "Vehicle Type is required",
                })}
              >
                <option value="" disabled selected className="text-base text-gray-500">
                  Select Vehicle Type
                </option>
                <option value="car">Car</option>
                <option value="motercycle">Motercycle</option>
                <option value="auto">Auto</option>
              </select>
              {errors.type && (
                <span className="text-xs text-red-600">
                  {errors.type?.message}
                </span>
              )}
            </div>
            <div className="">
              <input
                type="number"
                placeholder="Capacity must be at least 1" 
                className={`bg-white rounded w-full px-4 py-2 border text-base placeholder:text-sm ${
                  errors.capacity ? "border-red-500" : ""
                }`}
                {...register("capacity", {
                  required: "Vehicle Capacity is required",
                })}
              />
              {errors.capacity && (
                <span className="text-xs text-red-600">
                  {errors.capacity?.message}
                </span>
              )}
            </div>
            <div className="">
              <input
                type="text"
                placeholder="Plate - BR 01 PA 1234"
                className={`bg-white rounded w-full px-4 py-2 border text-base placeholder:text-sm ${
                  errors.plate ? "border-red-500" : ""
                }`}
                {...register("plate", {
                  required: "Vehicle Plate is required",
                })}
              />
              {errors.plate && (
                <span className="text-xs text-red-600">
                  {errors.plate?.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          className="bg-[#111] mb-7 rounded px-4 py-2 w-full text-white font-semibold"
          type="submit"
        >
          Submit
        </button>
        <p className="text-center font-medium mb-7">
          Already have a account?{" "}
          <Link to={"/login"} className="text-blue-800">
            Login here
          </Link>
        </p>
      </form>
      <div>
        <p className="text-xs leading-tight text-gray-600">
          This site is protected by reCAPTCHA and{" "}
          <span className="text-black underline">
            the Google Privacy Policy
          </span>{" "}
          and{" "}
          <span className="text-black underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
