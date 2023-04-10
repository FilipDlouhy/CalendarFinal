interface Props {
  days: JSX.Element[];
}

function OneWeekInMonth({ days }: Props) {

  return <div className="w-full h-52 xl:h-1/6 flex">{days}</div>;
}

export default OneWeekInMonth;
