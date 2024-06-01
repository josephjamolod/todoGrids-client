import { NavLink, Outlet, useNavigate } from "react-router-dom";
import CreateTask from "./Task components/CreateTask";
import { useEffect, useState } from "react";
import Filter from "./Task components/Filter";

export default function Task() {
  //no idea this one works even no use
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);

  const taskFromUrl = urlParams.get("task");
  const completedFromUrl = urlParams.get("completed");
  const importantFromUrl = urlParams.get("important");

  const [focus, setFocus] = useState({
    completed: completedFromUrl,
    important: importantFromUrl,
    task: taskFromUrl,
  });

  useEffect(() => {
    setFocus({
      completed: completedFromUrl,
      important: importantFromUrl,
      task: taskFromUrl,
    });
  }, [window.location.search]);

  return (
    <div className="flex flex-col h-auto ">
      <div className="flex flex-shrink justify-center my-5 h-auto">
        <CreateTask />
      </div>
      <div
        className="flex justify-center  items-center lg:justify-start px-5 mx-2  py-2 rounded-t-lg text-slate-600 bg-green-50 border border-slate-200 shadow
       dark:bg-gray-700 dark:text-neutral-300"
      >
        <NavLink
          className={` border-slate-200 px-1 sm:px-3 text-sm sm:text-base text-center ${
            focus.task && "underline font-semibold"
          }`}
          to={`/app/main/task?task=true`}
        >
          Task
        </NavLink>
        <NavLink
          className={`border-x border-slate-200 px-1 sm:px-3 text-sm sm:text-base text-center ${
            focus.completed && "underline font-semibold text-blue-400"
          }`}
          to={`/app/main/task/completed?completed=true`}
        >
          Completed Task
        </NavLink>
        <NavLink
          className={`border-r border-slate-200 px-1 sm:px-3 text-sm sm:text-base text-center ${
            focus.important && "underline font-semibold text-red-400"
          }`}
          to={`/app/main/task/important?important=true`}
        >
          Important Task
        </NavLink>
        <div className="">
          <Filter />
        </div>
      </div>
      <div className="flex border rounded-b-lg border-slate-200 mx-2 justify-center dark:bg-gray-900 h-auto ">
        <Outlet />
      </div>
    </div>
  );
}
