import { Link } from "react-router-dom";
import DarkMode from "../components/Header Components/DarkMode";
import { useSelector } from "react-redux";

//pngs
import todo from "../assets/todo.png";
import todo1 from "../assets/todo1.png";
import logo from "../assets/logo/logo.png";

export default function Startup() {
  const { dark } = useSelector((state) => state.user);
  return (
    <div className="h-screen relative ">
      <div className="absolute top-5 right-10 z-20">
        <DarkMode />
      </div>
      <div className="relative h-full max-h-[720px] ">
        <div className="absolute  flex w-full items-center ">
          <div className="hidden lg:flex flex-col flex-1 items-center justify-center bg-green-200 h-screen w-full">
            <img
              className=" h-1/2 max-h-[350px] object-cover border-b-2 border-white 
             dark:border-gray-900"
              src={logo}
              alt=""
            />
            <h1 className="text-center text-7xl mt-5 text-white dark:text-gray-900">
              Todo <span className="text-green-900">Grids</span>
            </h1>
            <h2 className="text-center text-2xl text-white dark:text-gray-900 max-w-[550px]">
              organize, manage, and prioritize your tasks and activities
            </h2>
          </div>
          <div className=" flex flex-col flex-1 items-center justify-center h-screen">
            <h1 className=" text-center font-semibold text-2xl underline w-3/4 dark:text-white">
              Todo <span className="text-green-600">Grids</span>
            </h1>
            <img
              className="h-1/2 max-h-[400px] xl:max-h-[450px] object-cover"
              src={dark ? todo1 : todo}
              alt=""
            />
            <Link
              to="/app/main/task?task=true"
              className="border-2 border-green-400 rounded-lg text-gray-900 cursor-pointer font-semibold px-8 py-3 text-center 
                hover:text-white hover:shadow-md m hover:bg-green-400 active:shadow-none active:translate-y-1 duration-300 dark:text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
