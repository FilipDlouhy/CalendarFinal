import React, { useEffect, useState } from "react";
interface props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  day: string;
  setShowAllTasksForADay: React.Dispatch<React.SetStateAction<boolean>>;
  setDayInWeek: React.Dispatch<React.SetStateAction<string>>;
  setDayToAddTask: React.Dispatch<React.SetStateAction<string>>
}
function WeekDay({
  setShowAllTasksForADay,
  setDayInWeek,
  setShowModal,
  setDayToAddTask,
  day,
}: props) {
  const [Day, setDay] = useState<string>("");
  const [Month, setMonth] = useState<string>("");
  useEffect(() => {
    const date = new Date(day);
    setDay(date.toLocaleString('en-us', { weekday: 'long' }));
  
    const month = date.toLocaleString('en-us', { month: 'numeric' });
    setMonth(month);
  }, [day]);
  return (
    <div
      style={{ height: "14.28%" }}
      className="w-full mothDayBoxShadow flex-col  flex items-center justify-center font-bold text-white text-xs md:text-base xl:text-xl"
    >
      <p
        onClick={() => {
          setDayInWeek(day);
          setShowAllTasksForADay(true);
        }}
        className="hover:text-green-300 duration-200 cursor-pointer"
      >
        {Day}
      </p>
      <p
        onClick={() => {
          setShowModal(true);
          setDayToAddTask(day)
        }}
        className="mt-3 hover:text-red-400  duration-200 cursor-pointer"
      >
        Add task to {parseInt(day.slice(8, 10))}.{Month}
      </p>
    </div>
  );
}

export default WeekDay;
