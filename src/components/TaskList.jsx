import React from "react";

const TaskList = ({ title, icon, type, children }) => {
  return (
    <div
      className={`${
        type == "pending"
          ? "bg-violet-100"
          : type == "progress"
          ? "bg-yellow-100"
          : type == "completed"
          ? "bg-red-100"
          : ""
      } p-3 rounded-lg`}
    >
      <h3
        className={`${
          type == "pending"
            ? "text-blue-700"
            : type == "progress"
            ? "text-yellow-700"
            : type == "completed"
            ? "text-red-700"
            : ""
        } flex gap-3 items-center text-[16px] font-semibold tracking-wider`}
      >
        {icon} <span>{title}</span>
      </h3>
      {React.Children.count(children) !== 0 ? (
        <div className="mt-2 flex flex-col gap-3">{children}</div>
      ) : (
        <div className="flex items-center justify-center h-[200px] p-4">
          <p className="text-gray-600">
            {type == "pending"
              ? "No pending task"
              : type == "progress"
              ? "No task in progress"
              : type == "completed"
              ? "No completed task"
              : "This section is empty"}
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
