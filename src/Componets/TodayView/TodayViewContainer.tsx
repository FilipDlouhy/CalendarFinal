import React from "react";
import { task } from "../../../interfaces";
import TodayTask from "./TodayTask";
interface props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  TodayTasks: task[];
  setUpdatetTask: React.Dispatch<React.SetStateAction<task | undefined>>;
}

function TodayViewContainer({
  setUpdatetTask,
  TodayTasks,
  setShowModal,
}: props) {
  return (
    <div style={{ height: "92%" }} className="w-full  mothDayBoxShadow">
      <div className="w-full h-20  flex justify-center items-center">
        <div
          onClick={() => {
            setShowModal(true);
          }}
          className="w-60 h-10 bg-blue-700 rounded hover:scale-105 duration-200 cursor-pointer flex items-center justify-center"
        >
          <p className="font-bold text-white  text-lg lg:text-xl">
            Add task for this day
          </p>
        </div>
      </div>

      {TodayTasks.map((task) => {
        return <TodayTask setUpdatetTask={setUpdatetTask} task={task} />;
      })}
    </div>
  );
}

export default TodayViewContainer;
