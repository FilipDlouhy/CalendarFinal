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

  const [ShowUpdateModal,setShowUpdateModal] = useState<boolean>(false)

  const [TodayTasks, setTodayTasks] = useState<task[]>([]);
  const [DailyTaks, setDailyTaks] = useState<task[]>([]);
  const [DaysInAWeek, setDaysInAWeek] = useState<string[]>([]);
  const [DaysInAWeekTasks, setDaysInAWeekTasks] = useState<DAYINAWEEEK[]>([]);

  const [DailyDay, setDailyDay] = useState<string>();
  const [UpdateTask, setUpdatetTask] = useState<task>();
  const [Today, setToday] = useState<string>("");
  const [Month, setMonth] = useState<string>("");

  const [DayToAddTask,setDayToAddTask] = useState<string>("")

  const [TasksInAMonth, setTasksInAMonth] = useState<DAYINAWEEEK[]>([]);
  
  function getDaysInMonth(dateString:string) {
    // Create a new Date object from the input string
    const date = new Date(dateString);
  
    // Get the year and month from the date
    const year = date.getFullYear();
    const month = date.getMonth();
  
    // Create a new Date object for the first day of the month
  
    // Get the number of days in the month by creating a new Date object for the last day of the month and extracting the day value
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const numDaysInMonth = lastDayOfMonth.getDate();
  
    // Create an array of all the days in the month
    const daysInMonth = [];
    for (let i = 1; i <= numDaysInMonth; i++) {
      const newDate = new Date(year, month, i);
      daysInMonth.push(newDate.toDateString());
    }
  
    // Return the array of days in the month
  return daysInMonth
  }
  const getFirstDayOfMonthString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = new Date(year, month, 1);
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });
    const monthName = date.toLocaleString('en-US', { month: 'short' });
    const dayOfMonth = date.toLocaleString('en-US', { day: '2-digit' });
    const yearString = date.getFullYear().toString();
    return `${dayOfWeek} ${monthName} ${dayOfMonth} ${yearString}`;
  };
  

  useEffect(() => {


    if (SelectedCategory === 4) {
      
      let days: string[] = [];
      if(Month.length === 0 )
      {
        const firstDayOfTheMOnth = getFirstDayOfMonthString()
        console.log(firstDayOfTheMOnth)
        days= getDaysInMonth(firstDayOfTheMOnth);
        setMonth(firstDayOfTheMOnth)

      }
      else
      {
        days= getDaysInMonth(Month);
      }

      console.log(days)
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
                Tasks.sort((a, b) => {
                  const aTime = new Date(`1970-01-01T${a.FromTime}`);
                  const bTime = new Date(`1970-01-01T${b.FromTime}`);
                  return aTime.getTime() - bTime.getTime();
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
      console.log(DaysInAWeek)
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
                Tasks.sort((a, b) => {
                  const aTime = new Date(`1970-01-01T${a.FromTime}`);
                  const bTime = new Date(`1970-01-01T${b.FromTime}`);
                  return aTime.getTime() - bTime.getTime();
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
  }, [SelectedCategory, DailyDay, ShowModal=== false, ShowUpdateModal  === false,DaysInAWeek,Month]);
  function renderView()  {
    if (SelectedCategory === 4) {
      return (
        <MonthViewContainer
        setDayToAddTask={setDayToAddTask}
          TasksInAMonth={TasksInAMonth}
          setShowModal={setShowModal}
          setShowUpdateModal={setShowUpdateModal}
          setUpdatetTask={setUpdatetTask}
        />
      );
    } else if (SelectedCategory === 3) {
      return (
        <WeekWiewContainer 
        setDayToAddTask={setDayToAddTask}
          setShowUpdateModal={setShowUpdateModal}
          setUpdatetTask={setUpdatetTask}
          DaysInAWeekTasks={DaysInAWeekTasks}
          setShowModal={setShowModal}
        />
      );
    } else if (SelectedCategory === 2) {
      return (
        <DayViewContainer
        setShowUpdateModal={setShowUpdateModal}
          DailyTaks={DailyTaks}
          setUpdatetTask={setUpdatetTask}
          setShowModal={setShowModal}
        />
      );
    } else if (SelectedCategory === 1) {
      return (
        <TodayViewContainer
        setShowUpdateModal={setShowUpdateModal}
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
        setDayToAddTask={setDayToAddTask}
        Month={Month}
        setMonth={setMonth}
        DaysInAWeek={DaysInAWeek}
        setDaysInAWeek={setDaysInAWeek}
        DailyDay={DailyDay}
        setDailyDay={setDailyDay}
        SelectedCategory={SelectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {renderView()}
      {ShowUpdateModal  && (
        <UpdateTaskModal
        DayToAddTask={DayToAddTask}
          UpdatedTask={UpdateTask}
          setUpdatetTask={setUpdatetTask}
          SelectedCategory={SelectedCategory}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}
      {ShowModal && (
        <Modal
        DayToAddTask={DayToAddTask}
          SelectedCategory={SelectedCategory}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

export default Container;
