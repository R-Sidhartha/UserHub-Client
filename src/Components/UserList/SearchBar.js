import React from 'react';

const SearchBar = ({setSearchQuery,setPage}) => {
  const handleSearch = (e) => {
    // dispatch(searchUsers(e.target.value));
    setSearchQuery(e.target.value);
    setPage(1)
  };

  return (
    <div className="mb-4 w-3/4 lg:w-1/2 xl:w-1/2 md:w-3/4 my-4">
      <input
        type="text"
        placeholder="Search by name..."
        className="border p-2 w-full rounded-lg"
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
