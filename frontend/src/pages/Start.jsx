import React from "react";
import logo from "../assets/Uber-logo.png";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="w-full md:w-[50vw] md:max-w-[520px] md:ml-12">
      <div className="bg-[url(https://img.freepik.com/free-photo/traffic-light_1150-18034.jpg?t=st=1734435990~exp=1734439590~hmac=4ad3ee6f3d82626bd862cb8101b2047c3d9a90b5e7b350fc46d5d6a5dca393a7&w=360)] bg-cover bg-center w-full h-screen pt-8 bg-red-400 flex justify-between flex-col">
        <img
        className="w-16 ml-8"
          src={logo}
          alt="logo"
        />
        <div className="bg-white p-4">
          <h2 className="text-3xl font-semibold">Get Started with Uber</h2>
          <Link to="/login" className="w-full flex items-center justify-center bg-black text-white py-2 px-4 rounded mt-4 text-center">Continue</Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
