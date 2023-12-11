import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Main = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5">
      <div className="col-span-1 p-4">
        <Sidebar />
      </div>
      <div className="col-span-1 sm:col-span-2 lg:col-span-4 p-4 sm:px-6 sm:py-4 sm:border-l sm:min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
