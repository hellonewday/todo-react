import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTodoById } from "../../redux/thunk/todo";

const TodoDetail = () => {
  const { id } = useParams();
  const { todo, apiStatus } = useSelector((state) => state.todo);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodoById(id));
  }, [dispatch, id]);

  return (
    <div className="container mx-auto">
      {apiStatus === "pending" ? (
        "Loading..."
      ) : (
        <div>
          <p className="font-bold text-2xl">{todo.data.title}</p>
          <p>Created at: {todo.data.created}</p>
          <p className="font-light text-sm">
            Last updated: {todo.data.updated}
          </p>
          <p className="space-x-2">
            <span>Category:</span>
            <span style={{ color: todo.data.category.color }}>
              {todo.data.category.name}
            </span>
          </p>
          <div className="mt-4">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Task Description
            </label>
            <textarea
              id="message"
              rows="4"
              readOnly
              value={todo.data.description}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>

          <div className="comment-container">
            <p className="font-bold text-md mt-3">
              Comments ({todo.data.comments.length})
            </p>

            <form>
              <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="px-2 py-1 bg-white rounded-t-lg dark:bg-gray-800">
                  <label htmlFor="comment" className="sr-only">
                    Your comment
                  </label>
                  <textarea
                    id="comment"
                    rows="4"
                    className="w-full px-0 text-sm text-gray-900 bg-white border-0 "
                    placeholder="Write a comment..."
                    required
                  ></textarea>
                </div>
                <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Post comment
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoDetail;
