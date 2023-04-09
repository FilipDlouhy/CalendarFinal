import { useEffect } from "react";

interface props {
  days: JSX.Element[];
}

function OneWeekInMonth({ days }: props) {

  return <div className="w-full h-52 xl:h-1/6 flex">{days}</div>;
}

export default OneWeekInMonth;
