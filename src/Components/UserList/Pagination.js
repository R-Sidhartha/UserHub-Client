import React from "react";

const Pagination2 = ({ pageInfo, setPage }) => {
  const handlePageChange = (newPage) => {
    console.log(newPage)
    setPage(newPage);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // You can use 'auto' instead of 'smooth' for instant scrolling
    });
  };
  return (
    pageInfo && (
      <div className="flex justify-center mt-4 my-3">
        <button
          onClick={() => handlePageChange(pageInfo.currentPage - 1)}
          disabled={pageInfo.currentPage === 1}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
        >
          Prev
        </button>
        <span className="bg-gray-300 text-gray-800 py-2 px-4">{`Page ${pageInfo.currentPage} of ${pageInfo.totalPages}`} <span><button
          onClick={() => handlePageChange(pageInfo.totalPages)}
          disabled={pageInfo.currentPage === pageInfo.totalPages}
          className="bg-gray-300 hover:opacity-60 text-gray-800 font-semibold"
        >
          ...Last
        </button></span> </span>
        <button
          onClick={() => handlePageChange(pageInfo.currentPage + 1)}
          disabled={pageInfo.currentPage === pageInfo.totalPages}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
        >
          Next
        </button>
        
      </div>
    )
  );
};

export default Pagination2;
