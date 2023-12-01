import { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  addTodo,
  completeTodo,
  editTodo,
  fetchTodo,
  queryTodo,
  removeTodo,
} from "../../redux/thunk/todo";
import { resetStatus } from "../../redux/reducers/todo";

import ListPlaceHolder from "../list-placeholder/ListPlaceHolder";
import CreatePopup from "../create-todo/CreateTodo";
import { SearchBar } from "../common/SearchBar";
import { validateTodo } from "../../utils/validation.utils";
import { Pagination } from "./Pagination";

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

function Home() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { todoList, apiStatus } = useSelector((state) => state.todo);
  const { labels } = useSelector((state) => state.labels);

  const [editValue, setEditValue] = useState(todoTemplate);
  const [searchValue, setSearchValue] = useState(searchTemplate);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [invalidCreate, setInvalidCreate] = useState("");
  const [invalidUpdate, setInvalidUpdate] = useState("");

  // Create action

  const onCreateSave = (value) => {
    if (Object.keys(validateTodo(value)).length > 0) {
      setInvalidCreate(validateTodo(value));
    } else {
      setInvalidCreate(false);
      dispatch(addTodo(value));
      setSearchValue(searchTemplate);
    }
  };

  // Edit action
  const onEdit = (id) => {
    let editVal = todoList.data.filter((item) => item.id === id)[0];
    setEditValue(editVal);
    setShowEditModal(true);
  };

  const onEditSave = (editValue) => {
    if (Object.keys(validateTodo(editValue)).length > 0) {
      setInvalidUpdate(validateTodo(editValue));
    } else {
      let request = {
        id: editValue.id,
        title: editValue.title.trim(),
        progress: parseInt(editValue.progress),
        description: editValue.description.trim(),
        category: editValue.category._id
          ? editValue.category._id
          : editValue.category,
        completed: parseInt(editValue.progress) === 100,
      };

      setInvalidUpdate(false);
      dispatch(editTodo(request));
      setSearchValue(searchTemplate);
    }
  };

  // Delete, completed, reverse action
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

  // Search action
  const onSearchChange = (event) => {
    setSearchValue({ ...searchValue, [event.target.name]: event.target.value });
  };
  const onSearch = (event) => {
    event.preventDefault();
    let queryString = [];
    Object.keys(searchValue).forEach((item) => {
      if (searchValue[item].length > 0 && item !== "page") {
        let str = `${item}=${searchValue[item]}`;
        queryString.push(str);
      }
    });
    queryString.push("page=1");
    navigate("?" + queryString.join("&"));
  };

  const onReset = (event) => {
    event.preventDefault();
    setSearchValue(searchTemplate);
    dispatch(fetchTodo());
    navigate("/");
  };

  // reset state on cancel action
  const cancelModal = () => {
    setShowModal(false);
    setInvalidCreate("");
  };
  const cancelEdit = () => {
    setShowEditModal(false);
    setInvalidUpdate("");
    setEditValue(todoTemplate);
  };

  const aggregateUtils = (criteria, value) => {
    let queryString = [];

    Object.keys(searchValue).forEach((item) => {
      if (searchValue[item].length > 0) {
        let str = `${item}=${searchValue[item]}`;
        queryString.push(str);
      }
    });

    if (Object.keys(searchValue).includes(criteria) === true) {
      queryString = queryString.filter((item) => !item.includes(criteria));
    }
    queryString.push(`${criteria}=${value}`);

    if (criteria === "due") {
      queryString = queryString.filter(
        (item) => !item.includes("task") && !item.includes("created")
      );
    }
    if (criteria === "task") {
      queryString = queryString.filter(
        (item) => !item.includes("due") && !item.includes("created")
      );
    }
    if (criteria === "created") {
      queryString = queryString.filter(
        (item) => !item.includes("due") && !item.includes("task")
      );
    }

    return "?" + queryString.join("&");
  };

  const onPageChange = (page) => {
    navigate(aggregateUtils("page", page));
  };

  const onSortChange = (criteria, sort) => {
    navigate(aggregateUtils(criteria, sort));
  };

  // Hooks
  const historyUtil = useCallback(() => {
    const searchQuery = location.search;
    if (searchQuery) {
      let queryString = searchQuery.slice(1, searchQuery.length);
      let queryObj = Object.fromEntries(new URLSearchParams(queryString));
      setSearchValue(queryObj);
      return queryString;
    } else {
      return null;
    }
  }, [location]);

  useEffect(() => {
    dispatch(historyUtil() === null ? fetchTodo() : queryTodo(historyUtil()));
    return () => {
      dispatch(resetStatus());
    };
  }, [historyUtil, dispatch]);
  useEffect(() => {
    if (apiStatus === "fulfilled") {
      setShowModal(false);
      setShowEditModal(false);
    }
  }, [apiStatus]);

  return (
    <div>
      <div className="App container mx-auto">
        <header className="App-header">
          <div className="list-container flex flex-col py-2 px-4">
            <SearchBar
              labels={labels}
              onChange={onSearchChange}
              handleSearch={onSearch}
              searchValue={searchValue}
              handlePopCreate={() => setShowModal(true)}
              handleReset={onReset}
            />

            <div className="main-container py-3">
              <CreatePopup
                modalName={"Create new task"}
                onCreateSave={onCreateSave}
                showModal={showModal}
                onShowModal={cancelModal}
                isFormInvalid={invalidCreate}
                saveButtonName="Create"
              />

              <CreatePopup
                modalName={"Edit task"}
                onCreateSave={onEditSave}
                todo={editValue}
                showModal={showEditModal}
                onShowModal={cancelEdit}
                isFormInvalid={invalidUpdate}
                saveButtonName={"Save"}
              />

              <ListPlaceHolder
                data={todoList.data}
                onDelete={onDelete}
                listType="uncompleted"
                onComplete={onCompleted}
                onSort={onSortChange}
                onEdit={onEdit}
                onReverse={onReverse}
              />

              {todoList.count > 5 ? (
                <Pagination
                  totalPages={todoList.totalPages}
                  currentPage={todoList.currentPage}
                  totalCount={todoList.count}
                  onPageChange={onPageChange}
                />
              ) : null}
            </div>

            <ToastContainer />
          </div>
        </header>
      </div>
    </div>
  );
}

export default Home;
