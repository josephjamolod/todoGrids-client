import { AiOutlineDelete } from "react-icons/ai";

import Axios from "axios";

export default function DeleteTaskButton({ disable, task, deleteTask }) {
  const handleDeleteTask = () => {
    Axios.delete(`/api/task/delete-task/${task._id}`)
      .then((res) => {
        deleteTask(task._id);
        return;
      })
      .catch((err) => console.log(err.response.message));
  };

  return (
    <button
      onClick={handleDeleteTask}
      disabled={disable}
      type="button"
      className="bg-red-50 h-3/4 px-1 rounded-md border border-red-400 duration-300 hover:bg-red-100 dark:bg-transparent dark:hover:bg-red-900 dark:hover:bg-opacity-30"
    >
      <AiOutlineDelete className="text-xl text-red-400" />
    </button>
  );
}
