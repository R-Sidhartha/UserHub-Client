import React from 'react';

const SearchBar = ({setSearchQuery,setPage}) => {
  const handleSearch = (e) => {
    // dispatch(searchUsers(e.target.value));
    setSearchQuery(e.target.value);
    setPage(1)
  };

  return (
    <div className="mb-4 w-1/2 my-4">
      <input
        type="text"
        placeholder="Search by name..."
        className="border p-2 w-full"
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
