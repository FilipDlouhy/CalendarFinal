import React from "react";
import { task } from "../../../interfaces";
import TaskInADay from "./TaskInADay";

interface props {
  setShowTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
  day: string;
  Tasks: task[];
  setDayToAddTask: React.Dispatch<React.SetStateAction<string>>;
  setUpdatetTask: React.Dispatch<React.SetStateAction<task | undefined>>;
  setShowUpdateTaskModalMonth: React.Dispatch<React.SetStateAction<boolean>>;
  setDayToShow: React.Dispatch<React.SetStateAction<string>>;
  setShowAllTasksForADay: React.Dispatch<React.SetStateAction<boolean>>;
}

function DayInAMonht({
  setShowTaskModal,
  setShowUpdateTaskModalMonth,
  day,
  Tasks,
  setDayToAddTask,
  setUpdatetTask,
  setDayToShow,
  setShowAllTasksForADay,
}: props) {
  return (
    <div
      className="mothDayBoxShadow  h-full  overflow-y-hidden "
      style={{ width: "14.28%" }}
    >
      <div className="bg-red-400 cursor-pointer duration-300 font-semibold text-white  text-xs md:text-base xl:text-xl w-full h-1/5 flex items-center justify-end pr-5">
        <p
          onClick={() => {
            setDayToAddTask(day);
            setShowTaskModal(true);
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
              <TaskInADay
                setShowUpdateTaskModalMonth={setShowUpdateTaskModalMonth}
                setUpdatetTask={setUpdatetTask}
                task={task}
              />
            );
          })}
      </div>
    </div>
  );
}

export default DayInAMonht;
