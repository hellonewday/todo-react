function ListPlaceHolder(prop) {
  const { data, onDelete, onComplete, onEdit, listType } = prop;
  return (
    <div className="space-y-4">
      <table className="w-full border-collapse w-100">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 tasks-col">Task</th>
            <th className="border px-4 py-2 w-20 actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((task) => (
            <tr key={task.id} className="border">
              <td className="border px-4 py-2 break-all">{task.title}</td>
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
