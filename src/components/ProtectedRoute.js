import { Navigate, useOutlet } from "react-router-dom";

import { useContext, useEffect } from "react";
import { appContext } from "../context/AppContext";
import { AppBar } from "./AppBar";

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(appContext);
 
  const outlet = useOutlet();
  if (!isLoggedIn) {
    // user is not authenticated
   
    return <Navigate to="/" />;
  }
 // return children;

 return (
  <div>
    <AppBar />
    {children}
  </div>
);
};
