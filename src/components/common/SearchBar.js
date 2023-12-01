import { FaPlus, FaSearch } from "react-icons/fa";
import Button from "./Button";

export function SearchBar(prop) {
  const {
    labels,
    onChange,
    searchValue,
    handleSearch,
    handlePopCreate,
    handleReset,
  } = prop;
  return (
    <>
      <div className="grid md:grid-cols-7 grid-cols-1 md:space-x-3 items-center">
        <div className="mb-3 mt-2 pt-0 col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Search name
          </label>
          <input
            type="text"
            placeholder="Search"
            name="title"
            value={searchValue.title || []}
            onChange={onChange}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
        <div className="mb-3 mt-2 pt-0 col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Category
          </label>
          <div className="relative">
            <select
              name="category"
              onChange={onChange}
              value={searchValue.category}
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
            >
              <option value="">-- Choose a option</option>
              {labels.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="mb-3 mt-2 pt-0 col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Status
          </label>
          <div className="relative">
            <select
              name="progress"
              onChange={onChange}
              value={searchValue.progress}
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
            >
              <option value="">-- Choose a option</option>
              <option value="0">Open</option>
              <option value="50">In progress</option>
              <option value="100">Completed</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="col-span-1 space-x-1 flex">
          <Button
            theme="primary"
            styles={"search-btn"}
            handleClick={handleSearch}
          >
            <FaSearch /> <span>Search</span>
          </Button>

          <Button
            theme="default"
            styles={"search-btn"}
            handleClick={handleReset}
          >
            <span>Reset</span>
          </Button>
        </div>
      </div>
      <div className="col-span-1">
        <Button theme="attention" handleClick={handlePopCreate}>
          <FaPlus /> <span>Create new</span>
        </Button>
      </div>
    </>
  );
}
