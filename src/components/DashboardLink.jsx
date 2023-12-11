import { NavLink } from "react-router-dom";

const DashboardLink = ({ title, link, icon }) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        isActive
          ? "bg-blue-500 text-white flex gap-2 text-[18px] items-center rounded-lg px-4 py-2"
          : "bg-blue-100 text-blue-700 flex gap-2 text-[18px] items-center rounded-lg px-4 py-2"
      }
    >
      {icon}
      {title}
    </NavLink>
  );
};

export default DashboardLink;
