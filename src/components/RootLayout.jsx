import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="dark:bg-gray-900">
      <Outlet />
    </div>
  );
}
