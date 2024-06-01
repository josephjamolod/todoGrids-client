export default function ShowMoreButton({ fetchData }) {
  return (
    <button
      onClick={fetchData}
      type="button"
      className="border border-slate-700 font-semibold text-sm mb-5 px-2 duration-200 hover:bg-slate-200 hover:underline active:translate-y-2
      dark:border-neutral-300 dark:text-neutral-300 dark:hover:underline dark:hover:bg-neutral-300 dark:hover:text-gray-900"
    >
      Show More
    </button>
  );
}
