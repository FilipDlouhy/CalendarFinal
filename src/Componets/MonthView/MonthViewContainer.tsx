import React, { useState } from "react";
import { task } from "../../../interfaces";
import DayInMonth from "./DayInMonth";
import EmptyDayInMonth from "./EmptyDayInMonth";
import OneWeekInMonth from "./OneWeekInMonth";
import ShowAllTasksInDayMonth from "./ShowAllTasksInDayMonth";

interface DAYINAWEEEK {
  day: string;
  tasks: task[];
}

interface props {
  TasksInAMonth: DAYINAWEEEK[];
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDayToAddTask: React.Dispatch<React.SetStateAction<string>>;
  setUpdatetTask: React.Dispatch<React.SetStateAction<task | undefined>>;
}

function MonthViewContainer({
  setDayToAddTask,
  TasksInAMonth,
  setShowModal,
  setShowUpdateModal,
  setUpdatetTask,
}: props) {
  const [ShowAllTasksForADay, setShowAllTasksForADay] =
    useState<boolean>(false);
  const [DayToShow, setDayToShow] = useState<string>("");

  function renderWeek() {
    if (TasksInAMonth) {
      const Days: JSX.Element[] = [];
      const Weeks: JSX.Element[] = [];

      let firstDay = 0;
      console.log(TasksInAMonth[0]);
      if (TasksInAMonth[0]) {
        switch (TasksInAMonth[0].day.slice(0, 3)) {
          case "Mon":
            firstDay = 0;
            break;
          case "Tue":
            firstDay = 1;
            break;
          case "Wed":
            firstDay = 2;
            break;
          case "Thu":
            firstDay = 3;
            break;
          case "Fri":
            firstDay = 4;
            break;
          case "Sat":
            firstDay = 5;
            break;
          case "Sun":
            firstDay = 6;
            break;
        }
      }

      for (let index = 0; index < TasksInAMonth.length + firstDay; index++) {
        if (index < firstDay) {
          Days.push(<EmptyDayInMonth key={index} />);
        } else {
          Days.push(
            <DayInMonth
              setShowUpdateModal={setShowUpdateModal}
              setDayToAddTask={setDayToAddTask}
              setDayToShow={setDayToShow}
              setShowAllTasksForADay={setShowAllTasksForADay}
              setUpdatetTask={setUpdatetTask}
              Tasks={TasksInAMonth[index - firstDay].tasks}
              setShowModal={setShowModal}
              day={TasksInAMonth[index - firstDay].day}
              key={index}
            />
          );
        }
      }

      let dayIndex = 0;
      for (let index = 0; index < 5; index++) {
        const days: any[] = [];
        for (let index = 0; index < 7; index++) {
          days.push(Days[dayIndex]);
          dayIndex++;
        }
        Weeks.push(<OneWeekInMonth key={index} days={days} />);
      }

      return Weeks;
    }
  }

  return (
    <div
      style={{ height: "90%" }}
      className="w-full overflow-y-auto overflow-x-hidden "
    >
      <div className="w-full h-1/6 flex items-center justify-around text-xs md:text-base xl:text-xl  font-bold bg-blue-400 text-white">
        <div
          className="h-full flex items-center justify-center"
          style={{ width: "14.28%" }}
        >
          Monday
        </div>
        <div
          className="h-full flex items-center justify-center"
          style={{ width: "14.28%" }}
        >
          Tuesday
        </div>
        <div
          className="h-full flex items-center justify-center"
          style={{ width: "14.28%" }}
        >
          Wendsday
        </div>
        <div
          className="h-full flex items-center justify-center"
          style={{ width: "14.28%" }}
        >
          Thursday
        </div>
        <div
          className="h-full flex items-center justify-center"
          style={{ width: "14.28%" }}
        >
          Friday
        </div>
        <div
          className="h-full flex items-center justify-center"
          style={{ width: "14.28%" }}
        >
          Saturday
        </div>
        <div
          className="h-full flex items-center justify-center"
          style={{ width: "14.28%" }}
        >
          Sunday
        </div>
      </div>

      {TasksInAMonth && renderWeek()}

      {ShowAllTasksForADay && (
        <ShowAllTasksInDayMonth
          DayInTheWeek={DayToShow}
          setShowAllTasksForADay={setShowAllTasksForADay}
        />
      )}
    </div>
  );
}

export default MonthViewContainer;
