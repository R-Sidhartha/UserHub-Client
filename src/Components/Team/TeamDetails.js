import React, { useState } from "react";
import Users from "../UserList/Users";
import { useDispatch } from "react-redux";
import { deleteTeam, updateTeam } from "../../Redux/Actions/TeamActions";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../ConfirmModal";

const TeamDetails = ({ team }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleCancelDelete = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  const handleDeleteTeam = (teamId) => {
    dispatch(deleteTeam(teamId));
    setShowModal(false); // Close the modal after initiating delete
  };

  const handleRemoveUser = (userIdToRemove) => {
    dispatch(
      updateTeam(team._id, {
        userIdsToAdd: "",
        userIdToRemove: `${userIdToRemove}`,
      })
    );
  };

  const handleAddUser = () => {
    navigate("/");
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      <div className="mx-2 my-5 flex flex-col-reverse justify-center">
        {team && (
          <>
            <div>
              <div className="flex justify-between relative items-center">
                <h3 className="font-semibold">Team Name: {team.name}</h3>
                <div>
                  <button
                    className="bg-red-400 p-2 text-xs hover:opacity-60 mx-4 rounded-xl"
                    onClick={handleDelete}
                  >
                    Delete Team
                  </button>
                </div>
              </div>
              <p className="font-semibold my-2">Team Members</p>

              <ul>
                <div className="container mx-auto mt-8 flex">
                  <Users
                    userlist={team.users}
                    handleRemoveUser={handleRemoveUser}
                    handleAddUser={handleAddUser}
                  />
                </div>
              </ul>
            </div>
            <div className="w-full flex items-center justify-center">
              <div className="w-1/4">
              {showModal && (
                <ConfirmModal
                  title="Delete Team ?"
                  message="Are you sure, you want to Delete this Team permanently?"
                  handleCancelDelete={handleCancelDelete}
                  handleConfirmDelete={() => handleDeleteTeam(team._id)}
                  handleDelete={handleDelete}
                />
              )}
            </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TeamDetails;
