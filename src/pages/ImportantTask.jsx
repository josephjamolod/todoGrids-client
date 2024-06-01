import { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import Tasks from "./Tasks";

import Loader from "../components/Loader";
import EmptyTask from "../components/EmptyTask";
import ShowMoreButton from "../components/ShowMoreButton";

export default function ImportantTask() {
  const { currentUser, toggle } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);

  const [tasks, setTasks] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    Axios.get(`/api/task/get-task/${currentUser._id}?${urlParams.toString()}`)
      .then((res) => {
        setLoading(false);
        if (res.data.length < 12) {
          setShowMore(false);
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
    Axios.get(`/api/task/get-task/${currentUser._id}?${urlParams.toString()}`)
      .then((res) => {
        setLoading(false);
        if (res.data.length < 12) {
          setShowMore(false);
        } else {
          setShowMore(true);
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
    <EmptyTask message="No Important Task" />
  ) : (
    <div className=" flex flex-col items-center justify-start ">
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
