import Axios from "axios";
import { useState } from "react";

import { FaRegCircleCheck } from "react-icons/fa6";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function ForgotPassword() {
  const [email, setEmail] = useState({});
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setEmail({ [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    setMessage(false);
    setError(false);
    e.preventDefault();
    Axios.post("/api/reset-password/request", email)
      .then((res) => {
        setMessage(res.data.msg);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <div className="flex flex-col  items-center  h-screen ">
      <div className="border bg-green-50 px-10 py-5 rounded-lg mt-20 mx-5">
        <h1 className=" text-gray-900 font-semibold py-3 w-full text-center">
          Forgot Password
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-start items-start gap-y-3 py-3 border-y "
        >
          <p className="">
            Please enter your email to request a reset password.
          </p>

          <input
            onChange={handleChange}
            id="email"
            type="text"
            className="border p-3 w-full focus:outline-none"
            placeholder="Email"
          />
          <div className="flex flex-col gap-y-2 justify-between items-center w-full">
            <button className="bg-white border border-green-400 rounded-md  px-3 py-2 font-semibold active:translate-y-2 transition duration-200">
              Send Email
            </button>
            {error ? (
              <p className="flex justify-center gap-x-1   text-sm max-w-52 text-red-400 border border-red-400 bg-red-50 px-2  rounded-sm">
                <span className="py-[3px]">
                  <AiOutlineExclamationCircle className="" />
                </span>
                {error}
              </p>
            ) : message ? (
              <p className=" flex justify-center  text-sm gap-x-1 max-w-44 text-red-green border border-green-400 bg-green-100 px-1 py-1 rounded-sm">
                <FaRegCircleCheck className="text-xl text-green-500 " />
                {message}
              </p>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
