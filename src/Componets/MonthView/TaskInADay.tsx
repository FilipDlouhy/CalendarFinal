import React from "react";
import { task } from "../../../interfaces";
interface props {
  task: task;
  setUpdatetTask: React.Dispatch<React.SetStateAction<task | undefined>>;
  setShowUpdateTaskModalMonth: React.Dispatch<React.SetStateAction<boolean>>;
}

function TaskInADay({
  task,
  setUpdatetTask,
  setShowUpdateTaskModalMonth,
}: props) {
  return (
    <div
      onClick={() => {
        setUpdatetTask(task);
        setShowUpdateTaskModalMonth(true);
      }}
      className="h-1/3 text-xs hover:bg-yellow-400 cursor-pointer duration-300 bg-emerald-400 text-white font-semibold w-full flex justify-end px-1 md:px-5"
    >
      <div className="w-3/5 h-full flex items-center text-xs justify-start">
        <p>{task.Name}</p>
      </div>
      <div className="w-2/5 h-full flex items-center justify-end">
        <p className="text-xs">
          {`${parseInt(task.FromTime.slice(0, 2))}${task.FromTime.slice(2, 5)}`}{" "}
          - {`${parseInt(task.ToTime.slice(0, 2))}${task.ToTime.slice(2, 5)}`}
        </p>
      </div>
    </div>
  );
}

export default TaskInADay;
