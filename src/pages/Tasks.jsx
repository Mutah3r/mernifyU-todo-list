import PrimaryButton from "../components/PrimaryButton";
import SearchBox from "../components/SearchBox";
import { IoOptionsOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import TaskList from "../components/TaskList";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { IoMdCheckboxOutline } from "react-icons/io";
import TaskCard from "../components/TaskCard";

const Tasks = () => {
  return (
    <div>
      {/* Search box */}
      <div>
        <SearchBox />
      </div>

      {/* Task page actions */}
      <div className="mt-5 flex justify-between items-center">
        <h2 className="text-neutral-600 text-[24px] font-semibold tracking-wider">
          Tasks
        </h2>
        <div className="flex gap-3 items-center">
          <IoOptionsOutline className="text-neutral-700 text-[20px] cursor-pointer" />
          <PrimaryButton title="New task" icon={<FaPlus />} />
        </div>
      </div>

      {/* Task Lists */}
      <div className="grid grid-cols-3 gap-6 mt-8">
        {/* Pending tasks container */}
        <TaskList
          title="Todo"
          icon={<MdOutlineCheckBoxOutlineBlank />}
          type="pending"
        >
          <div className="mt-2 flex flex-col gap-3">
            <TaskCard
              taskID="123"
              title="This is the title of this card"
              description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus quasi officiis, quidem inventore odit ut impedit alias sint quaerat repellat."
            />
          </div>
        </TaskList>

        {/* In progress tasks container */}
        <TaskList title="In progress" icon={<GrInProgress />} type="progress">
          <div className="mt-2 flex flex-col gap-3">
            <TaskCard
              taskID="123"
              title="This is the title of this card"
              description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus quasi officiis, quidem inventore odit ut impedit alias sint quaerat repellat."
            />
          </div>
        </TaskList>

        {/* Completed tasks container */}
        <TaskList
          title="Done"
          icon={<IoMdCheckboxOutline />}
          type="completed"
        ></TaskList>
      </div>
    </div>
  );
};

export default Tasks;
