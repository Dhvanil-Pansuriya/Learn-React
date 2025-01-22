import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      // Await the logout process
      await authService.logout();
      dispatch(logout()); // Clear the user state
      navigate("/"); // Redirect after logout
    } catch (error) {
      console.log("LogoutBtn :: Error ", error);
      dispatch(logout()); // Clear the user state even if logout fails
      navigate("/"); // Redirect after attempting logout
    }
  };

  return (
    <button
      onClick={logoutHandler}
      className="inline-block px-6 py-2 bg-transparent text-white rounded-full border-2 border-white hover:bg-gray-700 duration-200"
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
