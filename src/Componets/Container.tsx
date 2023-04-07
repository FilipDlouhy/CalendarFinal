import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import MonthViewContainer from "./MonthView/MonthViewContainer";
import DayViewContainer from "./DayView/DayViewContainer";
import Modal from "./Modal";
import TodayViewContainer from "./TodayView/TodayViewContainer";
import { task } from "../../interfaces";
import { ref, get, getDatabase, onValue } from "firebase/database";
import { db } from "../firebaseConfig";
import UpdateTaskModal from "./UpdateTaskModal";
import WeekWiewContainer from "./WeekView/WeekWiewContainer";
interface DAYINAWEEEK {
  day: string;
  tasks: task[];
}

function Container() {
  const [SelectedCategory, setSelectedCategory] = useState<number>(1);
  const [ShowModal, setShowModal] = useState<boolean>(false);
  const [TodayTasks, setTodayTasks] = useState<task[]>([]);
  const [DailyTaks, setDailyTaks] = useState<task[]>([]);
  const [DaysInAWeek, setDaysInAWeek] = useState<string[]>([]);
  const [DaysInAWeekTasks, setDaysInAWeekTasks] = useState<DAYINAWEEEK[]>([]);

  const [DailyDay, setDailyDay] = useState<string>();
  const [UpdateTask, setUpdatetTask] = useState<task>();
  const [Today, setToday] = useState<string>("");
  const [Month, setMonth] = useState<string>("");

  const [TasksInAMonth, setTasksInAMonth] = useState<DAYINAWEEEK[]>([]);

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

  useEffect(() => {
    if (SelectedCategory === 4) {
      let number: number = 1;
      const newDate = new Date();

      switch (newDate.toDateString().slice(4, 7)) {
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
    } else if (SelectedCategory === 3) {
      const arr: DAYINAWEEEK[] = [];
      const promises: Promise<void>[] = []; // Keep track of promises returned by onValue calls

      DaysInAWeek.map((day) => {
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
        setDaysInAWeekTasks(arr);
      });
    } else if (SelectedCategory === 2) {
      if (DailyDay) {
        const newDate = new Date(DailyDay);
        newDate.toDateString();
        const tasks = ref(db, `Tasks/${newDate.toString().slice(0, 15)}`);
        get(tasks).then((snapshot) => {
          if (snapshot.exists()) {
            const stats = snapshot.val();
            const arr: task[] = [];
            Object.values(stats).map((task) => {
              // @ts-ignore
              arr.push({Day: task.Day,FromTime: task.FromTime,Importance: task.Importance,Name: task.Name,taskId: task.taskId,ToTime: task.ToTime,Description: task.Description,
              });
            });
            arr.sort((a, b) => {
              const aTime = new Date(`1970-01-01T${a.FromTime}`);
              const bTime = new Date(`1970-01-01T${b.FromTime}`);
              return aTime.getTime() - bTime.getTime();
            });
            setDailyTaks(arr);
          } else {
            setDailyTaks([]);
          }
        });
      }
    } else if (SelectedCategory === 1) {
      const newDate = new Date();
      newDate.toDateString();
      const tasks = ref(db, `Tasks/${newDate.toString().slice(0, 15)}`);
      get(tasks).then((snapshot) => {
        if (snapshot.exists()) {
          const stats = snapshot.val();
          const arr: task[] = [];
          Object.values(stats).map((task) => {
            // @ts-ignore
            arr.push({Day: task.Day,FromTime: task.FromTime,Importance: task.Importance,Name: task.Name,taskId: task.taskId,ToTime: task.ToTime,Description: task.Description,
            });
          });
          arr.sort((a, b) => {
            const aTime = new Date(`1970-01-01T${a.FromTime}`);
            const bTime = new Date(`1970-01-01T${b.FromTime}`);
            return aTime.getTime() - bTime.getTime();
          });
          setTodayTasks(arr);
        }
      });
    }
    const newDate = new Date();
    setToday(newDate.toDateString());
    if (DailyDay === undefined) {
      setDailyDay(newDate.toDateString());
    }
  }, [SelectedCategory, DailyDay]);
  function renderView() {
    if (SelectedCategory === 4) {
      return (
        <MonthViewContainer
          TasksInAMonth={TasksInAMonth}
          setTasksInAMonth={setTasksInAMonth}
          Month={Month}
        />
      );
    } else if (SelectedCategory === 3) {
      return (
        <WeekWiewContainer
          DaysInAWeek={DaysInAWeek}
          setDaysInAWeekTasks={setDaysInAWeekTasks}
          DaysInAWeekTasks={DaysInAWeekTasks}
          SelectedCategory={SelectedCategory}
        />
      );
    } else if (SelectedCategory === 2) {
      return (
        <DayViewContainer
          DailyTaks={DailyTaks}
          setUpdatetTask={setUpdatetTask}
          setShowModal={setShowModal}
        />
      );
    } else if (SelectedCategory === 1) {
      return (
        <TodayViewContainer
          setUpdatetTask={setUpdatetTask}
          TodayTasks={TodayTasks}
          setShowModal={setShowModal}
        />
      );
    }
  }
  return (
    <div className="w-screen h-screen overflow-x-hidden overflow-y-auto ">
      <Navbar
        MonthView={Month}
        setMonthForMonthView={setMonth}
        DaysInAWeek={DaysInAWeek}
        setDaysInAWeek={setDaysInAWeek}
        DailyDay={DailyDay}
        setDailyDay={setDailyDay}
        SelectedCategory={SelectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {renderView()}
      {UpdateTask && (
        <UpdateTaskModal
          DailyTaks={DailyTaks}
          setDailyTaks={setDailyTaks}
          DailyDay={DailyDay}
          UpdatedTask={UpdateTask}
          setUpdatetTask={setUpdatetTask}
          Today={Today}
          SelectedCategory={SelectedCategory}
          TodayTasks={TodayTasks}
          setTodayTasks={setTodayTasks}
        />
      )}
      {ShowModal && (
        <Modal
          DailyTaks={DailyTaks}
          setDailyTaks={setDailyTaks}
          setDailyDay={setDailyDay}
          DailyDay={DailyDay}
          Today={Today}
          SelectedCategory={SelectedCategory}
          TodayTasks={TodayTasks}
          setTodayTasks={setTodayTasks}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

export default Container;
