import { useNavigate, useParams } from "react-router-dom";
import Button from "../common/Button";
import { FaArrowLeft } from "react-icons/fa";
import { useGetTodoByIdQuery } from "../../redux/apis/todoApi";
import { useEffect } from "react";

const TodoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetTodoByIdQuery(id);


  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  const onGoBack = () => navigate(-1);

  return (
    <div className="container mx-auto">
      <button
        onClick={onGoBack}
        className="flex space-x-2 items-center py-3 font-light"
      >
        <FaArrowLeft />
        <span>Go back</span>
      </button>
      <p className="font-bold text-2xl">{data.data.title}</p>
      <p>Created at: {data.data.created}</p>
      <p className="font-light text-sm">Last updated: {data.data.updated}</p>
      <p className="space-x-2">
        <span>Category:</span>
        <span style={{ color: data.data.category.color }}>
          {data.data.category.name}
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
          value={data.data.description}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
          placeholder="Write your thoughts here..."
        ></textarea>
      </div>

      <div className="comment-container">
        <p className="font-bold text-md mt-3">
          Comments ({data.data.comments.length})
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
              <Button theme="primary">Post</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoDetail;
