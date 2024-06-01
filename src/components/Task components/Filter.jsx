import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Filter() {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const urlParams = new URLSearchParams(window.location.search);
  const sortFromUrl = urlParams.get("sort");

  const [toggleCheck, setToggleCheck] = useState(sortFromUrl || "-createdAt");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sortFromUrl = urlParams.get("sort");
    if (!sortFromUrl) {
      setToggleCheck("-createdAt");
    }
  }, [window.location.search]);

  const handleChange = (e) => {
    setToggleCheck(!toggleCheck);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("sort", e.target.id);
    const searchQuery = urlParams.toString();
    const sortFromUrl = urlParams.get("sort");
    setToggleCheck(sortFromUrl);
    navigate(`${location}?${searchQuery}`);
  };
  return (
    <div className="flex-col lg:flex  items-center justify-center text-slate-800 dark:text-neutral-300">
      <div className="flex w-full justify-between">
        <label className="mx-2">newest:</label>
        <input
          checked={toggleCheck === "-createdAt"}
          id="-createdAt"
          onChange={handleChange}
          type="checkbox"
        />
      </div>
      <div className="flex w-full justify-between">
        <label className="mx-2">oldest: </label>
        <input
          checked={toggleCheck === "createdAt"}
          id="createdAt"
          onChange={handleChange}
          type="checkbox"
        />
      </div>
    </div>
  );
}
