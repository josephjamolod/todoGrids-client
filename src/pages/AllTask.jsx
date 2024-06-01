import { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import Tasks from "./Tasks";

import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import EmptyTask from "../components/EmptyTask";
import ShowMoreButton from "../components/ShowMoreButton";

export default function AllTask() {
  //no idea wht this works, but the useEffect wont trigger (ex. is we search '3' in completed task, and navigate to the Task the useEffect wont trigger)
  const navigate = useNavigate();
  const { currentUser, toggle } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);

  const [tasks, setTasks] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    Axios.get(
      `https://todo-app-api-lac.vercel.app/task/get-task/${
        currentUser._id
      }?${urlParams.toString()}`
    )
      .then((res) => {
        setLoading(false);
        if (res.data.length < 12) {
          setShowMore(false);
        } else {
          setShowMore(true);
        }
        setTasks(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [toggle, window.location.search]);

  const fetchData = () => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("startIndex", tasks.length);
    Axios.get(
      `https://todo-app-api-lac.vercel.app/task/get-task/${
        currentUser._id
      }?${urlParams.toString()}`
    )
      .then((res) => {
        setLoading(false);
        if (res.data.length < 12) {
          setShowMore(false);
        }
        setTasks([...tasks, ...res.data]);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const deleteTask = (taskID) => {
    const newTasks = tasks.filter((task) => task._id !== taskID);
    setTasks(newTasks);
  };

  return loading ? (
    <div className="flex justify-center items-center w-full h-1/3">
      <Loader />
    </div>
  ) : tasks?.length === 0 ? (
    <EmptyTask message="No Task" />
  ) : (
    <div className=" flex flex-col items-center justify-start">
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  xl:grid-cols-4   ">
        {tasks?.map((task) => {
          return <Tasks key={task._id} task={task} deleteTask={deleteTask} />;
        })}
      </div>
      <div className={`${!showMore && "hidden"}`}>
        <ShowMoreButton fetchData={fetchData} />
      </div>
    </div>
  );
}
