import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useGetTodoByIdQuery } from "../../redux/apis/todoApi";

const TodoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetTodoByIdQuery(id);

  if (isLoading) {
    return <h1 className="container mx-auto text-center">Loading...</h1>;
  }
  if (error) {
    return <h1>Error: {error.data.error.message}</h1>;
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
    </div>
  );
};

export default TodoDetail;
