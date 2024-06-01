import { useState } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";

import { FaRegCircleCheck } from "react-icons/fa6";
import { ImExit } from "react-icons/im";
import { GoEye, GoEyeClosed } from "react-icons/go";

export default function ResetPassword() {
  const { id } = useParams();
  const [newPassword, setNewPassword] = useState({});
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);

  const [eye1, setEye1] = useState(false);
  const [eye2, setEye2] = useState(false);

  const handleChange = (e) => {
    setNewPassword({ ...newPassword, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    setError(false);
    setMessage(false);
    e.preventDefault();
    Axios.post(`/api/reset-password/update/${id}`, newPassword)
      .then((res) => setMessage(res.data.msg))
      .catch((err) => setError(err.response.data.message));
  };
  return (
    <div className="flex flex-col  items-center  h-screen ">
      <div className="border bg-green-50 px-10 py-5 rounded-lg mt-20 mx-5">
        <h1 className=" text-gray-900 font-semibold py-3 w-full text-center">
          Reset Password
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-y-3 py-3 border-y "
        >
          <p className="">Please enter your new password.</p>
          <div className="flex justify-center bg-white items-center border  w-full ">
            <input
              onChange={handleChange}
              id="newPassword"
              type={`${eye1 ? "text" : "password"}`}
              className="h-full w-full p-3 focus:outline-none"
              placeholder="New password"
            />
            <button
              className={`${!newPassword.newPassword && "hidden"}`}
              type="button"
              onClick={() => setEye1(!eye1)}
            >
              {eye1 ? (
                <GoEye className="mx-4" />
              ) : (
                <GoEyeClosed className="mx-4" />
              )}
            </button>
          </div>
          <div className="flex justify-center bg-white items-center border  w-full ">
            <input
              onChange={handleChange}
              id="confirmPassword"
              type={`${eye2 ? "text" : "password"}`}
              className="h-full w-full p-3 focus:outline-none"
              placeholder="Confirm password"
            />
            <button
              className={`${!newPassword.confirmPassword && "hidden"}`}
              type="button"
              onClick={() => setEye2(!eye2)}
            >
              {eye2 ? (
                <GoEye className="mx-4" />
              ) : (
                <GoEyeClosed className="mx-4" />
              )}
            </button>
          </div>

          <div className="flex justify-center items-center w-full">
            <button className="bg-white border border-green-400 rounded-md w-full py-2 font-semibold active:translate-y-2 transition duration-200">
              Reset password
            </button>
          </div>

          {message && (
            <p className="text-green-400 max-w-60 text-center flex flex-col gap-y-3">
              <span className="flex gap-x-1">
                <FaRegCircleCheck className="text-xl text-green-500 " />
                {message}
              </span>

              <Link
                className="text-gray-900 hover:underline hover:font-semibold flex justify-center items-center gap-2"
                to="/app/sign-in"
              >
                Go to sign in <ImExit className="text-xl" />
              </Link>
            </p>
          )}
          {error && (
            <p className="text-red-400 max-w-60 text-center flex flex-col gap-y-3">
              <span className="flex gap-x-1">{error}</span>

              <Link
                className="text-gray-900 hover:underline hover:font-semibold flex justify-center items-center gap-2"
                to="/app/sign-in"
              >
                Go to sign in <ImExit className="text-xl" />
              </Link>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
