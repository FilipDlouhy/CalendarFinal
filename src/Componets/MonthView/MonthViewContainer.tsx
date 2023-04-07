import React, { useEffect, useState } from "react";
import { task } from "../../../interfaces";
import { getDatabase, onValue, ref } from "firebase/database";
import DayInAMonht from "./DayInAMonht";
import EmptyDayInAMonth from "./EmptyDayInAMonth";
import OneWeekInAMonth from "./OneWeekInAMonth";
import AddTaskInAMonth from "./AddTaskInAMonth";
import UpdateTaskInAMonth from "./UpdateTaskInAMonth";
import ShowAllTasksInADayMonth from "./ShowAllTasksInADayMonth";

interface DAYINAWEEEK {
  day: string;
  tasks: task[];
}

interface props {
  Month: string;
  setTasksInAMonth: React.Dispatch<React.SetStateAction<DAYINAWEEEK[]>>;
  TasksInAMonth: DAYINAWEEEK[];
}
function MonthViewContainer({ Month, TasksInAMonth, setTasksInAMonth }: props) {
  const [ShowTaskModal, setShowTaskModal] = useState<boolean>(false);
  const [DayToAddTask, setDayToAddTask] = useState<string>("");
  const [UpdateTask, setUpdatetTask] = useState<task>();
  const [ShowAllTasksForADay, setShowAllTasksForADay] =
    useState<boolean>(false);
  const [DayToShow, setDayToShow] = useState<string>("");

  const [ShowUpdateTaskModalMonnth, setShowUpdateTaskModalMonth] =
    useState<boolean>(false);
  function getLastDayOfMonth(month: number, year: number) {
    return new Date(year, month + 1, 0);
  }

  function logAllDaysInMonth(month: number, year: number) {
    const daysInAMonth: string[] = [];
    const lastDayOfMonth = getLastDayOfMonth(month, year);
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(year, month, i);
      daysInAMonth.push(date.toDateString());
    }
    return daysInAMonth;
  }

  // Example usage: log all days in April 2023

  useEffect(() => {
    let number: number = 1;

    switch (Month.slice(0, 3)) {
      case "Jan":
        number = 1;
        break;
      case "Feb":
        number = 2;
        break;
      case "Mar":
        number = 3;
        break;
      case "Apr":
        number = 4;
        break;
      case "May":
        number = 5;
        break;
      case "Jun":
        number = 6;
        break;
      case "Jul":
        number = 7;
        break;
      case "Aug":
        number = 8;
        break;
      case "Sep":
        number = 9;
        break;
      case "Oct":
        number = 10;
        break;
      case "Nov":
        number = 11;
        break;
      case "Dec":
        number = 12;
        break;
    }
    const days: string[] = logAllDaysInMonth(number - 1, 2023);

    const arr: DAYINAWEEEK[] = [];
    const promises: Promise<void>[] = []; // Keep track of promises returned by onValue calls

    days.map((day) => {
      const Tasks: task[] = [];
      const newDate = new Date(day);
      newDate.toDateString();
      const db = getDatabase();
      const tasksRef = ref(db, `Tasks/${newDate.toString().slice(0, 15)}`);

      // Push the promise returned by onValue into the promises array
      promises.push(
        new Promise<void>((resolve) => {
          onValue(tasksRef, (snapshot) => {
            if (snapshot.exists()) {
              const tasks = snapshot.val();
              Object.values(tasks).map((task) => {
                // @ts-ignore
                Tasks.push({Day: task.Day,FromTime: task.FromTime,Importance: task.Importance,Name: task.Name,taskId: task.taskId,ToTime: task.ToTime,Description: task.Description,
                });
              });
              arr.push({ day: day, tasks: Tasks });
            } else {
              arr.push({ day: day, tasks: [] });
            }
            resolve(); // Resolve the promise when onValue completes
          });
        })
      );
    });

    // Wait for all promises to resolve before logging the arr array
    Promise.all(promises).then(() => {
      console.log(arr);
      setTasksInAMonth(arr);
    });
  }, [Month, ShowTaskModal, ShowUpdateTaskModalMonnth]);

  function renderWeek() {
    if (TasksInAMonth) {
      const Days: JSX.Element[] = [];
      const Weeks: JSX.Element[] = [];

      let firstDay = 0;
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
      TasksInAMonth.forEach((day, index) => {
        if (index < firstDay) {
          Days.push(<EmptyDayInAMonth key={index} />);
        } else {
          Days.push(
            <DayInAMonht
              setDayToShow={setDayToShow}
              setShowAllTasksForADay={setShowAllTasksForADay}
              setShowUpdateTaskModalMonth={setShowUpdateTaskModalMonth}
              setUpdatetTask={setUpdatetTask}
              setDayToAddTask={setDayToAddTask}
              Tasks={day.tasks}
              day={day.day}
              key={index}
              setShowTaskModal={setShowTaskModal}
            />
          );
        }
      });
      let dayIndex = 0;
      for (let index = 0; index < 5; index++) {
        const days: any[] = [];
        for (let index = 0; index < 7; index++) {
          days.push(Days[dayIndex]);
          dayIndex++;
        }
        Weeks.push(<OneWeekInAMonth days={days} />);
      }

      return Weeks;
    }
  }

  return (
    <div
      style={{ height: "92%" }}
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

      {ShowTaskModal && (
        <AddTaskInAMonth
          DayToAddTask={DayToAddTask}
          setShowTaskModal={setShowTaskModal}
        />
      )}
      {ShowUpdateTaskModalMonnth && (
        <UpdateTaskInAMonth
          UpdateTask={UpdateTask}
          setShowUpdateTaskModalMonth={setShowUpdateTaskModalMonth}
        />
      )}
      {ShowAllTasksForADay && (
        <ShowAllTasksInADayMonth
          DayInTheWeek={DayToShow}
          setShowAllTasksForADay={setShowAllTasksForADay}
        />
      )}
    </div>
  );
}

export default MonthViewContainer;
