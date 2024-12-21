import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/getCookie"; // Ensure this is correctly implemented

const CaptainAuthLayout = ({ children }) => {
    const navigate = useNavigate();
    const captain = useSelector((state) => state.captain.captain);
    const isCaptainLoading = useSelector((state) => state.captain.loading);
    const role = getCookie("role"); // Retrieve role from cookies

    useEffect(() => {
        if (!isCaptainLoading) {
            if (role !== "captain") {
                navigate("/captain/login"); // Redirect non-Captain roles to login
            }
        }
    }, [isCaptainLoading, role, navigate]);

    // Render loading state while Captain data is being fetched
    if (isCaptainLoading) {
        return <div>Loading...</div>;
    }

    // Render children if Captain is authenticated and has the correct role
    return role === "captain" ? children : null;
};

export default CaptainAuthLayout;
