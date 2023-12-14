import { Dialog, Transition } from "@headlessui/react";
import PrimaryButton from "../components/PrimaryButton";
import SearchBox from "../components/SearchBox";
import { IoOptionsOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import TaskList from "../components/TaskList";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { IoMdCheckboxOutline } from "react-icons/io";
import TaskCard from "../components/TaskCard";
import { useEffect, useState, Fragment } from "react";
import { axiosOpen } from "../utils/axios";
import Loader from "../components/Loader";
import { MdAddTask } from "react-icons/md";
import { toast } from "react-toastify";

const Tasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState(null);
  const [taskAdding, setTaskAdding] = useState(false);

  const getTasksByStatus = (status) => {
    return allTasks.filter((task) => task.status === status);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const discardTask = (id) => {
    const updatedTasks = allTasks.filter((task) => task._id !== id);
    setAllTasks(updatedTasks);
  };

  const updateTask = (id, updatedTask) => {
    const updatedTasks = allTasks.filter((task) => task._id !== id);
    setAllTasks([...updatedTasks, updatedTask]);
  };

  const addTaskToDB = () => {
    if (!newTaskTitle || !newTaskDescription || !newTaskDueDate) {
      toast.warn("Please fill-up all the fields!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    setTaskAdding(true);

    const newTask = {
      title: newTaskTitle,
      description: newTaskDescription,
      dueDate: newTaskDueDate,
    };

    axiosOpen
      .post("/api/v1/tasks", newTask)
      .then((res) => {
        setTaskAdding(false);
        closeModal();

        toast.info("Task added successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        // Add the new task to the Todo List
        const { _id, title, status, dueDate, description, completed } =
          res.data.task;

        const addedTask = {
          _id,
          title,
          status,
          dueDate,
          description,
          completed,
        };

        setAllTasks([...allTasks, addedTask]);
      })
      .catch(() => {
        setTaskAdding(false);

        toast.error("Error: Task was not added!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
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
          <PrimaryButton
            title="New task"
            icon={<FaPlus />}
            action={openModal}
          />
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
                updateTask={updateTask}
                status={t.status}
                completed={t.completed}
                discardTask={discardTask}
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
                updateTask={updateTask}
                status={t.status}
                completed={t.completed}
                discardTask={discardTask}
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
                updateTask={updateTask}
                status={t.status}
                completed={t.completed}
                discardTask={discardTask}
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

      {/* Add Task Modal Using HeadlessUI */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className="flex gap-2 items-center">
                      <MdAddTask /> Add New Task
                    </div>
                  </Dialog.Title>
                  <div className="mt-4">
                    {/* Title box */}
                    <div>
                      <label
                        htmlFor="Title"
                        className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                      >
                        <input
                          onChange={(event) =>
                            setNewTaskTitle(event.target.value)
                          }
                          type="text"
                          id="Title"
                          maxLength={20}
                          className="w-full px-2 py-2 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                          placeholder="Title"
                        />

                        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                          Title
                        </span>
                      </label>
                      <p className="text-neutral-500 text-[14px] py-2 text-right">
                        {20 - newTaskTitle.length} characters left
                      </p>
                    </div>
                    {/* Description Box */}
                    <div>
                      <label htmlFor="Description" className="sr-only">
                        Description
                      </label>

                      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                        <textarea
                          onChange={(event) =>
                            setNewTaskDescription(event.target.value)
                          }
                          id="Description"
                          className="p-2 w-full resize-none border-none align-top focus:outline-none focus:ring-0 sm:text-sm"
                          rows="4"
                          placeholder="Enter task description..."
                          maxLength={150}
                        ></textarea>

                        <div className="flex items-center justify-between gap-4 bg-white p-3">
                          <p className="text-neutral-500 text-[14px] py-2 text-right">
                            {150 - newTaskDescription.length} characters left
                          </p>
                          <button
                            onClick={() => {
                              setNewTaskDescription("");
                              document.getElementById("Description").value = "";
                            }}
                            type="button"
                            className="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TODO: Add Due Date Option */}
                  <div className="flex justify-between items-center my-3">
                    <span className="text-neutral-500 text-[14px]">
                      Due Date:
                    </span>
                    <input
                      onChange={(event) =>
                        setNewTaskDueDate(event.target.value)
                      }
                      type="date"
                      name="Date"
                      id="Date"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="mt-4">
                    <button
                      disabled={taskAdding}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={addTaskToDB}
                    >
                      {taskAdding ? <Loader /> : "Add Task"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Tasks;
