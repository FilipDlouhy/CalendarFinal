import { task } from "../../../interfaces";
interface Props {
  task: task;
}

function ShowAllTasksTask({ task }: Props) {
  return (
    <div
      className={`importance-${task.Importance} w-5/6 flex justify-around items-center flex-col h-64 my-4 bg-emerald-400`}
    >
      <p className="text-2xl font-semibold text-white">
        {" "}
        From {task.FromTime} to {task.ToTime}
      </p>
      <p className="text-2xl font-semibold text-white"> {task.Name}</p>
      <p className="text-xl font-semibold text-white"> {task.Description}</p>
    </div>
  );
}

export default ShowAllTasksTask;
