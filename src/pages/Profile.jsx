import { useEffect, useRef, useState } from "react";
import Axios from "axios";

import Loader from "../components/Loader";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";

//firebase
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

//png
import background from "../assets/background.png";
import { Link } from "react-router-dom";

//icons
import { MdEdit } from "react-icons/md";
import { GoEye, GoEyeClosed } from "react-icons/go";
import config from "../config";

export default function Profile() {
  const {
    currentUser,
    error: isError,
    loading: isLoading,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //file uploading
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);

  const [uploadFilePerc, setUploadFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  //user data
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //pop up message if profile updated
  const [isVisible, setIsVisible] = useState(false);

  //eye icon
  const [close2, setClose2] = useState(true);
  const [close3, setClose3] = useState(true);

  //pen icon ref
  const pen1 = useRef(null);
  const pen2 = useRef(null);
  const pen3 = useRef(null);

  const handleClick = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 1500);
  };

  useEffect(() => {
    if (file) {
      uploadFile(file);
    }
  }, [file]);

  const uploadFile = () => {
    setFileUploadError(false);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUserInfo({ ...userInfo, avatar: downloadURL });
          setFileUploadError(false);
        });
      }
    );
  };

  useEffect(() => {
    dispatch(updateUserStart(false));
    setLoading(true);
    Axios.get(`${config.apiUrl}/auth/getUser/${currentUser._id}`)
      .then((res) => {
        setLoading(false);
        return setUserInfo(res.data);
      })
      .catch((err) => {
        const { message, success } = err.response.data;
        if (success === false) {
          setLoading(false);
          return setError(message);
        }
      });
  }, [currentUser._id]);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFileUploadError(false);
    dispatch(updateUserStart(true));
    Axios.patch(
      `${config.apiUrl}/auth/update-user/${currentUser._id}`,
      userInfo
    )
      .then((res) => {
        handleClick();
        dispatch(updateUserSuccess(res.data));
      })
      .catch((err) => {
        const { message, success } = err.response.data;
        if (success === false) {
          dispatch(updateUserFailure(message));
        }
      });
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <p className="flex justify-center items center">{error}</p>
  ) : (
    <div className="flex flex-col items-center w-screen h-auto mb-10 dark:bg-gray-900">
      <h1 className="font-semibold my-5 text-3xl lg:text-4xl dark:text-neutral-300">
        Profile
      </h1>
      <div
        style={{
          backgroundImage: `url(${background})`,
          boxShadow: "12px 17px 51px rgba(0, 0, 0, 0.10)",
        }}
        className="flex flex-col items-center border border-slate-200 text-slate-700  rounded-2xl pt-14 lg:pt-40 w-full bg-no-repeat bg-cover overflow-hidden"
      >
        <input
          type="file"
          ref={fileRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {uploadFilePerc > 0 && uploadFilePerc < 100 ? (
          <div className="absolute flex-col gap-4 w-full flex items-center justify-center ">
            <div className="bg-black w-28 h-28 border-8  animate-spin border-gray-200 flex items-center justify-center border-t-blue-400 rounded-full"></div>
            <p className="absolute text-white">{uploadFilePerc}%</p>
          </div>
        ) : (
          <img
            onClick={() => fileRef.current.click()}
            className="rounded-full object-contain  bg-gray-900 w-28 h-28 absolute border-8 border-gray-200 cursor-pointer  hover:opacity-85 dark:border-gray-700  "
            src={userInfo?.avatar}
          />
        )}

        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center items-center rounded-b-2xl gap-y-3 mt-10 pb-10 bg-white border-t-8 border-gray-200   pt-20 w-full dark:bg-gray-900 dark:border-gray-700"
        >
          <h2 className="capitalize font-semibold text-2xl dark:text-neutral-300">
            {userInfo?.name}
          </h2>
          <div className="input flex flex-col w-auto ">
            <label className="text-green-300 text-xs font-semibold relative top-2 ml-2 px-1 bg-white w-11 dark:bg-gray-900">
              Name:
            </label>
            <div className="flex justify-center w-full lg:w-72 items-center px-3 text-2xl border-2 border-green-200 rounded-2xl ">
              <input
                ref={pen1}
                id="name"
                onChange={handleChange}
                defaultValue={userInfo?.name}
                type="text"
                placeholder="Name"
                className="px-3  input  py-3 text-xs bg-white  rounded-2xl w-3/4 focus:outline-none placeholder-gray-500 font-semibold focus:placeholder-transparent dark:bg-gray-900 
                dark:text-neutral-300 dark:placeholder-gray-500"
              />
              <MdEdit
                onClick={() => pen1.current.focus()}
                className="cursor-pointer dark:text-neutral-300 dark:hover:text-white"
              />
            </div>
          </div>

          <div className="input flex flex-col w-auto ">
            <label className="text-green-400 text-xs font-semibold relative top-2 ml-2 px-1 bg-white w-24 dark:bg-gray-900">
              New Password:
            </label>
            <div className="flex justify-center w-full lg:w-72 items-center px-3 text-2xl border-2 border-green-200 rounded-2xl">
              <input
                ref={pen2}
                id="newPassword"
                onChange={handleChange}
                type={close2 ? "password" : "text"}
                placeholder="New Password"
                className=" px-3  input  py-3 text-xs bg-white rounded-2xl w-3/4 focus:outline-none placeholder-gray-500 font-semibold focus:placeholder-transparent dark:bg-gray-900 
                dark:text-neutral-300 dark:placeholder-gray-500"
              />
              <span>
                {userInfo.newPassword && (
                  <>
                    {close2 ? (
                      <GoEyeClosed
                        onClick={() => setClose2(false)}
                        className="text-sm text-gray-500 mx-3 cursor-pointer  dark:text-neutral-300"
                      />
                    ) : (
                      <GoEye
                        onClick={() => setClose2(true)}
                        className="text-sm text-gray-500 mx-3 cursor-pointer  dark:text-neutral-300"
                      />
                    )}
                  </>
                )}
              </span>
              <MdEdit
                onClick={() => pen2.current.focus()}
                className="cursor-pointer dark:text-neutral-300 dark:hover:text-white"
              />
            </div>
          </div>

          <div className="input flex flex-col w-auto ">
            <label className="text-green-400 text-xs font-semibold relative top-2 ml-2 px-1 bg-white w-28 dark:bg-gray-900">
              Current Password:
            </label>
            <div className="flex justify-center w-full lg:w-72 items-center px-3 text-2xl border-2 border-green-200 rounded-2xl">
              <input
                ref={pen3}
                id="currentPassword"
                onChange={handleChange}
                type={close3 ? "password" : "text"}
                placeholder="Current Password"
                className="px-3  input  py-3 text-xs bg-white rounded-2xl w-3/4 focus:outline-none placeholder-gray-500 font-semibold focus:placeholder-transparent dark:bg-gray-900 
                dark:text-neutral-300 dark:placeholder-gray-500"
              />
              <span>
                {userInfo.currentPassword && (
                  <>
                    {close3 ? (
                      <GoEyeClosed
                        onClick={() => setClose3(false)}
                        className="text-sm text-gray-500 mx-3 cursor-pointer dark:text-neutral-300"
                      />
                    ) : (
                      <GoEye
                        onClick={() => setClose3(true)}
                        className="text-sm text-gray-500 mx-3 cursor-pointer  dark:text-neutral-300"
                      />
                    )}
                  </>
                )}
              </span>
              <MdEdit
                onClick={() => pen3.current.focus()}
                className="cursor-pointer dark:text-neutral-300 dark:hover:text-white"
              />
            </div>
          </div>

          {fileUploadError && (
            <p className="text-red-500 text-sm">
              Please upload a file less than 2MB
            </p>
          )}

          {isError && (
            <p className="text-red-500 text-sm flex flex-col">
              {isError}
              <Link
                to="/app/forgot-password"
                className="text-sm hover:underline text-gray-900 dark:text-white text-center"
              >
                Forgot Password?
              </Link>
            </p>
          )}
          {isVisible && (
            <p className="text-green-500 ">User Updated &#128526;</p>
          )}
          <button
            disabled={(uploadFilePerc < 100 && uploadFilePerc > 0) || isLoading}
            className="disabled:opacity-85 bg-green-200 flex justify-center w-64 items-center border-2 py-1 px-5 mt-2 gap-x-2 border-green-300  font-semibold hover:shadow-inner hover:bg-green-300
               transition-colors duration-200  transform active:translate-y-1"
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
