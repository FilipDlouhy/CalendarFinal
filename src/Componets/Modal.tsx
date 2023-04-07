import React, { useEffect, useState } from "react";
import { ref, set} from "firebase/database";
import { db } from "../firebaseConfig";
import { task } from "../../interfaces";
import uuid from "react-uuid";
interface props {
  setTodayTasks: React.Dispatch<React.SetStateAction<task[]>>;
  TodayTasks: task[];
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  SelectedCategory: number;
  Today: string;
  setDailyDay: React.Dispatch<React.SetStateAction<string | undefined>>;
  DailyDay: string | undefined;
  DailyTaks: task[];
  setDailyTaks: React.Dispatch<React.SetStateAction<task[]>>;
}
function Modal({
  setDailyTaks,
  DailyTaks,
  DailyDay,
  setShowModal,
  TodayTasks,
  setTodayTasks,
  SelectedCategory,
  Today,
}: props) {
  const [FromTime, setFromTime] = useState("");
  const [ToTime, setToTime] = useState("");
  const [Importance, setImportance] = useState("Low");
  const [Name, setName] = useState("");
  const [Day, setDay] = useState("");
  const [TaskDescription, setTaskDescription] = useState("");
  function handleCloseModal(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if ((e.target as HTMLDivElement).id !== "modal") {
      setShowModal(false);
    }
  }
  function uploadToDatabse(task: task) {
    set(ref(db, "Tasks/" + task.Day + "/" + task.taskId), task);
    setShowModal(false);
  }

  function handleSubmit() {
    const formHours = parseInt(FromTime.slice(0, 2));
    const fromminutes = parseInt(FromTime.slice(3, 5));
    const toHours = parseInt(ToTime.slice(0, 2));
    const toMinutes = parseInt(ToTime.slice(3, 5));
    const taskId = uuid();
    const newTask: task = {
      Day: Day,
      FromTime: FromTime,
      Importance: Importance,
      Name: Name,
      ToTime: ToTime,
      taskId: taskId,
      Description: TaskDescription,
    };
    if (FromTime && ToTime && Importance && Name && Day) {
      if (formHours === toHours) {
        if (fromminutes < toMinutes) {
          uploadToDatabse(newTask);
          setShowModal(false);
          if (SelectedCategory === 1) {
            const arr = TodayTasks;
            arr.push(newTask);
            arr.sort((a, b) => {
              const aTime = new Date(`1970-01-01T${a.FromTime}`);
              const bTime = new Date(`1970-01-01T${b.FromTime}`);
              return aTime.getTime() - bTime.getTime();
            });
            setTodayTasks(arr);
          } else if (SelectedCategory === 2) {
            const arr = DailyTaks;
            arr.push(newTask);
            arr.sort((a, b) => {
              const aTime = new Date(`1970-01-01T${a.FromTime}`);
              const bTime = new Date(`1970-01-01T${b.FromTime}`);
              return aTime.getTime() - bTime.getTime();
            });
            setDailyTaks(arr);
          }
        }
      } else if (formHours < toHours) {
        uploadToDatabse(newTask);
        setShowModal(false);
        if (SelectedCategory === 1) {
          const arr = TodayTasks;
          arr.push(newTask);
          arr.sort((a, b) => {
            const aTime = new Date(`1970-01-01T${a.FromTime}`);
            const bTime = new Date(`1970-01-01T${b.FromTime}`);
            return aTime.getTime() - bTime.getTime();
          });
          setTodayTasks(arr);
        } else if (SelectedCategory === 2) {
          const arr = DailyTaks;
          arr.push(newTask);
          arr.sort((a, b) => {
            const aTime = new Date(`1970-01-01T${a.FromTime}`);
            const bTime = new Date(`1970-01-01T${b.FromTime}`);
            return aTime.getTime() - bTime.getTime();
          });
          setDailyTaks(arr);
        }
      }
    }

    if (SelectedCategory) {
    }
  }

  useEffect(() => {
    if (SelectedCategory === 1) {
      setDay(Today);
    } else if (SelectedCategory === 2 && DailyDay) {
      setDay(DailyDay);
    }
  }, [SelectedCategory]);

  return (
    <div
      onClick={(e) => {
        handleCloseModal(e);
      }}
      className="w-full h-full flex items-center justify-center z-40 ModalPositon"
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
          className={
            SelectedCategory < 3
              ? "hidden"
              : "w-full h-16  flex items-center justify-around flex-col"
          }
        >
          <p id="modal" className="text-xl font-semibold">
            Day
          </p>
          <input
            id="modal"
            onChange={(e) => {
              const newDate = new Date(e.target.value);
              setDay(newDate.toDateString());
            }}
            type="date"
            className="w-2/4 shadow-xl bg-blue-100 h-12"
          />
        </div>

        <div
          id="modal"
          className="w-full h-32  flex items-center justify-around flex-col"
        >
          <p id="modal" className="text-xl font-semibold">
            Description
          </p>
          <textarea
            onChange={(e) => {
              setTaskDescription(e.target.value);
            }}
            id="modal"
            className="w-3/4 h-24 bg-blue-100 resize-none"
          ></textarea>
        </div>
        <button
          onClick={() => {
            handleSubmit();
          }}
          className="w-72 h-10 bg-blue-600 font-bold rounded text-xl text-white"
          id="modal"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default Modal;
