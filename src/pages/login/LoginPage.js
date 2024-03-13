import "./loginPage.css";

import { useContext, useEffect, useState } from "react";
import { appContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

import loginCoverImage from "../../assets/Ai cover pic.jpg";
import exlLogo from "../../assets/EXL_logo.png";

import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";

export const LoginPage = () => {
  const { setLoggedInState } = useContext(appContext);
  const navigate = useNavigate();

  const keyName = "userCredentials";
  const value = window.localStorage.getItem(keyName);
  const userData = JSON.parse(value);

  const { instance } = useMsal();

  useEffect(() => {
    if (userData !== null) {
      console.log("userdata:", userData);
      navigate("/home");
    }
  }, [userData]);

  let activeAccount;
  if (instance) {
    activeAccount = instance.getActiveAccount();
    console.log("active:", activeAccount);
    const keyName = "userCredentials";
    window.localStorage.setItem(keyName, JSON.stringify(activeAccount));
  }

  const handleLoginRedirect = () => {
    instance.loginRedirect(loginRequest).catch((error) => console.log(error));
  };

  const handleLogin = () => {
    handleLoginRedirect();
  };

  return (
    <div className="login-main-container">
      <div className="product-name-container">
        <p className="product-name">Clinical</p>
        <p className="product-name second">CoPilot</p>
      </div>
      <div className="login-image-container">
        <img className="login-image" src={loginCoverImage} alt="login image" />
      </div>
      <div className="login-input-container">
        <div className="logo">
          <img className="logo" src={exlLogo} alt="exl" />
        </div>

        <div className="login-button" onClick={handleLogin}>
          Sign In using Azure
        </div>
      </div>
    </div>
  );
};
