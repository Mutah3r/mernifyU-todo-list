import DashboardLink from "./DashboardLink";
import Logo from "./Logo";
import { LuLayoutDashboard, LuListTodo } from "react-icons/lu";

const Sidebar = () => {
  return (
    <div>
      {/* Logo Container */}
      <div className="flex justify-center items-center">
        <Logo />
      </div>

      {/* Dashboard Navigation */}
      <div className="flex flex-col gap-4 mt-5">
        <DashboardLink
          title="Dashboard"
          link="/"
          icon={<LuLayoutDashboard />}
        />
        <DashboardLink title="Tasks" link="/tasks" icon={<LuListTodo />} />
      </div>
    </div>
  );
};

export default Sidebar;
