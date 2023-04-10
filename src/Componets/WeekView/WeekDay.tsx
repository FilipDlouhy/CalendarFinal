import React, { useEffect, useState } from "react";
interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  day: string;
  setShowAllTasksForADay: React.Dispatch<React.SetStateAction<boolean>>;
  setDayInWeek: React.Dispatch<React.SetStateAction<string>>;
  setDayToAddTask: React.Dispatch<React.SetStateAction<string>>;
  ShowAll:boolean
}
function WeekDay({
  setShowAllTasksForADay,
  setDayInWeek,
  setShowModal,
  setDayToAddTask,
  ShowAll,
  day,
}: Props) {
  const [Day, setDay] = useState<string>("");
  
  useEffect(() => {
    const date = new Date(day);
    setDay(date.toLocaleString("en-us", { weekday: "long" }));
  }, [day]);

  function getDate(): string {
    return new Date(day).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' }).replace(/\s/g, '')
  }


  function renderDay() {
    if (ShowAll === true) {
      return (
        <p
          onClick={() => {
            setDayInWeek(day);
            setShowAllTasksForADay(true);
          }}
          className="hover:text-green-300 duration-200 cursor-pointer"
        >
          {Day}
        </p>
      );
    } else {
      return (
        <p className=" duration-200">
          {Day}
        </p>
      );
    }
  }
  return (
    <div
      style={{ height: "14.28%" }}
      className="w-full mothDayBoxShadow flex-col  flex items-center justify-center font-bold text-white text-xs md:text-base xl:text-xl"
    >
      {renderDay()}
      <p
        onClick={() => {
          setShowModal(true);
          setDayToAddTask(day);
        }}
        className="mt-3 hover:text-red-400  duration-200 cursor-pointer"
      >
        Add task to {getDate()}
      </p>
    </div>
  );
}

export default WeekDay;
