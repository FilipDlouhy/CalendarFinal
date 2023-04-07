
interface props {
  days: JSX.Element[];
}

function OneWeekInAMonth({ days }: props) {
  return <div className="w-full h-52 xl:h-1/6 flex">{days}</div>;
}

export default OneWeekInAMonth;
