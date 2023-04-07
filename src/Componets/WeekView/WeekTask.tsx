import React from "react";
import { task } from "../../../interfaces";

interface props {
  task: task;
  setUpdateTask: React.Dispatch<React.SetStateAction<task | undefined>>;
  setShowUpdateTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
}
function WeekTask({ task, setUpdateTask, setShowUpdateTaskModal }: props) {
  if (task.Importance === "Low") {
    return (
      <div
        onClick={() => {
          setUpdateTask(task);
          setShowUpdateTaskModal(true);
        }}
        className=" w-1/4 md:w-1/6 h-full mothDayBoxShadow bg-emerald-400 hover:bg-yellow-400 cursor-pointer duration-300"
      >
        <div className="w-full  h-1/4 flex items-center justify-center ">
          <p className=" text-xs  lg:text-base xl:text-2xl">
            {task.FromTime}-{task.ToTime}
          </p>
        </div>
        <div className="w-full h-3/4 flex  text-xs xl:text-base flex-col items-center justify-around  px-1 text-center">
          <p>{task.Name}</p>
          <p>{task.Description}</p>
        </div>
      </div>
    );
  } else if (task.Importance === "Medium") {
    return (
      <div
        onClick={() => {
          setUpdateTask(task);
          setShowUpdateTaskModal(true);
        }}
        className=" w-1/4 md:w-1/6 h-full mothDayBoxShadow bg-blue-600 hover:bg-yellow-400 cursor-pointer duration-300"
      >
        <div className="w-full  h-1/4 flex items-center justify-center ">
          <p className="text-xs  lg:text-base xl:text-2xl">
            {task.FromTime}-{task.ToTime}
          </p>
        </div>
        <div className="w-full h-3/4 flex   text-xs xl:text-base flex-col items-center justify-around  px-1 text-center">
          <p>{task.Name}</p>
          <p>{task.Description}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div
        onClick={() => {
          setUpdateTask(task);
          setShowUpdateTaskModal(true);
        }}
        className=" w-1/4 md:w-1/6 h-full mothDayBoxShadow bg-red-400 hover:bg-yellow-400 cursor-pointer duration-300"
      >
        <div className="w-full  h-1/4 flex items-center justify-center ">
          <p className="text-xs  lg:text-base xl:text-2xl">
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
}

export default WeekTask;
