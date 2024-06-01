import Axios from "axios";
import { useState } from "react";
import { toggle } from "../redux/user/userSlice";

import { FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";

export default function UpdateTaskButton({ disable, task, initialTask }) {
  const dispatch = useDispatch();
  const [taskUpdate, setTaskUpdated] = useState(false);
  const handleUpdateButton = () => {
    Axios.patch(
      `https://todo-app-api-lac.vercel.app/task/update-task/${task._id}`,
      initialTask
    )
      .then((res) => {
        setTaskUpdated(true);
        setTimeout(() => {
          setTaskUpdated(false);
          dispatch(toggle(new Date()));
        }, 800);
      })
      .catch((err) => console.log(err.response.message));
  };

  return (
    <div className="flex justify-center items-center gap-x-2">
      {taskUpdate && (
        <span>
          <FaCheck className="text-green-400 duration-200" />
        </span>
      )}
      <button
        onClick={handleUpdateButton}
        disabled={disable}
        type="button"
        className="items-center text-sm text-gray-800 font-semibold h-3/4 border  bg-white  col-span-2 flex justify-center rounded-lg p-2 duration-300  hover:text-green-400
         hover:border-slate-700 dark:bg-transparent dark:text-neutral-300 dark:hover:text-green-400 dark:hover:border-white"
      >
        UPDATE
      </button>
    </div>
  );
}
