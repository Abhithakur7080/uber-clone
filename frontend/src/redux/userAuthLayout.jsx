import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/getCookie"; // Ensure this is correctly implemented

const UserAuthLayout = ({ children }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const isUserLoading = useSelector((state) => state.user.loading);
    const role = getCookie("role"); // Retrieve role from cookies

    useEffect(() => {
        if (!isUserLoading) {
            if (role !== "user") {
                navigate("/login"); // Redirect non-user roles to login
            }
        }
    }, [isUserLoading, role, navigate]);

    // Render loading state while user data is being fetched
    if (isUserLoading) {
        return <div>Loading...</div>;
    }

    // Render children if user is authenticated and has the correct role
    return role === "user" ? children : null;
};

export default UserAuthLayout;
