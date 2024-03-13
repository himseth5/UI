import * as React from "react";
import { useNavigate } from "react-router-dom";

import { CgProfile } from "react-icons/cg";
import exlLogo from "../assets/EXL_logo.png";
import "../../src/components/Header/header.css";

import { useMsal } from "@azure/msal-react";


export const AppBar = () => {
  const navigate = useNavigate();
  const {instance}=useMsal();
  const [profileClicked, setProfileClicked] = React.useState(false);

  const keyName = "userCredentials";
  const value = window.localStorage.getItem(keyName);
  const userCredentials = JSON.parse(value);

  const handleProfileClick = () => {
    setProfileClicked(!profileClicked);
  };

  const handleLogoutRedirect = () => {
    instance.logoutRedirect();
};

  function handleSignOut(){
  handleLogoutRedirect();
  localStorage.removeItem(keyName);
  navigate('/');    
  }

  return (
    <>
      <div className="main-container">
        <img className="brand-logo" src={exlLogo} alt="exl" />
        <h3 className="project-title">Clinical CoPilot</h3>
        <div className="profile-icon-container" onClick={handleProfileClick}>
          {/* <h4 className="user-name">{userCredentials?.email?.split("@")[0]}</h4> */}
          <h5 className="user-name">{userCredentials?.name}</h5>
          <CgProfile className="profile-icon" />
        </div>
      </div>
      {profileClicked && (
        <div className="profile-options">
          <h4 onClick={handleSignOut}>Sign out</h4>
        </div>
      )}
    </>
  );
};
