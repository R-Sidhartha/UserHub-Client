import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeams } from "../../Redux/Actions/TeamActions";
import { useLocation } from "react-router-dom";
import ConfirmModal from "../ConfirmModal";

const UserCard = ({
  user,
  handleRemoveUser,
  handleAddUserToTeam,
  CreateTeamwithUser,
}) => {
  const teams = useSelector((state) => state.teams.teams);
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTeams());
  }, [dispatch]);
  const handleRemove = (userId) => {
    handleRemoveUser(userId);
  };
  const handleCreateTeam = () => {
    CreateTeamwithUser(user._id);
  };
  return (
    <>
      <div className="bg-white rounded-lg p-4 shadow-md flex flex-col relative">
        <div>
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
          <span className="text-gray-800 text-sm ">
            Email: <span className="opacity-70">{user.email} </span>
          </span>
          <p className="text-gray-800  my-2 ">
            {" "}
            domain: <span className="opacity-70">{user.domain} </span>
          </p>
          <p
            className={`mt-2 absolute top-0 text-sm opacity-80 ${
              user.available ? "text-green-500" : "text-red-500"
            }`}
          >
            {user.available ? "Available" : "Not Available"}
          </p>
        </div>
        {location.pathname === "/" && user.available ? (
          <label className="my-4 flex flex-col text-center">
            Add To Team
            <select className="p-1 rounded-md" name="team">
              <option value="">Select</option>
              {teams.map((team) => (
                <option
                  key={team._id}
                  value={team.name}
                  onClick={() => handleAddToTeam(team._id)}
                >
                  {team.name}
                </option>
              ))}
              <option value="Create Team" onClick={handleCreateTeam}>
                Create New Team
              </option>
            </select>
          </label>
        ) : (
          <button
            className=" p-1 rounded-xl hover:opacity-70 absolute top-0 right-2"
            onClick={handleDelete}
            disabled={showModal}
          >
            <i className="fa-regular fa-circle-xmark fa-lg opacity-60"></i>
          </button>
        )}
      </div>
      {showModal && (
        <ConfirmModal
          title="Remove User ?"
          message="Are you sure, you want to Remove this User from Team?"
          handleCancelDelete={handleCancelDelete}
          handleConfirmDelete={()=>handleRemove(user._id)}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default UserCard;
