import { FaRegMoon } from "react-icons/fa";
import { FaRegSun } from "react-icons/fa";

import { toggleDark } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function DarkMode() {
  const { dark } = useSelector((state) => state.user);
  const darkMode = dark;

  const dispatch = useDispatch();
  return (
    <label className="relative inline-flex items-center cursor-pointer h-full w-full">
      <input
        className="sr-only peer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        value=""
        type="checkbox"
        onChange={() => dispatch(toggleDark(!dark))}
      />
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group peer ring-0 bg-gray-50 border-2 border-slate-700 rounded-full outline-none 
        duration-1000 after:duration-200 w-12 h-6  peer-checked:bg-gradient-to-r  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute
       after:bg-slate-700 transition  after:outline-none after:h-4 after:w-4 after:top-[2px] ${
         darkMode ? "after:right-1" : " after:right-6"
       } 
        `}
      ></div>
      <div className="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-x-2">
        <FaRegMoon className="text-sm text-slate-700" />
        <FaRegSun className="text-sm text-slate-700" />
      </div>
    </label>
  );
}
