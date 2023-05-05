import React, { useContext, useMemo } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const navigate = useNavigate();
  const { isAuth, userData } = useContext(AppContext);
  const userNameLocal = localStorage.getItem("name_user");
  const userName = useMemo(() => userData?.user?.fullName, [userData]);
  return (
    <div className="header-container">
      <div className="header-logo">
        <span>ADMIN PAGE</span>
      </div>
      {!isAuth && !userNameLocal ? (
        <div className="header-buttons">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/signin")}
          >
            Sign in
          </button>
        </div>
      ) : (
        <span className="mr-5 font-weight-bold">
          {userName ?? userNameLocal}
        </span>
      )}
    </div>
  );
};

export default Header;
