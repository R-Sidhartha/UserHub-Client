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
    <div className="filter-container flex flex-col  mx-4 items-center justify-center md:flex-row lg:flex-row xl:flex-row ">
      <label className="my-4 mx-2 font-semibold">
        Domain:
        <select
        className="mx-2 rounded-md p-1"
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
      <label className="my-4 mx-2 font-semibold">
        Gender:
        <select
        className="mx-2 rounded-md p-1"
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
      <label className="my-4 mx-2 font-semibold">
        Availability:
        <select
        className="mx-2 rounded-md p-1"
          name="available"
          value={filterCriteria.available}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
      </label>
      <div>
      <button className="font-semibold bg-gray-400 p-1 text-sm rounded-md ml-10 underline" onClick={handleShowUserModal}> Create New User</button>
      </div>
    </div>
  );
};

export default FilterUsers;

