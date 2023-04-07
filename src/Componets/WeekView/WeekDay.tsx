import React, { useEffect, useState } from "react";
interface props {
  setShowTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
  day: string;
  setShowAllTasksForADay: React.Dispatch<React.SetStateAction<boolean>>;
  setDayInWeek: React.Dispatch<React.SetStateAction<string>>;
}
function WeekDay({
  setShowAllTasksForADay,
  setDayInWeek,
  day,
  setShowTaskModal,
}: props) {
  const [Day, setDay] = useState<string>("");
  const [Month, setMonth] = useState<string>("");
  useEffect(() => {
    switch (day.slice(0, 3)) {
      case "Mon":
        setDay("Monday");
        break;
      case "Tue":
        setDay("Tuesday");
        break;
      case "Wed":
        setDay("Wensday");
        break;
      case "Thu":
        setDay("Thursday");
        break;
      case "Fri":
        setDay("Friday");
        break;
      case "Sat":
        setDay("Saturday");
        break;
      case "Sun":
        setDay("Sunday");
        break;
    }
    switch (day.slice(4, 7)) {
      case "Jan":
        setMonth("1");
        break;
      case "Feb":
        setMonth("2");
        break;
      case "Mar":
        setMonth("3");
        break;
      case "Apr":
        setMonth("4");
        break;
      case "May":
        setMonth("5");
        break;
      case "Jun":
        setMonth("6");
        break;
      case "Jul":
        setMonth("7");
        break;
      case "Aug":
        setMonth("8");
        break;
      case "Sep":
        setMonth("9");
        break;
      case "Oct":
        setMonth("10");
        break;
      case "Nov":
        setMonth("11");
        break;
      case "Dec":
        setMonth("12");
        break;
    }
  }, [day]);
  return (
    <div
      style={{ height: "14.28%" }}
      className="w-full mothDayBoxShadow flex-col  flex items-center justify-center font-bold text-white text-xs md:text-base xl:text-2xl"
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
          setDayInWeek(day);
          setShowTaskModal(true);
        }}
        className="mt-3 hover:text-red-400  duration-200 cursor-pointer"
      >
        Add task to {parseInt(day.slice(8, 10))}.{Month}
      </p>
    </div>
  );
}

export default WeekDay;
