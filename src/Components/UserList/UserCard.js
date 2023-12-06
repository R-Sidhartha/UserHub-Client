import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ConfirmModal from "../ConfirmModal";
import CreateUser from "./CreateUser";

const UserCard = ({
  user,
  handleRemoveUser,
  handleAddUserToTeam,
  CreateTeamwithUser,
  handleDeleteUserwithId,
  totalPages,
  teams,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const location = useLocation();
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
  
    if (selectedValue === 'Create Team') {
      handleCreateTeam(user._id);
    } else {
      handleAddToTeam(selectedValue);
    }
  };
  
  const handleAddToTeam = (teamId) => {
    handleAddUserToTeam(user._id, teamId);
  };

  const handleCancelDelete = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const editUser = () => {
    setisEdit(true);
    setShowEditModal(true);
  };

  const handleCloseModal = (e) => {
    e.preventDefault();
    setShowEditModal(false);
  };

  const handleRemove = (userId) => {
    handleRemoveUser(userId);
  };

  const handleDeleteUser = (userId) => {
    handleDeleteUserwithId(userId);
  };

  const handleCreateTeam = (userId) => {
    CreateTeamwithUser(userId);
  };
  return (
    <>
      <div
        className={`bg-white rounded-lg p-4 shadow-md flex flex-col relative ${
          showEditModal ? " opacity-40 " : ""
        }`}
      >
        <div className="mt-3">
          <img
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            className="w-16 h-16 rounded-full mx-auto mb-4"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-center">
            {user.first_name} {user.last_name}
          </span>
          <span className="text-gray-800 text-sm text-center">
            <span className="opacity-70 text-xs">{user.email} </span>
          </span>
          <p className="text-gray-800 text-center">
            {" "}
            <span className="opacity-70 text-xs text-yellow-700">
              {user.gender}{" "}
            </span>
          </p>
          <p className="text-gray-800  my-2 text-sm md:text-base lg:text-base xl:text-base ">
            {" "}
            Domain: <span className="opacity-70">{user.domain} </span>
          </p>
          <p
            className={`mt-2 absolute top-0 text-sm opacity-80 ${
              user.available ? "text-green-500" : "text-red-500"
            }`}
          >
            {user.available ? "Available" : "Not Available"}
          </p>
        </div>
        {location.pathname === "/" ? (
          <>
            {user.available ? (
              <label className="my-4 flex flex-col text-center">
                Add To Team
                <select
                  className="p-1 rounded-md bg-gray-300"
                  name="team"
                  onChange={(e) => handleSelectChange(e)}
                >
                  <option value="">Select</option>
                  {teams.map((team) => {
                    const isUserInTeam = team.users.some(
                      (User) => User.domain === user.domain
                    );
                    if (!isUserInTeam) {
                      return (
                        <option key={team._id} value={team._id}>
                          {team.name}
                        </option>
                      );
                    }
                    return null;
                  })}
                  <option className="text-gray-600" value="Create Team">
                    Create New Team
                  </option>
                </select>
              </label>
            ) : (
              ""
            )}
            <div className="absolute top-0 right-2 flex flex-row-reverse">
              <button
                className=" p-1 rounded-xl hover:opacity-70 "
                onClick={handleDelete}
              >
                <i className="fa-solid fa-trash fa-sm opacity-60"></i>
              </button>
              <button
                className=" p-1 rounded-xl hover:opacity-70 "
                onClick={editUser}
              >
                <i className="fa-solid fa-pen-to-square fa-sm opacity-60"></i>
              </button>
            </div>
          </>
        ) : (
          <button
            className=" p-1 rounded-xl hover:opacity-70 absolute top-0 right-2"
            onClick={handleDelete}
            disabled={showModal}
          >
            <i className="fa-regular fa-circle-xmark fa-sm opacity-60"></i>
          </button>
        )}
      </div>
      {showEditModal && (
        <div className="absolute top-1/3 left-1/5 sm:left-1/3">
          <CreateUser
            handleCloseModal={handleCloseModal}
            userToEdit={user}
            isEdit={isEdit}
            totalPages={totalPages}
          />
        </div>
      )}
      {location.pathname === "/teams" && showModal ? (
        <ConfirmModal
          title="Remove User ?"
          message="Are you sure, you want to Remove this User from Team?"
          handleCancelDelete={handleCancelDelete}
          handleConfirmDelete={() => handleRemove(user._id)}
          handleDelete={handleDelete}
        />
      ) : (
        showModal && (
          <ConfirmModal
            title="Delete User ?"
            message="Are you sure, you want to Delete this User Permanently from UserList?"
            handleCancelDelete={handleCancelDelete}
            handleConfirmDelete={() => handleDeleteUser(user._id)}
            handleDelete={handleDelete}
          />
        )
      )}
      {showEditModal && (
        <div className="fixed z-10 top-0 left-0 w-full h-full opacity-60 bg-gray-300" />
      )}
    </>
  );
};

export default UserCard;
