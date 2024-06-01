import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";

import { IoMdArrowBack } from "react-icons/io";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdOutlineErrorOutline } from "react-icons/md";
import config from "../config";

export default function VerifyEmail() {
  const navigate = useNavigate();

  const [isUserVerify, setIsUserVerify] = useState(false);
  const [noEmailToken, setNoEmailToken] = useState(false);
  const [error, setError] = useState(false);
  const { emailToken } = useParams("email-token");

  useEffect(() => {
    setNoEmailToken(false);
    setError(false);
    if (isUserVerify) {
      setTimeout(() => {
        navigate("/app/sign-in");
      }, 3000);
      return;
    } else {
      if (!emailToken) {
        setNoEmailToken(true);
        return;
      }
      Axios.patch(`${config.apiUrl}/auth/verify-email`, {
        emailToken,
      })
        .then((res) => {
          setIsUserVerify(res.data.isVerified);
          return;
        })
        .catch((err) => {
          setError(err.response.data.message);
          return;
        });
    }
  }, [isUserVerify]);
  return noEmailToken ? (
    <div className="flex h-screen justify-center items-start">
      <div className="flex flex-col mt-20  mx-5 border border-gray-200 bg-green-50 w-[500px]  rounded-lg drop-shadow-xl  ">
        <div className="flex  p-2 gap-1">
          <div className="">
            <span className="bg-red-500 inline-block center w-3 h-3 rounded-full"></span>
          </div>
          <div className="circle">
            <span className="bg-yellow-500 inline-block center w-3 h-3 rounded-full"></span>
          </div>
          <div className="circle">
            <span className="bg-green-500 box inline-block center w-3 h-3 rounded-full"></span>
          </div>
        </div>
        <div className="flex flex-col gap-2 mx-5 mb-10 gap-y-4  py-5  items-center justify-start border-y">
          <p className="flex items-center rounded-lg px-2 justify-center gap-2 border p-1 border-red-500  bg-red-50">
            <span>
              <MdOutlineErrorOutline />
            </span>
            No Email Token!
          </p>
          <Link
            to={"/app/sign-in"}
            className="flex justify-center gap-2 items-center hover:underline"
          >
            Go back to site
            <span>
              <IoMdArrowBack className="text-2xl" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  ) : error ? (
    <div className=" flex h-screen justify-center items-start">
      <div className="flex flex-col mt-20  mx-5 border border-gray-200 bg-green-50 w-[500px]  rounded-lg drop-shadow-xl  ">
        <div className="flex  p-2 gap-1">
          <div className="">
            <span className="bg-red-500 inline-block center w-3 h-3 rounded-full"></span>
          </div>
          <div className="circle">
            <span className="bg-yellow-500 inline-block center w-3 h-3 rounded-full"></span>
          </div>
          <div className="circle">
            <span className="bg-green-500 box inline-block center w-3 h-3 rounded-full"></span>
          </div>
        </div>
        <div className="flex flex-col gap-2 mx-5 mb-10 gap-y-4  py-5  items-center justify-start border-y">
          <p className="flex items-center rounded-lg px-2 justify-center gap-2 border p-1 border-red-500  bg-red-50">
            <span>
              <MdOutlineErrorOutline />
            </span>
            {error}!
          </p>
          <Link
            to={"/app/sign-in"}
            className="flex justify-center gap-2 items-center hover:underline"
          >
            Go back to site
            <span>
              <IoMdArrowBack className="text-2xl" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    isUserVerify && (
      <div className="mx-auto mt-20 w-[500px] h-40 bg-white rounded-xl overflow-hidden drop-shadow-xl">
        <div className="bg-green-200 flex items-center p-[5px] text-whitec relative">
          <div className="flex absolute left-3">
            <span className="h-3.5 w-3.5 bg-[#ff605c] rounded-xl mr-2"></span>
            <span className="h-3.5 w-3.5 bg-[#ffbd44] rounded-xl mr-2"></span>
            <span className="h-3.5 w-3.5 bg-[#00ca4e] rounded-xl"></span>
          </div>
          <div className="flex-1 text-center font-semibold text-gray-900">
            User Verified
          </div>
          <IoShieldCheckmarkOutline className="text-2xl text-green-500" />
        </div>
        <div className="p-2.5 text-[#0f0]">
          <div>
            <span className="mr-2">Redirecting</span>
            <span className="animate-[ping_1.5s_0.5s_ease-in-out_infinite]">
              .
            </span>
            <span className="animate-[ping_1.5s_0.7s_ease-in-out_infinite]">
              .
            </span>
            <span className="animate-[ping_1.5s_0.9s_ease-in-out_infinite]">
              .
            </span>
          </div>
        </div>
      </div>
    )
  );
}
