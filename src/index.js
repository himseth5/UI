import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { router } from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppContextProvider } from "./context/AppContext";
import { RouterProvider } from "react-router-dom";
import CircleLoader from "./components/CircleLoader/circleLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "./components/Toast/toast";

import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";

// /**
//  * MSAL should be instantiated outside of the component tree to prevent it from being re-instantiated on re-renders.*/
// const msalInstance = new PublicClientApplication(msalConfig);

// // Default to using the first account if no account is active on page load
// if (
//   !msalInstance.getActiveAccount() &&
//   msalInstance.getAllAccounts().length > 0
// ) {
//   // Account selection logic is app dependent. Adjust as needed for different use cases.
//   msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
// }

// msalInstance.addEventCallback((event) => {
//   if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
//     msalInstance.setActiveAccount(event.payload.account);
//   }
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = createTheme({
  palette: {
    primary: { main: "rgb(233, 79, 28)" },
  },
});
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <Toast />
      <CircleLoader />
      <ThemeProvider theme={theme}>
        {/* <App instance={msalInstance} /> */}
        <RouterProvider router={router} />
      </ThemeProvider>
    </AppContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
