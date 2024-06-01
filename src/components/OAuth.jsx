import Axios from "axios";
import { useDispatch } from "react-redux";
import { useState } from "react";

import GoogleIcon from "../assets/icons/GoogleIcon";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { signInUserSuccess } from "../redux/user/userSlice";

export default function OAuth() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    setLoading(true);
    setError(false);

    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const response = await signInWithPopup(auth, provider);
    const { displayName, email, photoURL } = response.user;
    Axios.post("/api/auth/google", {
      name: displayName,
      email,
      photo: photoURL,
    })
      .then((res) => {
        setLoading(false);
        dispatch(signInUserSuccess(res.data));

        if (res.data.message && res.data.message === "New User") {
          alert(
            "Your default password has been sent to your email. You can change it anytime."
          );
        }
        return;
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
        return;
      });
  };
  return (
    <div className="flex flex-col xl:gap-2  justify-center w-full  xl:mt-2">
      <p className="text-red-600 text-xs ">{error}</p>
      <button
        disabled={loading}
        onClick={handleGoogleClick}
        className="disabled:opacity-85 flex bg-green-50 hover:bg-slate-100 justify-center w-72 self-center items-center border py-1  gap-x-2 border-slate-300 dark:border-white rounded-lg font-semibold  
         transition-colors duration-200  dark:bg-gray-900 dark:hover:bg-gray-900 dark:text-white dark:lg:border-black dark:lg:text-white "
        type="button"
      >
        <GoogleIcon />
        Continue with Google
      </button>
    </div>
  );
}
