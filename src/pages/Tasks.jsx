import PrimaryButton from "../components/PrimaryButton";
import SearchBox from "../components/SearchBox";
import { IoOptionsOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import TaskList from "../components/TaskList";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { IoMdCheckboxOutline } from "react-icons/io";
import TaskCard from "../components/TaskCard";
import { useEffect, useState } from "react";
import { axiosOpen } from "../utils/axios";
import Loader from "../components/Loader";

const Tasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTasksByStatus = (status) => {
    return allTasks.filter((task) => task.status === status);
  };

  useEffect(() => {
    axiosOpen.get("/api/v1/tasks").then((res) => {
      setAllTasks(res.data.tasks);
      setLoading(false);
    });
  }, []);

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
          {loading ? (
            <div className="h-[100px] flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            getTasksByStatus("Pending").map((t) => (
              <TaskCard
                taskID={t._id}
                key={t._id}
                dueDate={t.dueDate}
                title={t.title}
                description={t.description}
              />
            ))
          )}
        </TaskList>

        {/* In progress tasks container */}
        <TaskList title="In progress" icon={<GrInProgress />} type="progress">
          {loading ? (
            <div className="h-[100px] flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            getTasksByStatus("In Progress").map((t) => (
              <TaskCard
                taskID={t._id}
                key={t._id}
                dueDate={t.dueDate}
                title={t.title}
                description={t.description}
              />
            ))
          )}
        </TaskList>

        {/* Completed tasks container */}
        <TaskList title="Done" icon={<IoMdCheckboxOutline />} type="completed">
          {loading ? (
            <div className="h-[100px] flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            getTasksByStatus("Completed").map((t) => (
              <TaskCard
                taskID={t._id}
                key={t._id}
                dueDate={t.dueDate}
                title={t.title}
                description={t.description}
              />
            ))
          )}
        </TaskList>
      </div>
    </div>
  );
};

export default Tasks;
