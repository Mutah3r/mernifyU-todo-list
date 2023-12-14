import { RiDeleteBin6Line } from "react-icons/ri";
import { LuPencil } from "react-icons/lu";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { axiosOpen } from "../utils/axios";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { MdAddTask } from "react-icons/md";

const TaskCard = ({
  status,
  title,
  description,
  dueDate,
  taskID,
  discardTask,
  updateTask,
}) => {
  // is open modal for deleting popup
  const [isOpen, setIsOpen] = useState(false);
  // task-edit modal
  const [showEdit, setShowEdit] = useState(false);
  // loading state for task deleting
  const [taskDeleting, setTaskDeleting] = useState(false);
  // New task info after editing
  const [newTaskTitle, setNewTaskTitle] = useState(title);
  const [newTaskDescription, setNewTaskDescription] = useState(description);
  const [newTaskDueDate, setNewTaskDueDate] = useState(dueDate);
  const [newTaskStatus, setNewTaskStatus] = useState(status);
  const [taskUpdating, setTaskUpdating] = useState(false);

  const showEditModal = () => {
    setShowEdit(true);
  };

  const closeEditModal = () => {
    setShowEdit(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const getFormattedDate = (date) => {
    const providedDate = new Date(date);

    const year = providedDate.getFullYear();
    const month = providedDate.getMonth() + 1; // Month is zero-indexed, so adding 1
    const day = providedDate.getDate();

    const formattedDate = `${day < 10 ? "0" : ""}${day}/${
      month < 10 ? "0" : ""
    }${month}/${year}`;

    return formattedDate;
  };

  const handleEditBtn = (id) => {
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

    setTaskUpdating(true);

    const updatedTaskInfo = {
      title: newTaskTitle,
      description: newTaskDescription,
      dueDate: newTaskDueDate,
      status: newTaskStatus,
      completed: newTaskStatus === "Completed",
    };

    axiosOpen
      .patch(`/api/v1/tasks/${id}`, updatedTaskInfo)
      .then((res) => {
        updateTask(taskID, res.data.task);
        setTaskUpdating(false);
        closeEditModal();
        // give success message
        toast.info("Task updated successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        // update the task list
      })
      .catch(() => {
        setTaskUpdating(false);
        // give error message
        toast.error("Error: Task was not updated!", {
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

  const handleDeleteBtn = (id) => {
    setTaskDeleting(true);
    axiosOpen
      .delete(`/api/v1/tasks/${id}`)
      .then(() => {
        toast.info("Task deleted successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTaskDeleting(false);
        closeModal();
        // update the task list
        discardTask(taskID);
      })
      .catch(() => {
        toast.error("Error: Task was not deleted!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTaskDeleting(false);
      });
  };

  return (
    <>
      <div className="bg-white rounded-lg p-3">
        <div className="flex gap-2 justify-between items-center">
          <h1 className="text-[16px] font-semibold text-neutral-600 tracking-wide whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
          </h1>
          <span className="flex gap-[6px] text-neutral-700">
            <RiDeleteBin6Line onClick={openModal} className="cursor-pointer" />
            <LuPencil onClick={showEditModal} className="cursor-pointer" />
          </span>
        </div>
        <p className="text-neutral-600 text-[15px] mt-3">{description}</p>
        <h3 className="text-neutral-500 text-[15px] mt-2">
          Due Date: {getFormattedDate(dueDate)}
        </h3>
      </div>

      {/* Delete message Modal */}
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
                    className="text-lg font-medium leading-6 text-gray-900 text-center"
                  >
                    Are you sure?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 text-center">
                      You will not be able to revert this!
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2 justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      disabled={taskDeleting}
                      onClick={() => handleDeleteBtn(taskID)}
                    >
                      {taskDeleting ? <Loader /> : "Yes, delete it!"}
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Task Editing Modal */}
      <Transition appear show={showEdit} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeEditModal}>
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
                      <MdAddTask /> Edit Task
                    </div>
                  </Dialog.Title>
                  <div className="mt-4">
                    {/* Title box */}
                    <div>
                      <label
                        htmlFor="EditTitle"
                        className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                      >
                        <input
                          value={newTaskTitle}
                          onChange={(e) => {
                            setNewTaskTitle(e.target.value);
                          }}
                          type="text"
                          id="EditTitle"
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
                      <label htmlFor="EditDescription" className="sr-only">
                        Description
                      </label>

                      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                        <textarea
                          value={newTaskDescription}
                          onChange={(event) =>
                            setNewTaskDescription(event.target.value)
                          }
                          id="EditDescription"
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

                  {/* Due Date */}
                  <div className="flex justify-between items-center my-3">
                    <span className="text-neutral-500 text-[14px]">
                      Due Date:
                    </span>
                    <input
                      onChange={(event) =>
                        setNewTaskDueDate(event.target.value)
                      }
                      type="date"
                      name="EditDate"
                      id="EditDate"
                      value={
                        dueDate.slice(0, 4) +
                        "-" +
                        dueDate.slice(5, 7) +
                        "-" +
                        dueDate.slice(8, 10)
                      }
                    />
                  </div>

                  {/* Status */}
                  <div className="">
                    <span className="text-neutral-500 text-[14px]">
                      Status:
                    </span>
                    <div className="flex gap-1 mt-1">
                      <label>
                        <input
                          type="radio"
                          value="Pending"
                          checked={newTaskStatus === "Pending"}
                          onChange={() => setNewTaskStatus("Pending")}
                        />
                        <span className="ms-1">Todo</span>
                      </label>
                      <br />

                      <label>
                        <input
                          type="radio"
                          value="In Progress"
                          checked={newTaskStatus === "In Progress"}
                          onChange={() => setNewTaskStatus("In Progress")}
                        />
                        <span className="ms-1">In Progress</span>
                      </label>
                      <br />

                      <label>
                        <input
                          type="radio"
                          value="Completed"
                          checked={newTaskStatus === "Completed"}
                          onChange={() => setNewTaskStatus("Completed")}
                        />
                        <span className="ms-1">Done</span>
                      </label>
                      <br />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-4">
                    <button
                      disabled={taskUpdating}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => handleEditBtn(taskID)}
                    >
                      {taskUpdating ? <Loader /> : "Add Task"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default TaskCard;
