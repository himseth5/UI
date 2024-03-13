import "./App.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import HomePage from "./pages/home/HomePage";
import { LoginPage } from "./pages/login/LoginPage";
import MedicalChartReview from "./pages/medicalChartReview";
import NotFoundPage from "./pages/notfound/NotFoundPage";
import PasswordResetPage from "./pages/passwordReset";

import { MsalProvider } from "@azure/msal-react";
import Tabs from "./components/Tabs/Tabs";

const Pages = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      
      <Route path="/home" element={<ProtectedRoute><HomePage /> </ProtectedRoute>} />
      
      <Route path="/medicalChartReview" element={<ProtectedRoute>{/* <MedicalChartReview /> */}<Tabs /></ProtectedRoute>} />
      <Route path="/passwordReset" element={<PasswordResetPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

/**
 * msal-react is built on the React context API and all parts of your app that require authentication must be
 * wrapped in the MsalProvider component. You will first need to initialize an instance of PublicClientApplication
 * then pass this to MsalProvider as a prop. All components underneath MsalProvider will have access to the
 * PublicClientApplication instance via context as well as all hooks and components provided by msal-react. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
const App = ({ instance }) => {
  return (
    <MsalProvider instance={instance}>
      <Pages />
    </MsalProvider>
  );
};

export default App;
