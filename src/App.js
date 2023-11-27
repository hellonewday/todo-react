import "./App.css";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

import NameInput from "./components/name-input/NameInput";
import ListPlaceHolder from "./components/list-placeholder/ListPlaceHolder";
import {
  addTodo,
  completeTodo,
  editTodo,
  fetchTodos,
  removeTodo,
} from "./redux/thunk/todos";
import {
  resetStatus,
  validateCreate,
  validateEdit,
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
    dispatch(validateEdit(false));
  };

  const onDelete = (id, title) => {
    Swal.fire({
      html: `<p>Do you want to delete this task: <b>${title}</b>?</p>`,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: `Cancel`,
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeTodo(id));
      }
    });
  };

  const onCompleted = (id) => {
    dispatch(completeTodo(id));
  };

  const onCreateSave = (event) => {
    event.preventDefault();
    if (value.length < 3) {
      dispatch(validateCreate(true));
    } else {
      dispatch(validateCreate(false));
      dispatch(addTodo({ title: value }));
    }
  };

  const onEditSave = (event) => {
    event.preventDefault();

    if (editValue.title.length < 3) {
      dispatch(validateEdit(true));
    } else {
      dispatch(validateEdit(false));
      dispatch(editTodo({ id: editValue.id, title: editValue.title }));
      setIsEdit(false);
    }
  };
  return (
    <div className="App">
      <h1 className="text-5xl font-bold mb-4 py-5 text-center">To do list</h1>
      <header className="App-header">
        <div className="create-container">
          <NameInput
            saveHandler={onCreateSave}
            buttonName="Add Task"
            value={value}
            onChange={onCreateChange}
            isFormInvalid={isInvalid}
          ></NameInput>
        </div>
        <div className="list-container flex flex-col py-2 px-4">
          <div className="uncompleted-container mr-52 py-3">
            <h1 className="text-red-400 font-bold	">1. Uncompleted tasks:</h1>

            {isEdit && (
              <div className="mb-2">
                <div className="edit-container space-x-2">
                  <NameInput
                    saveHandler={onEditSave}
                    buttonName="Save"
                    value={editValue.title}
                    onChange={onEditChange}
                    isFormInvalid={isEditInvalid}
                  >
                    <button
                      onClick={cancelEdit}
                      className="py-1 mt-2 px-4 bg-red-500 rounded-md text-white hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </NameInput>
                </div>
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
            <h1 className="text-green-500 font-bold	">2. Completed tasks:</h1>

            <ListPlaceHolder
              data={todos.filter((item) => item.completed === true)}
              onDelete={onDelete}
              listType="completed"
              onComplete={onCompleted}
              onEdit={onEdit}
            />
          </div>
          <ToastContainer />
        </div>
      </header>
    </div>
  );
}

export default App;
