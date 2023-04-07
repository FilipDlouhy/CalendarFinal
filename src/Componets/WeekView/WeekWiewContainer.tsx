import React, { useEffect, useState } from "react";
import { task } from "../../../interfaces";
import WeekDay from "./WeekDay";
import WeekTaskContainer from "./WeekTaskContainer";
import {  getDatabase, onValue, ref } from "firebase/database";
import ShowAllTasksForADayModal from "./ShowAllTasksForADayModal";

interface props {
  DaysInAWeekTasks: DAYINAWEEEK[];
  SelectedCategory: number;
  setDaysInAWeekTasks: React.Dispatch<React.SetStateAction<DAYINAWEEEK[]>>;
  DaysInAWeek: string[];
}

interface DAYINAWEEEK {
  day: string;
  tasks: task[];
}

function WeekWiewContainer({
  DaysInAWeekTasks,
  SelectedCategory,
  DaysInAWeek,
  setDaysInAWeekTasks,
}: props) {
  const [DayInTheWeek, setDayInWeek] = useState<string>("");
  const [ShowTaskModal, setShowTaskModal] = useState<boolean>(false);
  const [ShowUpdateTaskModal, setShowUpdateTaskModal] =
    useState<boolean>(false);
  const [ShowAllTasksForADay, setShowAllTasksForADay] =
    useState<boolean>(false);
  const [UpdateTask, setUpdateTask] = useState<task>();
  useEffect(() => {
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
  }, [DaysInAWeek, ShowTaskModal, ShowUpdateTaskModal]);

  function renderWeekContainer() {
    const WeekTaskContainers: any[] = [];
    DaysInAWeekTasks.map((day) => {
      WeekTaskContainers.push(
        <WeekTaskContainer
          UpdateTask={UpdateTask}
          setUpdateTask={setUpdateTask}
          ShowUpdateTaskModal={ShowUpdateTaskModal}
          setShowUpdateTaskModal={setShowUpdateTaskModal}
          DayToAddTask={DayInTheWeek}
          Tasks={day.tasks}
          ShowTaskModal={ShowTaskModal}
          setShowTaskModal={setShowTaskModal}
        />
      );
    });

    return WeekTaskContainers.map((container) => {
      return container;
    });
  }

  return (
    <div style={{ height: "92%" }} className="w-full flex">
      <div className="h-full w-1/5 bg-blue-400">
        {DaysInAWeekTasks &&
          DaysInAWeekTasks.map((day) => {
            return (
              <WeekDay
                setShowAllTasksForADay={setShowAllTasksForADay}
                setDayInWeek={setDayInWeek}
                day={day.day}
                setShowTaskModal={setShowTaskModal}
              />
            );
          })}
      </div>

      <div className="h-full w-4/5">
        {renderWeekContainer()}

        {ShowAllTasksForADay && (
          <ShowAllTasksForADayModal
            DayInTheWeek={DayInTheWeek}
            setShowAllTasksForADay={setShowAllTasksForADay}
          />
        )}
      </div>
    </div>
  );
}

export default WeekWiewContainer;
