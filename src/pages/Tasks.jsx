import { useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

import DeleteTaskButton from "../components/DeleteTaskButton";
import UpdateTaskButton from "../components/UpdateTaskButton";
import { useSelector } from "react-redux";

export default function Tasks({ task, deleteTask }) {
  const [disableEdit, setDisableEdit] = useState(true);
  // const [initialTask, setInitialTask] = useState(task);
  const [initialTask, setInitialTask] = useState({
    task: task.task,
    important: task.important,
    completed: task.completed,
    title: task.title,
  });
  // console.log(task);
  const handleChange = (e) => {
    setInitialTask({ ...initialTask, [e.target.id]: e.target.value });
  };
  return (
    <div className="bg-green-50 border border-slate-200 rounded-xl w-96 max-w-72 p-2 my-2 mx-1 shadow-md duration-200 hover:bg-slate-200 dark:bg-gray-700 ">
      <div className="flex p-2 items-center justify-between">
        <div className="flex items-center "></div>
        <div className="flex gap-2 items-center">
          {!disableEdit && (
            <button
              onClick={() => setDisableEdit(true)}
              className="border border-slate-200 font-semibold text-gray-800 bg-gray-50 px-1 text-center rounded-md duration-300 hover:border-slate-700 dark:bg-transparent dark:text-neutral-300 dark:hover:border-slate-200 
              dark:hover:bg-neutral-300 dark:hover:text-gray-900"
            >
              cancel
            </button>
          )}
          <button
            className="flex items-center gap-1 hover:underline "
            onClick={() => setDisableEdit(false)}
          >
            <span
              className={`${
                !disableEdit && "hidden "
              } dark:text-neutral-300 dark:hover:underline`}
            >
              Edit
            </span>

            <MdEdit
              className={`cursor-pointer dark:text-neutral-300 ${
                !disableEdit && "text-green-400 dark:text-green-400"
              }`}
            />
          </button>
        </div>
      </div>
      <form className="flex flex-col gap-2  ">
        <div className="flex flex-col">
          <input
            onChange={handleChange}
            disabled={disableEdit}
            defaultValue={task.title}
            id="title"
            type="text"
            placeholder="Title..."
            className="text-sm bg-slate-100 text-slate-600 placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 col-span-6 resize-none outline-none rounded-t-lg
             p-2 duration-300 focus:border-slate-600 dark:bg-gray-500 dark:text-white dark:placeholder:text-white"
          />
          <textarea
            onChange={handleChange}
            disabled={disableEdit}
            defaultValue={task.task}
            id="task"
            placeholder="Your Task..."
            className="text-sm bg-slate-100 text-slate-600 h-28 placeholder:text-slate-600 placeholder:opacity-50 border-x border-b focus:border-y
               border-slate-200 col-span-6 resize-none outline-none rounded-b-lg p-2 duration-300 focus:border-slate-600 dark:bg-gray-500 dark:text-white dark:placeholder:text-white"
          />
        </div>

        <div className="flex justify-between">
          <div className="flex gap-x-2">
            <button
              onClick={() =>
                setInitialTask({
                  ...initialTask,
                  important: !initialTask.important,
                })
              }
              disabled={disableEdit}
              type="button"
              className={`${
                initialTask.important
                  ? "text-red-400 dark:text-red-400"
                  : "text-slate-600 dark:text-neutral-300"
              }  col-span-1 flex justify-center items-center rounded-lg p-2 duration-200 bg-slate-100 hover:border-slate-600  border border-slate-200  dark:bg-transparent
              dark:hover:border-neutral-300 dark:border-gray-900`}
            >
              <FaRegHeart className="text-xl" />
            </button>
            <button
              onClick={() =>
                setInitialTask({
                  ...initialTask,
                  completed: !initialTask.completed,
                })
              }
              disabled={disableEdit}
              type="button"
              className={`${
                initialTask.completed
                  ? "text-blue-500 dark:text-blue-500"
                  : "text-slate-600 dark:text-neutral-300"
              }  col-span-1 flex justify-center items-center rounded-lg p-2 duration-200 bg-slate-100 hover:border-slate-600  border border-slate-200  dark:bg-transparent
              dark:hover:border-neutral-300 dark:border-gray-900 `}
            >
              <FaRegCircleCheck className="text-xl" />
            </button>

            <div className=" flex flex-col justify-center items-center"></div>
          </div>

          <span className="col-span-2"></span>
          <div
            className={`${disableEdit && "hidden"} flex gap-x-2 items-center`}
          >
            <DeleteTaskButton
              disable={disableEdit}
              task={task}
              deleteTask={deleteTask}
            />
            <UpdateTaskButton
              disable={disableEdit}
              task={task}
              initialTask={initialTask}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
