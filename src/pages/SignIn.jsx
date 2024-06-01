import { Link, useNavigate, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Axios from "axios";

//redux toolkit
import { useDispatch, useSelector } from "react-redux";
import {
  signInUserStart,
  signInUserSuccess,
  signInUserFailure,
} from "../redux/user/userSlice";

//pngs
import person1 from "../assets/person1.png";
import person2 from "../assets/person2.png";

//icons
import { TfiWrite } from "react-icons/tfi";
import { GoEye, GoEyeClosed } from "react-icons/go";

//component
import OAuth from "../components/OAuth";
import Loader from "../components/Loader";
import { useState } from "react";

export default function SignUp() {
  const dispatch = useDispatch();
  const { error, loading, currentUser, dark } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  const [eye1, setEye1] = useState(false);
  const [passwordValue, setPasswordValue] = useState(null);

  //if you want to achieve the icon check(the one that's in your mind). validata input one by one
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Please provide an email")
      .email("Please Provide a valid email"),
    password: yup.string().required("Please provide a password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChange = (e) => {
    setPasswordValue({ ...passwordValue, [e.target.name]: e.target.value });
  };

  const onSubmit = (data) => {
    dispatch(signInUserStart(true));
    Axios.post(`/api/auth/sign-in`, data)
      .then((res) => {
        dispatch(signInUserSuccess(res.data));
        navigate("/app/main/task?task=true");
      })
      .catch((err) => {
        const { success, message } = err.response.data;
        if (success === false) {
          dispatch(signInUserFailure(message));
        }
        return;
      });
  };

  return loading ? (
    <Loader />
  ) : currentUser ? (
    <Navigate to={"/app/main/task?task=true"} />
  ) : (
    <div className="flex justify-center h-full bg-white lg:bg-green-200 dark:bg-gray-900 dark:lg:bg-green-200">
      {/* <div className="absolute bg-white lg:bg-green-200 dark:bg-gray-900 dark:lg:bg-green-200 bottom-0 h-full w-full"> */}
      <div className="absolute flex w-full h-full">
        <div className="bg-white w-full h-full lg:bg-green-200 dark:bg-gray-900 dark:lg:bg-green-200"></div>
        <div className="hidden lg:block bg-white w-full h-full dark:bg-gray-900"></div>
      </div>

      <div className="relative flex  bg-white lg:bg-green-200 w-full  h-auto items-start justify-center dark:bg-gray-900 dark:lg:bg-green-200">
        <form
          onChange={handleChange}
          onSubmit={handleSubmit(onSubmit)}
          className=" flex-1 flex flex-col w-full items-center pt-10 "
        >
          <div className=" flex  justify-center items-center md:my-3  gap-x-3">
            <span className="hidden xl:flex">
              <TfiWrite className="text-6xl  font-light " />
            </span>
            <h1 className=" font-semibold text-3xl xl:text-xl 2xl:text-lg  dark:text-white  dark:lg:text-black  ">
              Sign In
            </h1>
          </div>

          <p className={`text-red-600 text-xs`}>
            <span className="invisible">x</span>
            {errors.name?.message}
          </p>
          <div className="input flex flex-col w-auto ">
            <label className=" text-sm font-semibold  px-1 bg-transparent dark:text-white dark:lg:text-black">
              Email:
            </label>
            <input
              {...register("email")}
              type="text"
              placeholder="Email"
              className="border-slate-300 border input px-2 py-2 xl:py-3  bg-slate-100 rounded-none lg:rounded-xl w-52 focus:outline-none placeholder-gray-500 text-xs focus:placeholder-transparent
              dark:bg-gray-900 dark:placeholder-gray-400 dark:focus:placeholder-transparent dark:text-white"
            />
          </div>
          <p className={`text-red-600 text-xs`}>
            <span className="invisible">x</span>
            {errors.email?.message}
          </p>
          <div className="input flex flex-col w-auto ">
            <label className=" text-sm font-semibold  px-1 bg-transparent dark:text-white dark:lg:text-black">
              Password:
            </label>
            <div
              className="flex border-slate-300 border bg-slate-100 rounded-none lg:rounded-xl w-52  placeholder-gray-500 text-xs overflow-hidden dark:bg-gray-900 justify-center items-center
              "
            >
              <input
                {...register("password")}
                type={`${eye1 ? "text" : "password"}`}
                placeholder="Password"
                className=" h-full w-full px-2 py-2 xl:py-3   bg-slate-100  focus:placeholder-transparent focus:outline-none dark:bg-gray-900 dark:placeholder-gray-400
                 dark:focus:placeholder-transparent dark:text-white"
              />
              <button
                className={`${
                  !passwordValue?.password && "hidden"
                } dark:text-white transition-all duration-50`}
                type="button"
                onClick={() => setEye1(!eye1)}
              >
                {eye1 ? (
                  <GoEye className="mx-3 text-sm" />
                ) : (
                  <GoEyeClosed className="mx-3 text-sm" />
                )}
              </button>
            </div>
          </div>
          <p className={`text-red-600 text-xs`}>
            <span className="invisible">x</span>
            {errors.password?.message}
          </p>

          <p className={`text-red-600 text-xs`}>
            <span className="invisible">x</span>
            {errors.confirmPassword?.message}
          </p>
          <OAuth />
          <button
            disabled={loading}
            className="disabled:opacity-80 w-72  mt-3  text-base px-8 py-2 border bg-green-300 hover:bg-green-400 hover:opacity-90 border-slate-300
             dark:border-white dark:lg:border-black shadow-md    text-shadow-lg  
            transition-transform duration-200 transform active:translate-y-1"
          >
            Sign In
          </button>
          <Link
            disabled={loading}
            to="/app/forgot-password"
            className="underline cursor-pointer hover:font-semibold my-2 dark:text-white dark:lg:text-black"
          >
            Forgot password?
          </Link>
          <p className="pt-3 text-xs text-red-600">{error && error}</p>
          <div className=" flex pb-5">
            <span className=" mx-1 w-auto dark:text-white dark:lg:text-black">
              Already have an account?
            </span>
            <div className="w-16 text-center ">
              <Link
                to="/app"
                className="underline cursor-pointer hover:font-semibold dark:text-white dark:lg:text-black"
              >
                Sign-up
              </Link>
            </div>
          </div>
        </form>
        <div className="hidden lg:flex flex-1 bg-white h-full w-full items-center justify-center dark:bg-gray-900">
          <img
            className="h-3/4 min-h-[330px] object-cover"
            src={dark ? person2 : person1}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
