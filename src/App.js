import "./App.css";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

import {
  addTodo,
  completeTodo,
  editTodo,
  fetchTodos,
  queryTodos,
  removeTodo,
} from "./redux/thunk/todos";
import { resetStatus } from "./redux/reducers/todos";

import ListPlaceHolder from "./components/list-placeholder/ListPlaceHolder";
import CreatePopup from "./components/create-todo/CreateTodo";
import { SearchBar } from "./components/common/SearchBar";
import { validateTodo } from "./utils/validation.utils";

const todoTemplate = {
  title: "",
  completed: false,
  description: "",
  progress: 0,
  category: "",
};
const searchTemplate = {
  title: "",
  category: "",
  progress: "",
};
function App() {
  const dispatch = useDispatch();
  const { todos, apiStatus } = useSelector((state) => state.todos);
  const { labels } = useSelector((state) => state.labels);

  const [editValue, setEditValue] = useState(todoTemplate);
  const [value, setValue] = useState(todoTemplate);
  const [searchValue, setSearchValue] = useState(searchTemplate);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [invalidCreate, setInvalidCreate] = useState("");
  const [invalidUpdate, setInvalidUpdate] = useState("");

  const onCreateChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const onEdit = (id) => {
    let editVal = todos.filter((item) => item.id === id)[0];
    setEditValue(editVal);
    setShowEditModal(true);
  };

  const onEditChange = (event) => {
    setEditValue({ ...editValue, [event.target.name]: event.target.value });
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

  const onReverse = (id) => {
    let request = {
      id,
      completed: false,
      progress: 0,
    };
    dispatch(editTodo(request));
  };

  const onCreateSave = (event) => {
    event.preventDefault();
    if (Object.keys(validateTodo(value)).length > 0) {
      setInvalidCreate(validateTodo(value));
    } else {
      setInvalidCreate(false);
      dispatch(addTodo(value));
      setSearchValue(searchTemplate);
      dispatch(fetchTodos());
    }
  };

  const onEditSave = (event) => {
    event.preventDefault();

    if (Object.keys(validateTodo(editValue)).length > 0) {
      setInvalidUpdate(validateTodo(editValue));
    } else {
      let request = {
        id: editValue.id,
        title: editValue.title,
        progress: parseInt(editValue.progress),
        category: editValue.category._id
          ? editValue.category._id
          : editValue.category,
        completed: parseInt(editValue.progress) === 100,
      };

      setInvalidUpdate(false);
      dispatch(editTodo(request));
    }
  };

  const cancelModal = () => {
    setShowModal(false);
    setValue(todoTemplate);
  };

  const onSearchBarChange = (event) => {
    setSearchValue({ ...searchValue, [event.target.name]: event.target.value });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    let queryString = [];
    if (searchValue.category.length > 0)
      queryString.push(`category=${searchValue.category}`);
    if (searchValue.title.length > 0)
      queryString.push(`title=${searchValue.title}`);
    if (searchValue.progress.length > 0)
      queryString.push(`progress=${searchValue.progress}`);
    dispatch(queryTodos(queryString.join("&")));
  };

  const cancelEdit = () => {
    setShowEditModal(false);
    setEditValue(todoTemplate);
  };

  useEffect(() => {
    dispatch(fetchTodos());
    return () => {
      dispatch(resetStatus());
    };
  }, [dispatch]);

  useEffect(() => {
    if (apiStatus === "fulfilled") {
      setShowModal(false);
      setShowEditModal(false);
      setValue(todoTemplate);
    }
  }, [apiStatus, todos, dispatch]);

  return (
    <div>
      <div className="App container mx-auto">
        <header className="App-header">
          <div className="list-container flex flex-col py-2 px-4">
            <SearchBar
              labels={labels}
              onChange={onSearchBarChange}
              handleSearch={handleSearch}
              searchValue={searchValue}
              handlePopCreate={() => setShowModal(true)}
            />

            <div className="main-container py-3">
              <CreatePopup
                modalName={"Create new task"}
                onCreateSave={onCreateSave}
                titleValue={value}
                showModal={showModal}
                onChange={onCreateChange}
                onShowModal={cancelModal}
                isFormInvalid={invalidCreate}
                saveButtonName="Create"
              />

              <CreatePopup
                modalName={"Edit task"}
                onCreateSave={onEditSave}
                titleValue={editValue}
                showModal={showEditModal}
                onChange={onEditChange}
                onShowModal={cancelEdit}
                isFormInvalid={invalidUpdate}
                saveButtonName={"Save"}
              />

              <ListPlaceHolder
                data={todos}
                onDelete={onDelete}
                listType="uncompleted"
                onComplete={onCompleted}
                onEdit={onEdit}
                onReverse={onReverse}
              />
            </div>

            <ToastContainer />
          </div>
        </header>
      </div>
    </div>
  );
}

export default App;
