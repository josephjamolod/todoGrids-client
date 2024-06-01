import { AiOutlineDelete, AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

export default function SideBar({
  handleEditProfileButton,
  handleSignOut,
  handleDeleteAccountButton,
  confirmDelete,
}) {
  return (
    <ul>
      <Link to={"/app/main"}>
        <li
          onClick={handleEditProfileButton}
          className="flex justify-start gap-x-3 items-center  hover:bg-green-50  cursor-pointer px-2 py-1 rounded-t-lg hover:underline dark:hover:text-gray-900 "
        >
          <CgProfile className="text-2xl " /> Edit Profile
        </li>
      </Link>
      <li
        onClick={handleSignOut}
        className="flex justify-start gap-x-3 items-center  hover:bg-green-50  cursor-pointer px-2 py-1 border-y-2 border-gray-200  hover:underline dark:hover:text-gray-900"
      >
        <AiOutlineLogout className="text-2xl " /> Log Out
      </li>
      <button
        type="button"
        disabled={confirmDelete}
        onClick={handleDeleteAccountButton}
        className="flex justify-start gap-x-3 items-center  hover:bg-green-50  cursor-pointer px-2 py-1 rounded-b-lg hover:underline dark:hover:text-gray-900"
      >
        <AiOutlineDelete className="text-2xl " /> Delete Account
      </button>
    </ul>
  );
}
