import React from "react";
import { task } from "../../../interfaces";
import WeekTask from "./WeekTask";
interface Props {
  Tasks: task[];
  setUpdateTask: React.Dispatch<React.SetStateAction<task | undefined>>;
  setShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDayToAddTask: React.Dispatch<React.SetStateAction<string>>;
}

function WeekTaskContainer({
  setUpdateTask,
  Tasks,
  setShowUpdateModal,
  setDayToAddTask,
}: Props) {
  function renderTask(tasks: task[]) {
    const maxTasks = 6;
    const limitedTasks = tasks.slice(0, maxTasks);
    return limitedTasks.map((task) => (
      <WeekTask
        setDayToAddTask={setDayToAddTask}
        setShowUpdateModal={setShowUpdateModal}
        setUpdateTask={setUpdateTask}
        task={task}
      />
    ));
  }

  function renderTaskSmall(tasks: task[]) {
    const maxTasks = 4;
    const limitedTasks = tasks.slice(0, maxTasks);
    return limitedTasks.map((task) => (
      <WeekTask
        setDayToAddTask={setDayToAddTask}
        setShowUpdateModal={setShowUpdateModal}
        setUpdateTask={setUpdateTask}
        task={task}
      />
    ));
  }

  return (
    <div
      style={{ height: "14.28%" }}
      className="w-full mothDayBoxShadow flex items-center justify-start font-bold text-white "
    >
      <div className=" hidden md:flex w-full h-full ">{renderTask(Tasks)}</div>
      <div className="flex  md:hidden w-full h-full ">
        {renderTaskSmall(Tasks)}
      </div>
    </div>
  );
}

export default WeekTaskContainer;
