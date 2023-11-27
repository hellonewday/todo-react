function ListPlaceHolder(prop) {
  const { data, onDelete, onComplete, onEdit, listType } = prop;
  return (
    <div className="space-y-4">
      <table className="w-full border-collapse w-100">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 tasks-col">Task</th>
            <th className="border px-4 py-2 progress-col">Progress</th>
            <th className="border px-4 py-2 w-20 actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((task) => (
            <tr key={task.id} className="border">
              <td className="border px-4 py-2 break-all">{task.title}</td>
              <td className="border px-4 py-2">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-amber-600 bg-amber-200">
                        Open
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-amber-600">
                        0%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-amber-200">
                    <div
                      style={{ width: "0%" }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-500"
                    ></div>
                  </div>
                </div>
              </td>
              <td className="border px-4 py-2">
                {listType === "uncompleted" ? (
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                      className="delete text-white bg-blue-500 rounded-md px-4 py-2"
                      onClick={() => onEdit(task.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="edit text-white bg-green-500 rounded-md mt-2 px-4 py-2"
                      onClick={() => onComplete(task.id, task.title)}
                    >
                      Complete
                    </button>
                    <button
                      className="complete text-white bg-red-500 rounded-md mt-2 px-4 py-2"
                      onClick={() => onDelete(task.id, task.title)}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <button
                    className="complete text-white bg-red-500 rounded-md mt-2 px-4 py-2"
                    onClick={() => onDelete(task.id, task.title)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListPlaceHolder;
