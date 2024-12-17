import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const CaptainSignup = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSignupSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="p-7 flex justify-between flex-col h-screen">
      <form onSubmit={handleSubmit(onSignupSubmit)}>
        <img className="w-[4rem]" src={"https://www.svgrepo.com/show/505031/uber-driver.svg"} alt="logo" />
        <div className="mb-7">
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex gap-4">
            <div className="w-1/2">
              <input
                type="text"
                placeholder="John"
                className={`bg-[#eee] rounded w-full px-4 py-2 border text-base placeholder:text-sm ${
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
                className={`bg-[#eee] rounded w-full px-4 py-2 border text-base placeholder:text-sm ${
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
            className={`bg-[#eee] rounded px-4 py-2 w-full border text-lg placeholder:text-base ${
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
            className={`bg-[#eee] rounded px-4 py-2 w-full border text-lg placeholder:text-base ${
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
         This site is protected by reCAPTCHA and <span className="text-black underline">the Google Privacy Policy</span> and <span className="text-black underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
