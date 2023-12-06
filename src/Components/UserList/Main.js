import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../Redux/Actions/UserActions";
import Users from "./Users";
import Pagination2 from "./Pagination";
import FilterUsers from "./FilterUsers";
import SearchBar from "./SearchBar";
import { updateTeam } from "../../Redux/Actions/TeamActions";
import CreateTeam from "../Team/CreateTeam";
import loadinggif from "../Loading/loading.gif";
import CreateUser from "./CreateUser";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allusers = useSelector((state) => state.users.users);
  const [page, setPage] = useState(1);
  const [showCreateModal, setshowCreateModal] = useState(false);
  const [showCreateUserModal, setshowCreateUserModal] = useState(false);
  const [UserIdToCreate, setUserIdToCreate] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({
    domain: "",
    gender: "",
    available: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const CreateTeamwithUser = (userIdToCreate) => {
    setUserIdToCreate(userIdToCreate);
    setshowCreateModal(true);
  };
  const handleCloseModal = (e) => {
    e.preventDefault();
    setshowCreateModal(false);
    setshowCreateUserModal(false);
  };
  const handleAddUserToTeam = async (userId, teamId) => {
    try {
      dispatch(
        updateTeam(teamId, {
          userIdToAdd: `${userId}`,
          userIdsToRemove: "",
        })
      );
      navigate("/teams");
    } catch (error) {
      console.error("Error updating team:", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    // Fetch users when filterCriteria changes
    console.log(page);
    dispatch(
      fetchUsers({ page: page, ...filterCriteria, search: searchQuery })
    );
    // settotalPage(Math.ceil(allusers.users.length / 20));
  }, [dispatch, page, filterCriteria, searchQuery]);
  return (
    allusers && (
      <>
        <div className={`${showCreateUserModal ?' bg-gray-400 opacity-25 ':''}`}>
          <div className="w-full flex flex-col justify-center items-center">
            <h2 className="font-bold text-3xl my-2">User List</h2>
            <SearchBar setSearchQuery={setSearchQuery} setPage={setPage} />
            <div className="">
              <FilterUsers
                filterCriteria={filterCriteria}
                setFilterCriteria={setFilterCriteria}
                setPage={setPage}
                setshowCreateUserModal={setshowCreateUserModal}
              />
            </div>
          </div>
          {showCreateModal && UserIdToCreate && (
            <div>
              <CreateTeam
                UserIdToCreate={UserIdToCreate}
                handleCloseModal={handleCloseModal}
              />
            </div>
          )}
          <div className="flex w-full justify-center">
            <div className="w-11/12 ">
              <div className="container mx-auto mt-8 flex justify-center items-center ">
                {allusers && allusers.users && allusers.users.length > 0 ? (
                  <Users
                    userlist={allusers.users}
                    handleAddUserToTeam={handleAddUserToTeam}
                    CreateTeamwithUser={CreateTeamwithUser}
                    totalPages={
                      allusers && allusers.pageInfo
                        ? allusers.pageInfo.totalPages
                        : 1
                    }
                    currentPage={
                      allusers && allusers.pageInfo
                        ? allusers.pageInfo.currentPage
                        : 1
                    }
                  />
                ) : allusers &&
                  allusers.users &&
                  allusers.users.length === 0 ? (
                  <span className="font-semibold text-center ml-12">
                    No User to Display
                  </span>
                ) : (
                  <img className="w-9" src={loadinggif} alt="Loading" />
                )}
              </div>
              <div>
                <Pagination2 pageInfo={allusers.pageInfo} setPage={setPage} />
              </div>
            </div>
          </div>
        </div>
        {showCreateUserModal && (
            <div className="absolute top-24 left-1/5 sm:left-1/3 bg-none opacity-100 rounded-lg">
              <CreateUser
                handleCloseModal={handleCloseModal}
                setPage={setPage}
                totalPages={
                  allusers && allusers.pageInfo
                    ? allusers.pageInfo.totalPages
                    : 1
                }
              />
            </div>
          )}
           {showCreateUserModal && (
        <div
          className="fixed z-10 top-0 left-0 w-full h-full bg-transparent"
        />
      )}
      </>
    )
  );
};

export default Main;
