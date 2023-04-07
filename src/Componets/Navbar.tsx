import React, { useState, useEffect } from "react";

interface props {
  SelectedCategory: number;
  setSelectedCategory: React.Dispatch<React.SetStateAction<number>>;
  DailyDay: string | undefined;
  setDailyDay: React.Dispatch<React.SetStateAction<string | undefined>>;
  setDaysInAWeek: React.Dispatch<React.SetStateAction<string[]>>;
  DaysInAWeek: string[];
  setMonthForMonthView: React.Dispatch<React.SetStateAction<string>>;
  MonthView: string;
}

function Navbar({
  MonthView,
  setMonthForMonthView,
  DaysInAWeek,
  setDailyDay,
  DailyDay,
  SelectedCategory,
  setSelectedCategory,
  setDaysInAWeek,
}: props) {
  const [Mont, setMonth] = useState<string>("");
  const [MontFromTO, setMonthFromTO] = useState<string>("");
  useEffect(() => {
    if (SelectedCategory === 4) {
      const newDate = new Date();
      let Month: string = "";
      switch (newDate.toDateString().slice(4, 7)) {
        case "Jan":
          Month = "January";
          break;
        case "Feb":
          Month = "February";
          break;
        case "Mar":
          Month = "March";
          break;
        case "Apr":
          Month = "April";
          break;
        case "May":
          Month = "May";
          break;
        case "Jun":
          Month = "June";
          break;
        case "Jul":
          Month = "July";
          break;
        case "Aug":
          Month = "August";
          break;
        case "Sep":
          Month = "September";
          break;
        case "Oct":
          Month = "October";
          break;
        case "Nov":
          Month = "November";
          break;
        case "Dec":
          Month = "December";
          break;
      }
      setMonthForMonthView(Month);
    } else if (SelectedCategory === 3) {
      const today = new Date();
      let daysOfWeek: string[] = [];
      let dayString: string = today.toDateString()?.slice(0, 3);

      let firstNumber: number = 0;
      switch (dayString) {
        case "Mon":
          firstNumber = 0;
          break;
        case "Tue":
          firstNumber = -1;
          break;
        case "Wed":
          firstNumber = -2;
          break;
        case "Thu":
          firstNumber = -3;
          break;
        case "Fri":
          firstNumber = -4;
          break;
        case "Sat":
          firstNumber = -5;
          break;
        case "Sun":
          firstNumber = -6;
          break;
      }

      for (let index = 0; index < 7; index++) {
        const date = new Date(today);
        date.setDate(date.getDate() + index + firstNumber);
        date.toDateString();
        console.log(date.toDateString());
        daysOfWeek.push(date.toDateString());
      }
      setMonthFromTO(
        `${daysOfWeek[0].slice(8, 10)}${daysOfWeek[daysOfWeek.length - 1].slice(
          8,
          10
        )}`
      );
      setDaysInAWeek(daysOfWeek);
      getMonth(daysOfWeek[0].slice(4, 7));
    } else if (SelectedCategory === 2) {
      const newDate = new Date();
      newDate.toDateString();
      setDailyDay(newDate.toString().slice(0, 15));
    } else if (SelectedCategory === 1) {
      const newDate = new Date();
      newDate.toDateString();
      setDailyDay(newDate.toString().slice(0, 15));
    }
  }, [SelectedCategory]);

  function getNextWeek(lastDayofTheWeek: string) {
    let daysOfWeek: string[] = [];
    for (let index = 0; index < 7; index++) {
      const date = new Date(lastDayofTheWeek);
      date.setDate(date.getDate() + index + 1);
      date.toDateString();
      console.log(date.toDateString());
      daysOfWeek.push(date.toDateString());
    }
    setDaysInAWeek(daysOfWeek);
    setMonthFromTO(
      `${daysOfWeek[0].slice(8, 10)}${daysOfWeek[daysOfWeek.length - 1].slice(
        8,
        10
      )}`
    );
    getMonth(daysOfWeek[0].slice(4, 7));
  }
  function getPrevtWeek(FirstDayOfTheWeek: string) {
    let daysOfWeek: string[] = [];
    for (let index = 0; index < 7; index++) {
      const date = new Date(FirstDayOfTheWeek);
      date.setDate(date.getDate() - index - 1);
      date.toDateString();
      console.log(date.toDateString());
      daysOfWeek.unshift(date.toDateString());
    }
    setDaysInAWeek(daysOfWeek);
    setMonthFromTO(
      `${daysOfWeek[0].slice(8, 10)}${daysOfWeek[daysOfWeek.length - 1].slice(
        8,
        10
      )}`
    );
    getMonth(daysOfWeek[0].slice(4, 7));
  }

  function getMonth(month: string) {
    let monthString = "";
    switch (month) {
      case "Jan":
        monthString = ` December`;
        break;
      case "Feb":
        monthString = `  January`;
        break;
      case "Mar":
        monthString = ` February`;
        break;
      case "Apr":
        monthString = ` March`;
        break;
      case "May":
        monthString = `  April`;
        break;
      case "Jun":
        monthString = `  May`;
        break;
      case "Jul":
        monthString = `  June`;
        break;
      case "Aug":
        monthString = `  July`;
        break;
      case "Sep":
        monthString = `  August`;
        break;
      case "Oct":
        monthString = `  September`;
        break;
      case "Nov":
        monthString = ` October`;
        break;
      case "Dec":
        monthString = ` January`;
        break;
      default:
    }
    setMonth(monthString);
  }

  function getDataForTodayView() {
    const month = DailyDay?.slice(4, 7);
    let monthString: string = "";
    switch (month) {
      case "Jan":
        monthString = ` of Januar`;
        break;
      case "Feb":
        monthString = ` of February`;
        break;
      case "Mar":
        monthString = `of March`;
        break;
      case "Apr":
        monthString = `of April`;
        break;
      case "May":
        monthString = ` of May`;
        break;
      case "Jun":
        monthString = ` of June`;
        break;
      case "Jul":
        monthString = ` of July`;
        break;
      case "Aug":
        monthString = ` of August`;
        break;
      case "Sep":
        monthString = ` of September`;
        break;
      case "Oct":
        monthString = ` of October`;
        break;
      case "Nov":
        monthString = `of November`;
        break;
      case "Dec":
        monthString = `of December`;
        break;
      default:
    }
    if (DailyDay && parseInt(DailyDay?.slice(8, 11)) < 10) {
      return `${parseInt(DailyDay?.slice(8, 11)).toString()} of ${monthString}`;
    } else {
      return `${DailyDay?.slice(8, 11)} of ${monthString}`;
    }
  }

  function nextMonth(Month: string) {
    switch (Month.slice(0, 3)) {
      case "Jan":
        Month = "February";
        break;
      case "Feb":
        Month = "March";
        break;
      case "Mar":
        Month = "April";
        break;
      case "Apr":
        Month = "May";
        break;
      case "May":
        Month = "June";
        break;
      case "Jun":
        Month = "July";
        break;
      case "Jul":
        Month = "August";
        break;
      case "Aug":
        Month = "September";
        break;
      case "Sep":
        Month = "October";
        break;
      case "Oct":
        Month = "November";
        break;
      case "Nov":
        Month = "December";
        break;
      case "Dec":
        Month = "January";
        break;
    }
    setMonthForMonthView(Month);
  }
  function prevMonth(Month: string) {
    switch (Month.slice(0, 3)) {
      case "Jan":
        Month = "December";
        break;
      case "Feb":
        Month = "January";
        break;
      case "Mar":
        Month = "February";
        break;
      case "Apr":
        Month = "March";
        break;
      case "May":
        Month = "April";
        break;
      case "Jun":
        Month = "May";
        break;
      case "Jul":
        Month = "June";
        break;
      case "Aug":
        Month = "July";
        break;
      case "Sep":
        Month = "August";
        break;
      case "Oct":
        Month = "September";
        break;
      case "Nov":
        Month = "October";
        break;
      case "Dec":
        Month = "November";
        break;
    }
    setMonthForMonthView(Month);
  }

  function nextDay(today: string) {
    const date = new Date(today);
    const tomorrow = new Date(today);
    tomorrow.setDate(date.getDate() + 1);
    tomorrow.toDateString();
    setDailyDay(tomorrow.toString().slice(0, 15));
  }
  function PreviousDay(today: string) {
    const date = new Date(today);
    const tomorrow = new Date(today);
    tomorrow.setDate(date.getDate() - 1);
    tomorrow.toDateString();
    setDailyDay(tomorrow.toString().slice(0, 15));
  }
  function renderDate() {
    if (SelectedCategory === 4) {
      return (
        <div className="w-2/4 h-full md:flex-row flex items-center flex-col justify-around md:justify-center  ">
          <div className="h-full w-24 flex items-center justify-center">
            <p
              onClick={() => {
                prevMonth(MonthView);
              }}
              className="text-xs md:text-sm lg:text-lg text-blue-500 font-bold hover:text-green-500 duration-300 cursor-pointer"
            >
              Previous
            </p>
          </div>

          <div className="w-52 h-full flex-col flex items-center justify-center">
            <p className="font-bold text-xs md:text-base lg:text-xl ">
              {MonthView}
            </p>
          </div>
          <div className="h-full w-24 flex items-center justify-center">
            <p
              onClick={() => {
                nextMonth(MonthView);
              }}
              className="text-xs md:text-sm lg:text-lg text-blue-500 font-bold hover:text-green-500 duration-300 cursor-pointer"
            >
              Next
            </p>
          </div>
        </div>
      );
    } else if (SelectedCategory === 3) {
      return (
        <div className="w-2/4 h-full md:flex-row flex items-center flex-col justify-around md:justify-center">
          <div className="h-full w-32 flex items-center justify-center">
            <p
              onClick={() => {
                getPrevtWeek(DaysInAWeek[0]);
              }}
              className="text-xs md:text-lg text-blue-500 font-bold hover:text-green-500 duration-300 cursor-pointer"
            >
              Previous Week
            </p>
          </div>
          <div className="w-52 h-full flex-col flex items-center justify-center">
            <p className="font-bold text-xs md:text-base lg:text-xl ">{Mont}</p>
            <p className="font-bold text-xs md:text-sm lg:text-lg">
              From {parseInt(MontFromTO.slice(0, 2))} to{" "}
              {parseInt(MontFromTO.slice(2, 4))}
            </p>
          </div>

          <div className="h-full w-24 flex items-center justify-center">
            <p
              onClick={() => {
                getNextWeek(DaysInAWeek[DaysInAWeek.length - 1]);
              }}
              className="text-xs md:text-lg text-blue-500 font-bold hover:text-green-500 duration-300 cursor-pointer"
            >
              Next Week
            </p>
          </div>
        </div>
      );
    } else if (SelectedCategory === 2) {
      return (
        <div className="w-2/4 h-full md:flex-row flex items-center flex-col justify-around md:justify-center">
          <div className="h-full w-24 flex items-center justify-center">
            <p
              onClick={() => {
                if (DailyDay) {
                  PreviousDay(DailyDay);
                }
              }}
              className="text-xs md:text-lg text-blue-500 font-bold hover:text-green-500 duration-300 cursor-pointer"
            >
              Previous
            </p>
          </div>
          <div className="w-52 h-full flex-col flex items-center justify-center">
            <p className="font-bold  text-xs md:text-base lg:text-xl ">
              {" "}
              {getDataForTodayView()}{" "}
            </p>
          </div>{" "}
          <div className="h-full w-24 flex items-center justify-center">
            <p
              onClick={() => {
                if (DailyDay) {
                  nextDay(DailyDay);
                }
              }}
              className="text-xs md:text-lg text-blue-500 font-bold hover:text-green-500 duration-300 cursor-pointer"
            >
              Next
            </p>
          </div>
        </div>
      );
    } else if (SelectedCategory === 1) {
      return (
        <div className="w-2/4 h-full flex items-center justify-center">
          <div className="w-52 h-full flex-col flex items-center justify-center">
            <p className="font-bold text-xs md:text-base lg:text-xl ">
              Today is {getDataForTodayView()}
            </p>
          </div>
        </div>
      );
    }
  }
  return (
    <div style={{ height: "8%" }} className="w-full mothDayBoxShadow">
      <div className="w-full h-full flex">
        <div className="w-1/2 h-full  flex items-center justify-start">
          {renderDate()}
        </div>
        <div className="w-1/2 h-full  items-center justify-end">
          <div className="w-full flex h-full items-start justify-end pl-10">
            <div
              onClick={() => {
                setSelectedCategory(1);
              }}
              className={
                SelectedCategory === 1
                  ? "typeOfCalendarSelected  hover:bg-purple-600 cursor-pointer duration-300 text-white font-bold w-1/4 h-full flex items-center justify-center"
                  : "typeOfCalendarNotSelected hover:bg-purple-600 cursor-pointer duration-300 text-white font-bold  w-1/4 h-full flex items-center justify-center"
              }
            >
              Today
            </div>
            <div
              onClick={() => {
                setSelectedCategory(2);
              }}
              className={
                SelectedCategory === 2
                  ? "typeOfCalendarSelected  hover:bg-purple-600 cursor-pointer duration-300 text-white font-bold w-1/4 h-full flex items-center justify-center"
                  : "typeOfCalendarNotSelected hover:bg-purple-600 cursor-pointer duration-300 text-white font-bold  w-1/4 h-full flex items-center justify-center"
              }
            >
              Day
            </div>
            <div
              onClick={() => {
                setSelectedCategory(3);
              }}
              className={
                SelectedCategory === 3
                  ? "typeOfCalendarSelected  hover:bg-purple-600 cursor-pointer duration-300 text-white font-bold w-1/4 h-full flex items-center justify-center"
                  : "typeOfCalendarNotSelected hover:bg-purple-600 cursor-pointer duration-300 text-white font-bold  w-1/4 h-full flex items-center justify-center"
              }
            >
              Week
            </div>
            <div
              onClick={() => {
                setSelectedCategory(4);
              }}
              className={
                SelectedCategory === 4
                  ? "typeOfCalendarSelected  hover:bg-purple-600 cursor-pointer duration-300 text-white font-bold w-1/4 h-full flex items-center justify-center"
                  : "typeOfCalendarNotSelected hover:bg-purple-600 cursor-pointer duration-300 text-white font-bold  w-1/4 h-full flex items-center justify-center"
              }
            >
              Month
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
