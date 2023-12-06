import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useAddTodoMutation,
  useCompleteTodoMutation,
  useDeleteTodoMutation,
  useGetTodoListQuery,
  useUpdateTodoMutation,
} from "../../redux/apis/todoApi";
import ListPlaceHolder from "../list-placeholder/ListPlaceHolder";
import { Pagination } from "./Pagination";
import { SearchBar } from "./SearchBar";
import { useGetLabelsQuery } from "../../redux/apis/labelApi";
import Swal from "sweetalert2";
import CreatePopup from "../create-todo/CreateTodo";
import { validateTodo } from "../../utils/validation.utils";
import { ToastContainer } from "react-toastify";
import AtomicSpinner from "atomic-spinner";

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

function TodoList() {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState(searchTemplate);
  const [editValue, setEditValue] = useState(todoTemplate);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [invalidCreate, setInvalidCreate] = useState("");
  const [invalidUpdate, setInvalidUpdate] = useState("");

  const {
    data: todoList,
    isLoading: isTodoLoading,
    error: todoError,
  } = useGetTodoListQuery("?" + new URLSearchParams(searchValue).toString());
  const { data: labelList, isLoading: isLabelLoading } = useGetLabelsQuery();

  const [deleteTodo, { isLoading: isDeleteLoading }] = useDeleteTodoMutation();
  const [updateTodo, { isLoading: isUpdateLoading }] = useUpdateTodoMutation();
  const [completeTodo, { isLoading: isCompleteLoading }] =
    useCompleteTodoMutation();
  const [addTodo, { isLoading: isAddLoading }] = useAddTodoMutation();

  const toggleCreate = () => {
    setShowModal(false);
    setInvalidCreate(false);
  };

  const toggleReset = () => {
    navigate("/");
  };

  const toggleEdit = () => {
    setShowEditModal(false);
    setInvalidUpdate(false);
  };

  const onEditPress = (id) => {
    let editVal = todoList.data.filter((item) => item.id === id)[0];
    setEditValue({ ...editVal, category: editVal.category._id });
    setShowEditModal(true);
  };

  const onCreate = (value) => {
    if (Object.keys(validateTodo(value)).length > 0) {
      setInvalidCreate(validateTodo(value));
    } else {
      addTodo(value)
        .then(() => {
          setInvalidCreate(false);
          setShowModal(false);
          setSearchValue(searchTemplate);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onUpdate = (value) => {
    if (Object.keys(validateTodo(value)).length > 0) {
      setInvalidUpdate(validateTodo(value));
    } else {
      let request = {
        id: value.id,
        title: value.title.trim(),
        progress: parseInt(value.progress),
        description: value.description.trim(),
        category: value.category._id ? value.category._id : value.category,
        completed: parseInt(value.progress) === 100,
      };

      updateTodo(request).then(() => {
        setInvalidUpdate(false);
        setShowEditModal(false);
        setSearchValue(searchTemplate);
        navigate("/");
      });
    }
  };

  const onComplete = async (id) => {
    await completeTodo(id);
  };

  const onReverse = (id) => {
    let request = {
      id,
      completed: false,
      progress: 0,
    };
    updateTodo(request).then(() => {
      navigate(
        "?" +
          new URLSearchParams(
            Object.keys(searchValue)
              .filter((key) => searchValue[key] !== "")
              .reduce((obj, key) => {
                obj[key] = searchValue[key];
                return obj;
              }, {})
          ).toString()
      );
    });
  };

  const onDelete = (id, title) => {
    Swal.fire({
      html: `<p>Do you want to delete this task: <b>${title}</b>?</p>`,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: `Cancel`,
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let response = await deleteTodo(id);
          if (response) {
            navigate(
              "?" +
                new URLSearchParams(
                  Object.keys(searchValue)
                    .filter((key) => searchValue[key] !== "")
                    .reduce((obj, key) => {
                      obj[key] = searchValue[key];
                      return obj;
                    }, {})
                ).toString()
            );
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const onPageChange = (key, value) => {
    let queryObj = { ...searchValue, [key]: value };
    setSearchValue(queryObj);

    navigate(
      "?" +
        new URLSearchParams(
          Object.keys(queryObj)
            .filter((key) => queryObj[key] !== "")
            .reduce((obj, key) => {
              obj[key] = queryObj[key];
              return obj;
            }, {})
        ).toString()
    );
  };

  const onTableChange = (key, value) => {
    let tempObj = Object.fromEntries(
      Object.entries(searchValue).filter(
        ([key]) => !["due", "task", "created"].includes(key)
      )
    );
    let queryObj = { ...tempObj, [key]: value };

    setSearchValue(queryObj);

    navigate(
      "?" +
        new URLSearchParams(
          Object.keys(queryObj)
            .filter((key) => queryObj[key] !== "")
            .reduce((obj, key) => {
              obj[key] = queryObj[key];
              return obj;
            }, {})
        ).toString()
    );
  };

  const onSearchChange = (event) => {
    let queryObj = {
      ...searchValue,
      [event.target.name]: event.target.value,
      page: 1,
    };
    setSearchValue(queryObj);
    navigate(
      "?" +
        new URLSearchParams(
          Object.keys(queryObj)
            .filter((key) => queryObj[key] !== "")
            .reduce((obj, key) => {
              obj[key] = queryObj[key];
              return obj;
            }, {})
        ).toString()
    );
  };

  const handleSearch = (event) => {
    event.preventDefault();
    let queryObj = { ...searchValue, limit: event.target.value, page: 1 };
    setSearchValue(queryObj);
    navigate(
      "?" +
        new URLSearchParams(
          Object.keys(queryObj)
            .filter((key) => queryObj[key] !== "")
            .reduce((obj, key) => {
              obj[key] = queryObj[key];
              return obj;
            }, {})
        ).toString()
    );
  };

  const onLimitChange = (event) => {
    let queryObj = { ...searchValue, limit: event.target.value, page: 1 };
    setSearchValue(queryObj);

    navigate(
      "?" +
        new URLSearchParams(
          Object.keys(queryObj)
            .filter((key) => queryObj[key] !== "")
            .reduce((obj, key) => {
              obj[key] = queryObj[key];
              return obj;
            }, {})
        ).toString()
    );
  };

  useEffect(() => {
    const searchQuery = location.search;

    if (searchQuery) {
      let queryString = searchQuery.slice(1, searchQuery.length);
      let queryObj = Object.fromEntries(new URLSearchParams(queryString));
      setSearchValue(queryObj);
    } else {
      setSearchValue(searchTemplate);
    }
  }, [location]);

  if (isTodoLoading) {
    return <div className="text-center font-bold">Loading...</div>;
  }

  if (todoError) {
    return <div>Error: {todoError.message}</div>;
  }

  return (
    <div className="App container mx-auto">
      <header className="App-header">
        <div className="list-container flex flex-col py-2 px-4">
          {isLabelLoading ? (
            <div className="text-center font-bold">Loading categories...</div>
          ) : (
            <SearchBar
              labels={labelList?.data}
              onChange={onSearchChange}
              handleSearch={handleSearch}
              searchValue={searchValue}
              handlePopCreate={() => setShowModal(true)}
              handleReset={toggleReset}
            />
          )}

          {isTodoLoading ||
          isAddLoading ||
          isUpdateLoading ||
          isCompleteLoading ||
          isDeleteLoading ? (
            <div className="opacity-25 fixed inset-0 z-40 bg-black">
              <div className="overlay">
                <AtomicSpinner
                  atomSize={400}
                  electronPathWidth={1.5}
                  electronPathColor={"#1f85ce"}
                  nucleusParticleFillColor={"#1b247b"}
                  nucleusParticleBorderColor={"#49d2cf"}
                />
              </div>
            </div>
          ) : null}

          <div className="main-container py-3">
            <CreatePopup
              modalName={"Create new task"}
              onCreateSave={onCreate}
              showModal={showModal}
              onShowModal={toggleCreate}
              isFormInvalid={invalidCreate}
              saveButtonName="Create"
            />

            <CreatePopup
              modalName={"Edit task"}
              onCreateSave={onUpdate}
              todo={editValue}
              showModal={showEditModal}
              onShowModal={toggleEdit}
              isFormInvalid={invalidUpdate}
              saveButtonName={"Save"}
            />

            <ListPlaceHolder
              data={todoList.data}
              onSort={onTableChange}
              onDelete={onDelete}
              onEdit={onEditPress}
              onReverse={onReverse}
              onComplete={onComplete}
            />

            {todoList.count > 5 ? (
              <Pagination
                totalPages={todoList.totalPages}
                currentPage={todoList.currentPage}
                totalCount={todoList.count}
                onPageChange={onPageChange}
                limit={searchValue.limit ? parseInt(searchValue.limit) : 5}
                handleChangeLimit={onLimitChange}
              />
            ) : (
              ""
            )}
          </div>

          <ToastContainer />
        </div>
      </header>
    </div>
  );
}

export default TodoList;
