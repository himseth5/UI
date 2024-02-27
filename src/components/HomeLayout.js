import React, { useContext } from "react";
import { Navigate, useOutlet } from "react-router-dom";
import { AppBar } from "./AppBar";
import { appContext } from "../context/AppContext";

const HomeLayout = () => {
  const outlet = useOutlet();
  const { isLoggedIn } = useContext(appContext);

  return (
    <div>
      <AppBar />
      {outlet}
    </div>
  );
};

export default HomeLayout;
