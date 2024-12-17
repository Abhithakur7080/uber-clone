import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const CaptainLogin = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onLoginSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="p-7 flex justify-between flex-col h-screen">
      <form onSubmit={handleSubmit(onLoginSubmit)}>
        <img className="w-[4rem]" src={"https://www.svgrepo.com/show/505031/uber-driver.svg"} alt="logo" />
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
          Login
        </button>
        <p className="text-center font-medium">
          Join a fleet?{" "}
          <Link to={"/captain/signup"} className="text-blue-800">
            Register as a Captain
          </Link>
        </p>
      </form>
      <div>
        <Link
          to={"/login"}
          className="flex items-center justify-center bg-orange-600 mb-7 rounded px-4 py-2 w-full text-white font-semibold"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
