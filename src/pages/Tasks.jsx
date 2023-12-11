import PrimaryButton from "../components/PrimaryButton";
import SearchBox from "../components/SearchBox";
import { IoOptionsOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

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
    </div>
  );
};

export default Tasks;
