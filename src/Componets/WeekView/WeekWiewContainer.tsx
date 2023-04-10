import React, {  useState } from "react";
import { task } from "../../../interfaces";
import WeekDay from "./WeekDay";
import WeekTaskContainer from "./WeekTaskContainer";
import ShowAllTasksForDayModal from "./ShowAllTasksForDayModal";

interface Props {
  DaysInAWeekTasks: DAYINAWEEEK[];
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  setShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>
  setUpdatetTask: React.Dispatch<React.SetStateAction<task | undefined>>
  setDayToAddTask: React.Dispatch<React.SetStateAction<string>>

}

interface DAYINAWEEEK {
  day: string;
  tasks: task[];
}

function WeekWiewContainer({
  DaysInAWeekTasks,
  setShowUpdateModal,
  setUpdatetTask,
  setShowModal,
  setDayToAddTask

}: Props) {
  const [DayInTheWeek, setDayInWeek] = useState<string>("");

  const [ShowAllTasksForADay, setShowAllTasksForADay] =
    useState<boolean>(false);


  function renderWeekContainer() {
    const WeekTaskContainers: any[] = [];
    DaysInAWeekTasks.map((day) => {
      WeekTaskContainers.push(
        <WeekTaskContainer
          setDayToAddTask={setDayToAddTask}
          setUpdateTask={setUpdatetTask}
          Tasks={day.tasks}
          setShowUpdateModal={setShowUpdateModal}
        />
      );
    });

    return WeekTaskContainers.map((container) => {
      return container;
    });
  }

  return (
    <div style={{ height: "90%" }} className="w-full flex">
      <div className="h-full w-1/5 bg-blue-400">
        {DaysInAWeekTasks &&
          DaysInAWeekTasks.map((day) => {
            if(day.tasks.length > 4)
            {
              return (
                <WeekDay
                  ShowAll={true}
                  setDayToAddTask={setDayToAddTask}
                  setShowAllTasksForADay={setShowAllTasksForADay}
                  setDayInWeek={setDayInWeek}
                  day={day.day}
                  setShowModal={setShowModal}
                />
              );
            }
            else
            {
              return (
                <WeekDay
                  ShowAll={false}
                  setDayToAddTask={setDayToAddTask}
                  setShowAllTasksForADay={setShowAllTasksForADay}
                  setDayInWeek={setDayInWeek}
                  day={day.day}
                  setShowModal={setShowModal}
                />
              );
            }

          })}
      </div>

      <div className="h-full w-4/5">
        {renderWeekContainer()}

        {ShowAllTasksForADay && (
          <ShowAllTasksForDayModal
            DayInTheWeek={DayInTheWeek}
            setShowAllTasksForADay={setShowAllTasksForADay}
          />
        )}
      </div>
    </div>
  );
}

export default WeekWiewContainer;
