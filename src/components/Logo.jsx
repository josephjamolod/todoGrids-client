import { NavLink } from "react-router-dom";

import logo from "../assets/logo/logo.png";

export default function Logo() {
  return (
    <div>
      <NavLink
        className="flex flex-col justify-center text-center items-center"
        to="/app/main/task?task=true"
      >
        <img className="h-16 w-16" src={logo} alt="" />
        <p className="-mt-4 font-semibold dark:text-neutral-300 leading-tight">
          Todo <span className="text-green-700">Grids</span>
        </p>
      </NavLink>
    </div>
  );
}
