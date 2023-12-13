import { RiDeleteBin6Line } from "react-icons/ri";
import { LuPencil } from "react-icons/lu";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { axiosOpen } from "../utils/axios";
import Loader from "./Loader";
import { toast } from "react-toastify";

const TaskCard = ({ title, description, dueDate, taskID, discardTask }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskDeleting, setTaskDeleting] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

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
    alert("edit" + id);
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
            <LuPencil
              onClick={() => handleEditBtn(taskID)}
              className="cursor-pointer"
            />
          </span>
        </div>
        <p className="text-neutral-600 text-[15px] mt-3">{description}</p>
        <h3 className="text-neutral-500 text-[15px] mt-2 hidden">
          Due Date: {getFormattedDate(dueDate)}
        </h3>
      </div>

      {/* Modal */}
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
    </>
  );
};

export default TaskCard;
