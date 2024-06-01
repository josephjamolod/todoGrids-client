import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

//pages
import About from "./pages/About";
import Startup from "./pages/Startup";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AllTask from "./pages/AllTask";
import Profile from "./pages/Profile";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";

//components
import RootLayout from "./components/RootLayout";
import AppLayout from "./components/AppLayout";
import PrivateRoute from "./components/PrivateRoute";
import Task from "./components/Task";
import CompletedTask from "./pages/CompletedTask";
import ImportantTask from "./pages/ImportantTask";
import { useSelector } from "react-redux";

export default function App() {
  const { dark } = useSelector((state) => state.user);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Startup />} />

        <Route path="app" element={<AppLayout />}>
          <Route index element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="reset-password/:id" element={<ResetPassword />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="verify-email/:emailToken" element={<VerifyEmail />} />
          <Route path="main" element={<PrivateRoute />}>
            <Route index element={<Profile />} />
            <Route path="task" element={<Task />}>
              <Route index element={<AllTask />} />
              <Route path="completed" element={<CompletedTask />} />
              <Route path="important" element={<ImportantTask />} />
            </Route>
          </Route>
        </Route>
      </Route>
    )
  );

  return (
    <div className={`${dark && "dark"}`}>
      <div className=" h-screen dark:bg-gray-900 ">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
