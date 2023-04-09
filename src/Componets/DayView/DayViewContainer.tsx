import React, { useEffect } from "react";
import { task } from "../../../interfaces";
import DailyTask from "./DailyTask";
interface props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdatetTask: React.Dispatch<React.SetStateAction<task | undefined>>;
  DailyTaks: task[];
  setShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>
}

function DayViewContainer({ setUpdatetTask,DailyTaks, setShowModal,setShowUpdateModal }: props) {
  useEffect(() => {
    console.log(DailyTaks);
  }, [DailyTaks]);
  return (
    <div style={{ height: "90%" }} className="w-full  mothDayBoxShadow">
      <div className="w-full h-20  flex justify-center items-center">
        <div
          onClick={() => {
            setShowModal(true);
          }}
          className="w-60 h-10 bg-blue-700 rounded hover:scale-105 duration-200 cursor-pointer flex items-center justify-center"
        >
          <p className="font-bold text-white text-xl">Add task for this day</p>
        </div>
      </div>

      {DailyTaks.map((task) => {
        return <DailyTask  setShowUpdateModal={setShowUpdateModal} setUpdatetTask={setUpdatetTask} task={task} />;
      })}
    </div>
  );
}

export default DayViewContainer;
