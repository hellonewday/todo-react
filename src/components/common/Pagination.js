import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const Pagination = (prop) => {
  const { totalCount, currentPage, totalPages, onPageChange } = prop;
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="flex justify-between mt-2">
      <div className="text-sm text-gray-500">
        {currentPage} to {totalPages} of {totalCount} tasks
      </div>
      <div className="py-2">
        <nav className="block">
          <ul className="flex pl-0 rounded list-none flex-wrap">
            <li
              style={{
                display:
                  currentPage === 1
                    ? "none"
                    : "block",
              }}
            >
              <button
                onClick={() => onPageChange(currentPage - 1)}
                className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative bg-white text-red-500"
              >
                <FaArrowLeft />
              </button>
            </li>
            {pageNumbers.map((item) => {
              return (
                <li key={item}>
                  <button
                    onClick={() => onPageChange(item)}
                    className={`${
                      currentPage === item
                        ? "bg-red-500 text-white"
                        : "text-red-500"
                    } first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-red-500  `}
                  >
                    {item}
                  </button>
                </li>
              );
            })}
            <li
              style={{
                display:
                  currentPage === Math.max(currentPage, totalPages)
                    ? "none"
                    : "block",
              }}
            >
              <button
                onClick={() => onPageChange(currentPage + 1)}
                className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative bg-white text-red-500"
              >
                <FaArrowRight />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
