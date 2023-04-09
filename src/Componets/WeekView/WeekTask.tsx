import React, { useEffect, useState } from "react";
import { task } from "../../../interfaces";

interface props {
  task: task;
  setUpdateTask: React.Dispatch<React.SetStateAction<task | undefined>>;
  setShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDayToAddTask: React.Dispatch<React.SetStateAction<string>>;
}
function WeekTask({
  task,
  setUpdateTask,
  setShowUpdateModal,
  setDayToAddTask,
}: props) {
  return (
    <div
      onClick={() => {
        setUpdateTask(task);
        setShowUpdateModal(true);
        setDayToAddTask(task.Day);
      }}
      className={`importance-${task.Importance} w-1/4 md:w-1/6 h-full mothDayBoxShadow bg-emerald-400 hover:bg-yellow-400 cursor-pointer duration-300 p-1`}
    >
      <div className="w-full  h-1/4 flex items-center justify-center ">
        <p className=" text-xs  lg:text-base xl:text-xl">
          {task.FromTime}-{task.ToTime}
        </p>
      </div>
      <div className="w-full h-3/4 flex  text-xs xl:text-base flex-col items-center justify-around  px-1 text-center">
        <p>{task.Name}</p>
        <p>{task.Description}</p>
      </div>
    </div>
  );
}

export default WeekTask;
