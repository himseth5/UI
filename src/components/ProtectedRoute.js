import { Navigate, useOutlet } from "react-router-dom";

import { useContext, useEffect } from "react";
import { appContext } from "../context/AppContext";
import { AppBar } from "./AppBar";

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(appContext);

  const keyName = 'userCredentials';
  const value = window.localStorage.getItem(keyName);
  if (value === null) {
    console.log('here in', value)
    return <Navigate to="/" />;
  }

  return (
    <div>
      <AppBar />
      {children}
    </div>
  );
};
