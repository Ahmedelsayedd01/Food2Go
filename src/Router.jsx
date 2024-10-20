import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout, ForgetPassLayout, LoginLayout } from "./layouts/Layouts";
import ProtectedLogin from "./ProtectedData/ProtectedLogin";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import App from "./App";

export const router = createBrowserRouter([
  /* Login Admin */
  {
    path: "/login",
    element: <LoginLayout />, // Login shouldn't be protected by ProtectedLogin
  },

  /* Forget Password User */
  {
    path: "/forget_password",
    element: <ForgetPassLayout />, // Forget password should be public
  },

  /* Dashboard or main app routes after login */
  {
    path: "/dashboard",
    element: <ProtectedLogin> {/* Protect the entire dashboard */}
      <App /> {/* Main app/dashboard element */}
    </ProtectedLogin>,
    children: [
      {
        path: '',
        element: <DashboardLayout />  // This is fine if you have nested routes
      }
    ],
  },

  /* Catch-all for 404 */
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
