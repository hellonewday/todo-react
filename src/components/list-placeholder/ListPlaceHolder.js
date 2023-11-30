import { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaCheck,
  FaSync,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { sortByProgressBar } from "../../redux/reducers/todos";
import { queryTodos } from "../../redux/thunk/todos";

function ListPlaceHolder(prop) {
  const { data, onDelete, onComplete, onEdit, onReverse, onSort } = prop;

  const dispatch = useDispatch();
  const location = useLocation();

  const [isShort, setIsShort] = useState(null);
  const progressText = (progress) => {
    if (progress > 0 && progress < 100) {
      return "In Progress";
    } else if (progress === 100) {
      return "Completed";
    } else {
      return "Open";
    }
  };

  const sortByProgress = (sort) => {
    if (sort === true) return <FaArrowDown />;
    else if (sort === false) return <FaArrowUp />;
    else return null;
  };

  const handleSort = () => {
    console.log(location.search);
    if (isShort == null) {
      setIsShort(true);
    } else {
      setIsShort(!isShort);
    }

    onSort(isShort ? 1 : -1);
  };

  return (
    <div className="space-y-4">
      <table className="w-full border-collapse w-100">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 tasks-col">Task</th>
            <th
              className="border px-4 py-2 progress-col space-x-2"
              onClick={() => handleSort()}
            >
              {sortByProgress(isShort)}
              <span>Progress</span>
            </th>
            <th className="border px-4 py-2 w-20 actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data
            ? data.map((task) => (
                <tr key={task.id} className="border">
                  <td className="border px-4 py-2 break-all">
                    <span>{task.title}</span>
                    <br />
                    {task.category ? (
                      <div
                        style={{ background: task.category.color }}
                        className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded last:mr-0 mr-1"
                      >
                        {task.category.name}
                      </div>
                    ) : null}
                  </td>
                  <td className="border px-4 py-2">
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span
                            className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${
                              task.progress > 0
                                ? "text-emerald-600 bg-emerald-200"
                                : "text-amber-600 bg-amber-200"
                            }`}
                          >
                            {progressText(task.progress)}
                          </span>
                        </div>
                        <div className="text-right">
                          <span
                            className={`text-xs font-semibold inline-block ${
                              task.progress > 0
                                ? " text-emerald-600"
                                : "text-amber-600"
                            }`}
                          >
                            {task.progress}%
                          </span>
                        </div>
                      </div>
                      <div
                        className={`overflow-hidden h-2 mb-4 text-xs flex rounded ${
                          task.progress > 0 ? "bg-emerald-200" : "bg-amber-200"
                        }`}
                      >
                        <div
                          style={{ width: `${task.progress}%` }}
                          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                            task.progress > 0
                              ? "bg-emerald-500"
                              : "bg-amber-500"
                          }`}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {!task.completed ? (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
                        <button
                          className="delete text-white bg-blue-400 rounded-md px-4 py-2 m-auto md:m-0"
                          onClick={() => onEdit(task.id)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="edit text-white bg-green-400 rounded-md mt-2 px-4 py-2 m-auto md:m-0"
                          onClick={() => onComplete(task.id, task.title)}
                        >
                          <FaCheck />
                        </button>
                        <button
                          className="complete text-white bg-red-400 rounded-md mt-2 px-4 py-2 m-auto md:m-0"
                          onClick={() => onDelete(task.id, task.title)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
                        <button
                          className="complete text-white bg-red-400 rounded-md mt-2 px-4 py-2 m-auto md:m-0"
                          onClick={() => onDelete(task.id, task.title)}
                        >
                          <FaTrash />
                        </button>

                        <button
                          className="complete text-black bg-gray-100 rounded-md mt-2 px-4 py-2 m-auto md:m-0"
                          onClick={() => onReverse(task.id)}
                        >
                          <FaSync />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}

export default ListPlaceHolder;
