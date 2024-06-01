import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Axios from "axios";

//react-redux
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { checkUser } from "../redux/user/userSlice";

//logo
import Search from "./Search";
import DarkMode from "./Header Components/DarkMode";
import SideBar from "./SideBar";
import DeleteUserAlert from "./DeleteUserAlert";
import Logo from "./Logo";

export default function AppLayout() {
  const urlLocation = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [sideBar, setSideBar] = useState(false);
  const sidebarRef = useRef(null);
  const profileRef = useRef(null);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const confirmDeleteRef = useRef(null);

  const [focus, setFocus] = useState(true);

  useEffect(() => {
    if (urlLocation.pathname === "/app/sign-in") {
      setFocus(false);
    }
    if (urlLocation.pathname === "/app") {
      setFocus(true);
    }
    return;
  }, [urlLocation]);

  useLayoutEffect(() => {
    Axios.get("/api/auth/check-token")
      .then((res) => {
        if (res.data.msg === "No token") {
          dispatch(checkUser());

          return res;
        } else {
          return res;
        }
      })
      .then((err) => {
        return err;
      });
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setSideBar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        confirmDeleteRef.current &&
        !confirmDeleteRef.current.contains(event.target)
      ) {
        setConfirmDelete(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //hide sideBar if we click Edit Profile
  const handleEditProfileButton = () => {
    setSideBar(!sideBar);
  };

  //sign-out user
  const handleSignOut = () => {
    setSideBar(false);
    Axios.get(`/api/auth/sign-out/${currentUser._id}`)
      .then((res) => {
        dispatch(checkUser());
        navigate("/app/sign-in");
        return;
      })
      .catch((err) => {
        console.log(err.response.message);
      });
  };

  const handleDeleteAccountButton = () => {
    setConfirmDelete(true);
    setSideBar(false);
  };

  //delete user
  const handleDeleteUser = () => {
    setSideBar(false);
    setConfirmDelete(false);
    Axios.delete(`/api/auth/delete-user/${currentUser._id}`)
      .then((res) => {
        dispatch(checkUser());
        navigate("/app/sign-in");
        return;
      })
      .catch((err) => console.log(err.response.message));
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };

  return (
    <div className={`flex flex-col`}>
      <header className="shadow-md z-10 bg-green-50 flex justify-between items-center h-20 py-2 px-8 md:px-10 relative dark:bg-gray-700">
        <Logo />
        <div className="hidden lg:flex">
          <Search />
        </div>

        <nav className="bg-transparent">
          <div className="flex ">
            {currentUser ? (
              <div className="flex justify-center items-center md:gap-2 gap-5 lg:mr-5 dark:text-neutral-300">
                <p className="text-center">
                  Hi{" "}
                  <Link
                    to={"/app/main"}
                    className="font-semibold  capitalize hover:underline  "
                  >
                    {currentUser.name.split(" ")[0]}!
                  </Link>
                </p>
                <img
                  ref={profileRef}
                  onClick={() => setSideBar(!sideBar)}
                  src={currentUser.avatar}
                  className="h-12 w-12  object-cover bg-white border border-gray-900 rounded-full cursor-pointer dark:border-neutral-300"
                />
              </div>
            ) : (
              <div className="bg-green-50 flex flex-col text-slate-700 dark:bg-gray-700 dark:text-neutral-300">
                <NavLink
                  className={`${!focus && "underline font-semibold"}`}
                  to="/app/sign-in"
                >
                  Sign In
                </NavLink>
                <NavLink
                  className={`${focus && "underline font-semibold"}`}
                  to="/app"
                >
                  Sign Up
                </NavLink>
              </div>
            )}
            <button
              // onClick={() => dispatch(toggleDark(!dark))}
              className="ml-8"
            >
              <DarkMode />
            </button>
          </div>
        </nav>
      </header>
      {sideBar && (
        <div
          ref={sidebarRef}
          className=" bg-white shadow-md border border-gray-200  h-auto w-auto p-2 absolute right-2 top-20 rounded-lg z-20 dark:bg-gray-900 dark:text-neutral-300  dark:hover:text-neutral-300"
        >
          <div>
            <SideBar
              handleEditProfileButton={handleEditProfileButton}
              handleSignOut={handleSignOut}
              handleDeleteAccountButton={handleDeleteAccountButton}
              confirmDelete={confirmDelete}
            />
          </div>
        </div>
      )}
      {confirmDelete && (
        <div
          ref={confirmDeleteRef}
          className=" z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  group select-none w-[250px] flex flex-col p-4  items-center justify-center
           bg-green-50 border border-gray-900 shadow-lg rounded-2xl dark:bg-gray-700 dark:border dark:border-white"
        >
          <DeleteUserAlert
            handleDeleteUser={handleDeleteUser}
            handleCancelDelete={handleCancelDelete}
          />
        </div>
      )}

      <div
        className={`z-0 ${confirmDelete && "blur-sm "} dark:bg-gray-900 h-auto`}
      >
        <Outlet />
      </div>
    </div>
  );
}
