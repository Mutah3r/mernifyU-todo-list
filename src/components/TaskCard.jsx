import { RiDeleteBin6Line } from "react-icons/ri";
import { LuPencil } from "react-icons/lu";

const TaskCard = ({ title, description, dueDate }) => {
  return (
    <div className="bg-white rounded-lg p-3">
      <div className="flex gap-2 justify-between items-center">
        <h1 className="text-[16px] font-semibold text-neutral-600 tracking-wide whitespace-nowrap overflow-hidden text-ellipsis">
          {title}
        </h1>
        <span className="flex gap-[6px] text-neutral-700">
          <RiDeleteBin6Line className="cursor-pointer" />
          <LuPencil className="cursor-pointer" />
        </span>
      </div>
      <p className="text-neutral-600 text-[15px] mt-3">{description}</p>
      <h3 className="text-neutral-500 text-[15px] mt-2">Due Date: {dueDate}</h3>
    </div>
  );
};

export default TaskCard;
