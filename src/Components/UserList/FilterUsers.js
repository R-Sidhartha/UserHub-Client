import React from "react";

const FilterUsers = ({ filterCriteria, setFilterCriteria, setPage,setshowCreateUserModal}) => {
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterCriteria((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
    setPage(1)
  };
  const handleShowUserModal=()=>{
    setshowCreateUserModal(true);
  }

  return (
    <div className="filter-container flex flex-col-reverse text-xs mx-2  justify-center items-center md:flex-row lg:text-base">
      <div className="flex m-0 sm:flex-row">
      <label className="my-4 sm:mx-2 font-semibold">
        Domain:
        <select
        className="mr-1 sm:mx-2 rounded-md p-1 bg-gray-300"
          name="domain"
          value={filterCriteria.domain}
          onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="Sales">Sales</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="IT">IT</option>
          <option value="Management">Management</option>
          <option value="UI Designing">UI Designing</option>
          <option value="Business Development">Business Development</option>
        </select>
      </label>
      <label className="my-4 sm:mx-2 font-semibold ">
        Availability:
        <select
        className="mr-1 sm:mx-2 rounded-md p-1 bg-gray-300"
          name="available"
          value={filterCriteria.available}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
      </label>
      <label className="my-4 sm:mx-2 font-semibold">
        Gender:
        <select
        className="sm:mx-2 rounded-md p-1 bg-gray-300"
          name="gender"
          value={filterCriteria.gender}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Agender">Agender</option>
          <option value="Bigender">Bigender</option>
          <option value="Polygender">Polygender</option>
          <option value="Non-binary">Non-binary</option>
          <option value="Genderfluid">Genderfluid</option>
          <option value="Genderqueer">Genderqueer</option>
        </select>
      </label>
      </div>
      <div>
      <button className="font-semibold bg-gray-400 p-1 text-xs rounded-md sm:ml-10 underline lg:text-base" onClick={handleShowUserModal}> Create New User</button>
      </div>
    </div>
  );
};

export default FilterUsers;

