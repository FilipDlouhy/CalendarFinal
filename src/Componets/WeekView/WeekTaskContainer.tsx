import React from "react";
import { task } from "../../../interfaces";
import WeekTask from "./WeekTask";
import AddTaskInAWeekModal from "./AddTaskInAWeekModal";
import UpdateWeekTaskModal from "./UpdateWeekTaskModal";
interface props {
  setShowTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
  ShowTaskModal: boolean;
  DayToAddTask: string;
  Tasks: task[];
  ShowUpdateTaskModal: boolean;
  setShowUpdateTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
  UpdateTask: task | undefined;
  setUpdateTask: React.Dispatch<React.SetStateAction<task | undefined>>;
}

function WeekTaskContainer({
  setUpdateTask,
  UpdateTask,
  Tasks,
  DayToAddTask,
  ShowTaskModal,
  setShowTaskModal,
  ShowUpdateTaskModal,
  setShowUpdateTaskModal,
}: props) {
  function renderTask(tasks: task[]) {
    const maxTasks = 6;
    const limitedTasks = tasks.slice(0, maxTasks);
    return limitedTasks.map((task) => (
      <WeekTask
        setShowUpdateTaskModal={setShowUpdateTaskModal}
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
        setShowUpdateTaskModal={setShowUpdateTaskModal}
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
      {ShowTaskModal && (
        <AddTaskInAWeekModal
          DayToAddTask={DayToAddTask}
          setShowTaskModal={setShowTaskModal}
        />
      )}

      {ShowUpdateTaskModal && (
        <UpdateWeekTaskModal
          UpdateTask={UpdateTask}
          setShowUpdateTaskModal={setShowUpdateTaskModal}
        />
      )}
    </div>
  );
}

export default WeekTaskContainer;
