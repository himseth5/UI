import "./App.css";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  defer,
} from "react-router-dom";
import { AuthLayout } from "./components/AuthLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import HomePage from "./pages/home/HomePage";
import { LoginPage } from "./pages/login/LoginPage";
import MedicalChartReview from "./pages/medicalChartReview";
import NotFoundPage from "./pages/notfound/NotFoundPage";
import PasswordResetPage from "./pages/passwordReset";

const getUserData = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      const user = window.localStorage.getItem("userCredentials");
      resolve(user);
    }, 3000)
  );

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getUserData() })}
    >
      <Route exact path="/" element={<LoginPage />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/medicalChartReview"
        element={
          <ProtectedRoute>
            <MedicalChartReview />
          </ProtectedRoute>
        }
      />

      <Route path="/passwordReset" element={<PasswordResetPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);
