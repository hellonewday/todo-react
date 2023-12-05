import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetTodoListQuery } from "../../redux/apis/todoApi";
import ListPlaceHolder from "../list-placeholder/ListPlaceHolder";
import { Pagination } from "./Pagination";
import { SearchBar } from "./SearchBar";
import { useGetLabelsQuery } from "../../redux/apis/labelApi";

const searchTemplate = {
  title: "",
  category: "",
  progress: "",
};

function TodoList() {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState(searchTemplate);

  const {
    data: todoList,
    isLoading: isTodoLoading,
    error: todoError,
  } = useGetTodoListQuery("?" + new URLSearchParams(searchValue).toString());

  const { data: labelList, isLoading: isLabelLoading } = useGetLabelsQuery();

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

  const historyUtil = useCallback(() => {
    const searchQuery = location.search;
    if (searchQuery) {
      let queryString = searchQuery.slice(1, searchQuery.length);
      let queryObj = Object.fromEntries(new URLSearchParams(queryString));
      setSearchValue(queryObj);
      return queryObj;
    } else {
      return null;
    }
  }, [location]);

  useEffect(() => {
    console.log(Object.fromEntries(new URLSearchParams(location.search)));
  }, [location]);

  if (isTodoLoading) {
    return <div className="text-center font-bold">Loading...</div>;
  }

  if (todoError) {
    return <div>Error: {todoError.message}</div>;
  }

  return (
    <div className="container mx-auto">
      {isLabelLoading ? (
        <div className="text-center font-bold">Loading categories...</div>
      ) : (
        <SearchBar
          labels={labelList?.data}
          onChange={onSearchChange}
          handleSearch={handleSearch}
          searchValue={searchValue}
          // handlePopCreate={() => setShowModal(true)}
          // handleReset={onReset}
        />
      )}

      <ListPlaceHolder data={todoList.data} />

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
  );
}

export default TodoList;
