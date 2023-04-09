import React, { useEffect, useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "../firebaseConfig";
import { task } from "../../interfaces";
interface props {
  SelectedCategory: number;
  setUpdatetTask: React.Dispatch<React.SetStateAction<task | undefined>>;
  UpdatedTask: task | undefined;
  DayToAddTask:string
  setShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>
}
function UpdateTaskModal({
  UpdatedTask,
  setUpdatetTask,
  SelectedCategory,
  DayToAddTask,
  setShowUpdateModal
}: props) {
  const [FromTime, setFromTime] = useState(UpdatedTask?.FromTime);
  const [ToTime, setToTime] = useState(UpdatedTask?.ToTime);
  const [Importance, setImportance] = useState(UpdatedTask?.Importance);
  const [Name, setName] = useState(UpdatedTask?.Name);
  const [Day, setDay] = useState("");
  const [TaskDescription, setTaskDescription] = useState(
    UpdatedTask?.Description
  );
  function handleCloseModal(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if ((e.target as HTMLDivElement).id !== "modal") {
      setUpdatetTask(undefined);
      setShowUpdateModal(false)
    }
  }
  function uploadToDatabse(task: task) {
    set(ref(db, "Tasks/" + task.Day + "/" + task.taskId), task);
    setUpdatetTask(undefined);
  }

  function handleSubmit() {

    if (FromTime && ToTime && Importance && Name && Day ) {

      const formHours = parseInt(FromTime.slice(0, 2));
      const fromminutes = parseInt(FromTime.slice(3, 5));
      const toHours = parseInt(ToTime.slice(0, 2));
      const toMinutes = parseInt(ToTime.slice(3, 5));
      //@ts-ignore
      const newTask: task = {Day: Day,FromTime: FromTime,Importance: Importance,Name: Name,ToTime: ToTime,taskId: UpdatedTask.taskId,Description: TaskDescription};
      if (formHours === toHours) {

        if (fromminutes < toMinutes) {
            uploadToDatabse(newTask);
            setShowUpdateModal(false)
            } 
      }
      else if (formHours < toHours) {

        uploadToDatabse(newTask);
        setShowUpdateModal(false)
      }
    }
  }

  function handleSubmitDelete() {
   
      set(ref(db, "Tasks/" + UpdatedTask?.Day + "/" + UpdatedTask?.taskId), null);
      setUpdatetTask(undefined);
      setShowUpdateModal(false)

   
  }

  useEffect(() => {

    if(SelectedCategory < 2)
    {
      const date = new Date()
      setDay(date.toDateString());
    }
    else
    {
      setDay(DayToAddTask)
    }

  }, [UpdatedTask]);

  return (
    <div
      onClick={(e) => {
        handleCloseModal(e);
      }}
      className="w-full h-full flex  items-center justify-center z-40 ModalPositon"
    >
      <div
        id="modal"
        className="w-5/6 md:w-1/2 xl:w-1/3 h-5/6 bg-white z-50 rounded flex items-center justify-around flex-col "
      >
        <div
          id="modal"
          className="w-full h-16 flex items-center justify-center"
        >
          <p className="text-2xl font-bold">Update Task</p>
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
            className="w-56 h-10 bg-blue-600 font-bold rounded text-xl text-white"
            id="modal"
          >
            Update
          </button>
          <button
            onClick={() => {
              handleSubmitDelete();
            }}
            className="w-56 h-10 bg-blue-600 font-bold rounded text-xl text-white"
            id="modal"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateTaskModal;
