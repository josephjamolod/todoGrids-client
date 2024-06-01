import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";

import { toggle } from "../../redux/user/userSlice";

//icons
import { FaRegHeart } from "react-icons/fa6";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FiPlusCircle } from "react-icons/fi";
import { IoHeart } from "react-icons/io5";
import { IoCheckmarkCircle } from "react-icons/io5";
import { FaExclamation } from "react-icons/fa";
import Search from "../Search";

export default function CreateTask() {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [task, setTask] = useState({
    task: "",
    important: false,
    completed: false,
    title: "",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    Axios.post(`/api/task/create-task/${currentUser._id}`, task)
      .then((res) => {
        setLoading(false);
        setTask({ task: "", important: false, completed: false, title: "" });
        dispatch(toggle(new Date()));
        return;
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
      });
  };

  return (
    <div className="flex flex-col items-center   w-full">
      <div className="lg:hidden">
        <Search />
      </div>
      <div className="bg-green-200 border border-slate-200 rounded-xl  p-2 mt-2 w-full max-w-96  overflow-hidden">
        <h1 className="text-center text-green-500 text-xl font-bold col-span-6 mb-2">
          Add Task
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2  ">
          <div className="flex flex-col">
            <input
              value={task.title}
              id="title"
              onChange={handleChange}
              type="text"
              placeholder="Title..."
              className="text-sm bg-slate-100 text-slate-600 placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 col-span-6 resize-none outline-none rounded-t-lg
               p-2 duration-300 focus:border-slate-600 dark:bg-gray-700 dark:text-white dark:placeholder-white "
            />
            <textarea
              value={task.task}
              id="task"
              onChange={handleChange}
              placeholder="Your Task..."
              className="text-sm bg-slate-100 text-slate-600 h-28 placeholder:text-slate-600 placeholder:opacity-50 border-x border-b focus:border-y
               border-slate-200 col-span-6 resize-none outline-none rounded-b-lg p-2 duration-300 focus:border-slate-600 
               dark:bg-gray-700 dark:text-white dark:placeholder-white "
            />
          </div>

          <div className="flex justify-between">
            <div className="flex gap-x-2">
              <button
                onClick={() => setTask({ ...task, important: !task.important })}
                type="button"
                className={`${
                  task.important
                    ? "text-red-400 dark:text-red-400"
                    : "text-slate-600 dark:text-neutral-300"
                }  col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-100 hover:border-slate-600  border border-slate-200 
                dark:bg-gray-700  
                `}
              >
                <FaRegHeart className="text-xl" />
              </button>
              <button
                onClick={() => setTask({ ...task, completed: !task.completed })}
                type="button"
                className={`${
                  task.completed
                    ? "text-blue-400 dark:text-blue-400"
                    : "text-slate-600 dark:text-neutral-300 "
                }  col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-100 hover:border-slate-600  border border-slate-200 
                dark:bg-gray-700 
                `}
              >
                <FaRegCircleCheck className="text-xl" />
              </button>
              <div className=" flex flex-col justify-center items-center">
                {task.important && (
                  <p className="text-sm text-slate-600 flex justify-center items-center gap-x-1 ">
                    <span>
                      <IoHeart className="text-red-400 " />
                    </span>
                    Marked as important
                  </p>
                )}
                {task.completed && (
                  <p className="text-sm text-slate-600 flex justify-center items-center gap-x-1">
                    <span>
                      <IoCheckmarkCircle className="text-blue-400 ml-1" />
                    </span>
                    Marked as completed
                  </p>
                )}
              </div>
            </div>

            <span className="col-span-2"></span>
            <button
              disabled={loading}
              className="bg-slate-100 text-2xl text-slate-600  border border-slate-200 col-span-2 flex justify-center rounded-lg p-2 duration-300 hover:border-slate-600
               hover:text-green-400 dark:bg-gray-700 dark:text-neutral-300 dark:hover:text-green-400"
            >
              <FiPlusCircle />
            </button>
          </div>
        </form>
      </div>
      {error && (
        <p className="text-sm text-red-400  flex justify-center items-center ">
          <span>
            <FaExclamation />
          </span>
          {error}
        </p>
      )}
    </div>
  );
}
