import React from "react";
import { task } from "../../../interfaces";

interface props {
  task: task;
  setUpdatetTask: React.Dispatch<React.SetStateAction<task | undefined>>;
}

function DailyTask({ task, setUpdatetTask }: props) {
  if (task.Importance === "Low") {
    return (
      <div
        onClick={() => {
          setUpdatetTask(task);
        }}
        className="w-full h-32 bg-emerald-400  hover:bg-yellow-400 cursor-pointer duration-300 flex my-2"
      >
        <div className="h-full w-1/5 flex items-center justify-around flex-col">
          <p className="text-2xl font-bold text-white">From</p>
          <p className="text-2xl font-bold text-white">{task.FromTime}</p>
        </div>

        <div className="h-full w-3/5 flex items-center justify-around flex-col">
          <div className="w-full h-full flex flex-col items-center justify-around">
            <p className="text-2xl font-medium text-white">{task.Name}</p>
            <p className="text-lg font-medium text-white">{task.Description}</p>
          </div>
        </div>

        <div className="h-full w-1/5 flex items-center justify-around flex-col">
          <p className="text-2xl font-bold text-white">To</p>
          <p className="text-2xl font-bold text-white">{task.ToTime}</p>
        </div>
      </div>
    );
  } else if (task.Importance === "Medium") {
    return (
      <div
        onClick={() => {
          setUpdatetTask(task);
        }}
        className="w-full h-32 bg-blue-400  hover:bg-yellow-400 cursor-pointer duration-300 flex my-2"
      >
        <div className="h-full w-1/5 flex items-center justify-around flex-col">
          <p className="text-2xl font-bold text-white">From</p>
          <p className="text-2xl font-bold text-white">{task.FromTime}</p>
        </div>

        <div className="h-full w-3/5 flex items-center justify-around flex-col">
          <div className="w-full h-full flex flex-col items-center justify-around">
            <p className="text-2xl font-medium text-white">{task.Name}</p>
            <p className="text-lg font-medium text-white">{task.Description}</p>
          </div>
        </div>

        <div className="h-full w-1/5 flex items-center justify-around flex-col">
          <p className="text-2xl font-bold text-white">To</p>
          <p className="text-2xl font-bold text-white">{task.ToTime}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div
        onClick={() => {
          setUpdatetTask(task);
        }}
        className="w-full h-32 bg-red-600  hover:bg-yellow-400 cursor-pointer duration-300 flex my-2"
      >
        <div className="h-full w-1/5 flex items-center justify-around flex-col">
          <p className="text-2xl font-bold text-white">From</p>
          <p className="text-2xl font-bold text-white">{task.FromTime}</p>
        </div>

        <div className="h-full w-3/5 flex items-center justify-around flex-col">
          <div className="w-full h-full flex flex-col items-center justify-around">
            <p className="text-2xl font-medium text-white">{task.Name}</p>
            <p className="text-lg font-medium text-white">{task.Description}</p>
          </div>
        </div>

        <div className="h-full w-1/5 flex items-center justify-around flex-col">
          <p className="text-2xl font-bold text-white">To</p>
          <p className="text-2xl font-bold text-white">{task.ToTime}</p>
        </div>
      </div>
    );
  }
}

export default DailyTask;
