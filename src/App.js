import "./App.css";
import { useEffect, useState } from "react";
import NameInput from "./components/name-input/NameInput";
import ListPlaceHolder from "./components/list-placeholder/ListPlaceHolder";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  completeTodo,
  editTodo,
  removeTodo,
} from "./redux/reducers/todos";

function App() {
  const dispatch = useDispatch();
  const { todos, isInvalid, isEditInvalid } = useSelector(
    (state) => state.todos
  );

  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState({});

  const [value, setValue] = useState("");

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(todos));
  }, [todos]);

  const onDelete = (id) => {
    dispatch(removeTodo(id));
  };

  const onCompleted = (id) => {
    dispatch(completeTodo(id));
  };

  const onCreateSave = (event) => {
    event.preventDefault();
    dispatch(addTodo({ id: todos.length + 1, title: value, completed: false }));
  };

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

  const onEditSave = (event) => {
    event.preventDefault();
    dispatch(editTodo(editValue));
    setIsEdit(false);
  };

  return (
    <div className="App">
      <h1 className="text-5xl font-bold mb-4 py-5 text-center">To do list</h1>
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

            <div className="edit-container">
              {isEdit && (
                <NameInput
                  saveHandler={onEditSave}
                  buttonName="Save"
                  value={editValue.title}
                  onChange={onEditChange}
                  invalid={isEditInvalid}
                />
              )}
            </div>

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
