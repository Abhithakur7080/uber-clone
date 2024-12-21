import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  CaptainLogin,
  CaptainSignup,
  Start,
  UserLogin,
  UserSignup,
  Home,
} from "./pages";
import uberGif from "./assets/uber-sidebar.gif";
import { getCookie } from "./utils/getCookie";
import { useDispatch } from "react-redux";
import { userProfile } from "./redux/slices/user.slice";
import { captainProfile } from "./redux/slices/captain.slice";
import UserAuthLayout from "./redux/userAuthLayout";
import CaptainHome from "./pages/captain/CaptainHome";
import CaptainAuthLayout from "./redux/CaptainLayout";

const App = () => {
  const [role, setRole] = useState(getCookie("role"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (role === "user") {
      dispatch(userProfile());
      navigate("/home");
    } else if (role === "captain") {
      dispatch(captainProfile());
      navigate("/captain/home");
    } else {
      setRole(null);
      navigate("/");
    }
  }, [dispatch]);

  return (
    <div className="block items-center justify-center h-screen sm:flex bg-[url(https://img.freepik.com/free-vector/cartoon-summer-city-street-landscape-with-sidewalk_107791-24792.jpg?t=st=1734761689~exp=1734765289~hmac=ba59caf65f62135765aecd3e38cc9df96518cce59fe11fca8aa553359e78b860&w=1380)] bg-center bg-cover bg-no-repeat">
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain/login" element={<CaptainLogin />} />
        <Route path="/captain/signup" element={<CaptainSignup />} />
        <Route
          path="/home"
          element={
            <UserAuthLayout>
              <Home />
            </UserAuthLayout>
          }
        />
        <Route
          path="/captain/home"
          element={
            <CaptainAuthLayout>
              <CaptainHome />
            </CaptainAuthLayout>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
