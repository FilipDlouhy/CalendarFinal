import { task } from "../../../interfaces";
interface props {
  task: task;
}

function ShowAllTasksTask({ task }: props) {
  if (task.Importance === "Low") {
    return (
      <div className="w-5/6 flex justify-around items-center flex-col h-64 my-4 bg-emerald-400">
        <p className="text-2xl font-semibold text-white">
          {" "}
          From {task.FromTime} to {task.ToTime}
        </p>
        <p className="text-2xl font-semibold text-white"> {task.Name}</p>
        <p className="text-xl font-semibold text-white"> {task.Description}</p>
      </div>
    );
  } else if (task.Importance === "Medium") {
    return (
      <div className="w-5/6 flex justify-around items-center flex-col h-64 my-4 bg-blue-700">
        <p className="text-2xl font-semibold text-white">
          {" "}
          From {task.FromTime} to {task.ToTime}
        </p>
        <p className="text-2xl font-semibold text-white"> {task.Name}</p>
        <p className="text-xl font-semibold text-white"> {task.Description}</p>
      </div>
    );
  } else {
    return (
      <div className="w-5/6 flex justify-around items-center flex-col h-64 my-4 bg-red-400">
        <p className="text-2xl font-semibold text-white">
          {" "}
          From {task.FromTime} to {task.ToTime}
        </p>
        <p className="text-2xl font-semibold text-white"> {task.Name}</p>
        <p className="text-xl font-semibold text-white"> {task.Description}</p>
      </div>
    );
  }
}

export default ShowAllTasksTask;
