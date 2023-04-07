import React, { useEffect, useState } from "react";
import { ref, set} from "firebase/database";
import { task } from "../../../interfaces";
import { db } from "../../firebaseConfig";
interface props {
  UpdateTask: task | undefined;
  setShowUpdateTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
}
function UpdateWeekTaskModal({ UpdateTask, setShowUpdateTaskModal }: props) {
  useEffect(() => {
    console.log(UpdateTask);
  }, [UpdateTask]);
  const [FromTime, setFromTime] = useState(UpdateTask?.FromTime);
  const [ToTime, setToTime] = useState(UpdateTask?.ToTime);
  const [Importance, setImportance] = useState(UpdateTask?.Importance);
  const [Name, setName] = useState(UpdateTask?.Name);
  const [Day, setDay] = useState(UpdateTask?.Day);
  const [TaskDescription, setTaskDescription] = useState(
    UpdateTask?.Description
  );
  function handleCloseModal(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if ((e.target as HTMLDivElement).id !== "modal") {
      setShowUpdateTaskModal(false);
    }
  }
  function uploadToDatabse(task: task) {
    set(ref(db, "Tasks/" + task.Day + "/" + task.taskId), task);
    setShowUpdateTaskModal(false);
  }

  function handleSubmit() {
    if (
      FromTime &&
      ToTime &&
      Importance &&
      Name &&
      ToTime &&
      UpdateTask &&
      TaskDescription &&
      Day
    ) {
      const formHours = parseInt(FromTime.slice(0, 2));
      const fromminutes = parseInt(FromTime.slice(3, 5));
      const toHours = parseInt(ToTime.slice(0, 2));
      const toMinutes = parseInt(ToTime.slice(3, 5));
      const newTask: task = {
        Day: Day,
        FromTime: FromTime,
        Importance: Importance,
        Name: Name,
        ToTime: ToTime,
        taskId: UpdateTask.taskId,
        Description: TaskDescription,
      };
      if (FromTime && ToTime && Importance && Name && Day) {
        if (formHours === toHours) {
          if (fromminutes < toMinutes) {
            uploadToDatabse(newTask);
          }
        } else if (formHours < toHours) {
          uploadToDatabse(newTask);
        }
        setShowUpdateTaskModal(false);
      }
    }
  }

  function handleSubmitDelete() {
    set(ref(db, "Tasks/" + UpdateTask?.Day + "/" + UpdateTask?.taskId), null);
    setShowUpdateTaskModal(false);
  }

  return (
    <div
      onClick={(e) => {
        handleCloseModal(e);
      }}
      className="w-full h-full flex  items-center justify-center text-black z-40 ModalPositon"
    >
      <div
        id="modal"
        className="w-5/6 md:w-1/2 xl:w-1/3 h-5/6 bg-white z-50 rounded flex items-center justify-around flex-col "
      >
        <div
          id="modal"
          className="w-full h-16 flex items-center justify-center"
        >
          <p className="text-2xl font-bold">Add task for Today</p>
        </div>

        <div
          id="modal"
          className="w-full h-16  flex items-center justify-around flex-col"
        >
          <p id="modal" className="text-xl font-semibold">
            From
          </p>
          <input
            type="time"
            value={FromTime}
            onChange={(e) => {
              setFromTime(e.target.value);
            }}
            id="modal"
            className="w-2/4 shadow-xl bg-blue-100 h-12"
          />
        </div>

        <div
          id="modal"
          className="w-full h-16  flex items-center justify-around flex-col"
        >
          <p id="modal" className="text-xl font-semibold">
            Name
          </p>
          <input
            value={Name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            id="modal"
            className="w-2/4 shadow-xl bg-blue-100 h-12"
          />
        </div>

        <div className="w-full h-16  flex items-center justify-around flex-col">
          <p id="modal" className="text-xl font-semibold">
            To
          </p>
          <input
            value={ToTime}
            onChange={(e) => {
              setToTime(e.target.value);
            }}
            type="time"
            id="modal"
            className="w-2/4 shadow-xl bg-blue-100 h-12"
          />
        </div>

        <div
          id="modal"
          className="w-full h-16  flex items-center justify-around flex-col"
        >
          <p id="modal" className="text-xl font-semibold">
            Importanece
          </p>
          <select
            value={Importance}
            id="modal"
            onChange={(e) => {
              setImportance(e.target.value);
            }}
            className="w-2/4 shadow-xl bg-blue-100 h-12"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="Hihg">Hihg</option>
          </select>
        </div>

        <div
          id="modal"
          className="w-full h-32  flex items-center justify-around flex-col"
        >
          <p id="modal" className="text-xl font-semibold">
            Description
          </p>
          <textarea
            value={TaskDescription}
            onChange={(e) => {
              setTaskDescription(e.target.value);
            }}
            id="modal"
            className="w-3/4 h-24 bg-blue-100 resize-none"
          ></textarea>
        </div>

        <div className="w-full h-14 flex items-center justify-around">
          <button
            onClick={() => {
              handleSubmit();
            }}
            className="w-52 h-10 bg-blue-600 font-bold rounded text-xl text-white"
            id="modal"
          >
            Update
          </button>
          <button
            onClick={() => {
              handleSubmitDelete();
            }}
            className="w-52 h-10 bg-blue-600 font-bold rounded text-xl text-white"
            id="modal"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateWeekTaskModal;
