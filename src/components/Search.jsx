import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { toggle } from "../redux/user/userSlice";

export default function Search() {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermfromUrl = urlParams.get("searchTerm");
    if (searchTermfromUrl) {
      setSearchTerm(searchTermfromUrl);
    }
  }, [location.search]);

  const clearInputs = () => {
    setSearchTerm("");
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", "");
    const searchQuery = urlParams.toString();
    navigate(`/app/main/task?${searchQuery}`);
    dispatch(toggle(new Date()));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/app/main/task?${searchQuery}`);
    dispatch(toggle(new Date()));
  };
  return (
    <div
      className={
        !currentUser || location.pathname === "/app/main"
          ? "hidden"
          : "flex  border  rounded-md border-slate-200 transition-all duration-200"
      }
    >
      <form onSubmit={handleSearchSubmit} className="flex">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search title..."
          className="input w-full py-2 pl-3 rounded-md focus:outline-none bg-white dark:bg-gray-900 dark:text-neutral-300"
          type="text"
        />
        <button
          type="button"
          onClick={clearInputs}
          className={`${
            !searchTerm && "hidden"
          } px-4 cursor-pointer bg-white hover:bg-green-50 font-semibold dark:text-neutral-300 dark:bg-gray-900 `}
        >
          x
        </button>
        <div className="border-l px-2 flex justify-center items-center">
          <button>
            <LuSearch className=" border-slate-200 dark:text-neutral-300" />
          </button>
        </div>
      </form>
    </div>
  );
}
