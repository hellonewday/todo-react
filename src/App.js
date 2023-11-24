import "./App.css";
import { useEffect, useState } from "react";
import NameInput from "./components/name-input/NameInput";
import ListPlaceHolder from "./components/list-placeholder/ListPlaceHolder";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  completeTodo,
  editTodo,
  fetchTodos,
  removeTodo,
} from "./redux/thunk/todos";
import {resetStatus} from "./redux/reducers/todos";

function generateApiMessage(message) {
  if (message === "pending") {
    return (
      <p className="text-xl font-bold mb-4 py-5 text-blue-600 text-center">
        Loading...
      </p>
    );
  }
  if (message === "fulfilled") {
    return (
      <p className="text-xl font-bold mb-4 py-5 text-green-600 text-center">
        Successful!
      </p>
    );
  }
  if (message === "error") {
    return (
      <p className="text-xl font-bold mb-4 py-5 text-green-600 text-center">
        Error!
      </p>
    );
  } else {
    return <></>;
  }
}

function App() {
  const dispatch = useDispatch();
  const { todos, isInvalid, isEditInvalid, apiStatus } = useSelector(
    (state) => state.todos
  );

  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState({});

  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());

    return () => {
      dispatch(resetStatus());
    };
  }, [dispatch]);

  const onCreateChange = (event) => {
    setValue(event.target.value);
  };

  const onEdit = (id) => {
    setIsEdit(true);
    let editVal = todos.filter((item) => item.id === id)[0];
    setEditValue(editVal);
  };

  const onEditChange = (event) => {
    setEditValue({ ...editValue, title: event.target.value });
  };

  const cancelEdit = () => {
    setIsEdit(false);
  };

  const onDelete = (id) => {
    dispatch(removeTodo(id));
  };

  const onCompleted = (id) => {
    console.log(id);
    dispatch(completeTodo(id));
  };

  const onCreateSave = (event) => {
    event.preventDefault();
    dispatch(addTodo({ title: value }));
  };

  const onEditSave = (event) => {
    event.preventDefault();
    dispatch(editTodo({ id: editValue.id, title: editValue.title }));
    setIsEdit(false);
  };

  return (
    <div className="App">
      <h1 className="text-5xl font-bold mb-4 py-5 text-center">To do list</h1>
      {generateApiMessage(apiStatus)}
      <header className="App-header">
        <div className="create-container flex flex-row justify-center">
          <NameInput
            saveHandler={onCreateSave}
            buttonName="Add Task"
            value={value}
            onChange={onCreateChange}
            invalid={isInvalid}
          />
        </div>
        <div className="list-container flex flex-col py-2 px-4">
          <div className="uncompleted-container mr-52 py-3">
            <h1 style={{ color: "red" }}>1. Uncompleted tasks:</h1>

            {(isEdit || isEditInvalid) && (
              <div className="edit-container">
                <NameInput
                  saveHandler={onEditSave}
                  buttonName="Save"
                  value={editValue.title}
                  onChange={onEditChange}
                  invalid={isEditInvalid}
                />
                <button
                  onClick={cancelEdit}
                  className="mt-6 mb-2 px-4 text-red-500"
                >
                  Cancel
                </button>
              </div>
            )}

            <ListPlaceHolder
              data={todos.filter((item) => item.completed === false)}
              onDelete={onDelete}
              listType="uncompleted"
              onComplete={onCompleted}
              onEdit={onEdit}
            />
          </div>

          <div className="completed-container mr-52 py-3">
            <h1 style={{ color: "green" }}>2. Completed tasks:</h1>

            <ListPlaceHolder
              data={todos.filter((item) => item.completed === true)}
              onDelete={onDelete}
              listType="completed"
              onComplete={onCompleted}
              onEdit={onEdit}
            />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
