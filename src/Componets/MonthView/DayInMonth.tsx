import React, { useEffect } from "react";
import { task } from "../../../interfaces";
import TaskInDay from "./TaskInDay";

interface props {
  day: string;
  Tasks: task[];
  setUpdatetTask: React.Dispatch<React.SetStateAction<task | undefined>>;
  setDayToShow: React.Dispatch<React.SetStateAction<string>>;
  setShowAllTasksForADay: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
setDayToAddTask: React.Dispatch<React.SetStateAction<string>>
setShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>


}

function DayInMonth({
  day,
  Tasks,
  setUpdatetTask,
  setDayToShow,
  setShowAllTasksForADay,
  setDayToAddTask,
  setShowUpdateModal,
  setShowModal
}: props) {



  return (
    <div
      className="mothDayBoxShadow  h-full  overflow-y-hidden "
      style={{ width: "14.28%" }}
    >
      <div className="bg-red-400 cursor-pointer duration-300 font-semibold text-white  text-xs md:text-base xl:text-lg w-full h-1/5 flex items-center justify-end pr-5">
        <p
          onClick={() => {
            setDayToAddTask(day);
            setShowModal(true);
          }}
          className="w-4/5 flex items-center justify-center hover:text-fuchsia-500 duration-300 cursor-pointer"
        >
          Add{" "}
        </p>
        <p
          onClick={() => {
            setDayToShow(day);
            setShowAllTasksForADay(true);
          }}
          className="w-4/5 flex items-center justify-center hover:text-fuchsia-500 duration-300 cursor-pointer"
        >
          All
        </p>
        <p className="w-1/5  h-full flex items-center justify-end">
          {parseInt(day.slice(8, 10))}
        </p>
      </div>
      <div className="w-full h-4/5 overflow-x-hidden overflow-y-auto">
        {Tasks &&
          Tasks.slice(0, 3).map((task) => {
            return (
              <TaskInDay
              setDayToAddTask={setDayToAddTask}
              setShowUpdateModal={setShowUpdateModal}
                setUpdatetTask={setUpdatetTask}
                task={task}
              />
            );
          })}
      </div>
    </div>
  );
}

export default DayInMonth;
