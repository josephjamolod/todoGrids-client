import { ImFilesEmpty } from "react-icons/im";
import { BiSad } from "react-icons/bi";

export default function EmptyTask(message) {
  return (
    <div className="py-10 lg:py-20 flex flex-col items-center gap-y-3">
      <div className="relative bg-green-50 p-10 border rounded-xl border-slate-300 justify-center flex w-28 dark:bg-gray-700">
        <ImFilesEmpty className="text-2xl text-slate-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <h1 className="text-slate-300 font-semibold">{message.message}</h1>
      <BiSad className="text-2xl text-slate-300" />
    </div>
  );
}
