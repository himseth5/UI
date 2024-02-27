import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { router } from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppContextProvider } from "./context/AppContext";
import { RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = createTheme({
  palette: {
    primary: { main: "rgb(233, 79, 28)" }
  }
});
root.render(
  <React.StrictMode>
    <AppContextProvider>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      </ThemeProvider>
    </AppContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
