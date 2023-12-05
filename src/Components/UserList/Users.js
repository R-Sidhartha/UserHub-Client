import React from "react";
import UserCard from "./UserCard";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser, fetchUsers } from "../../Redux/Actions/UserActions";

const Users = ({userlist,handleRemoveUser,handleAddUserToTeam,CreateTeamwithUser,handleAddUser,currentPage,handleEdit,totalPages}) => {
  const dispatch=useDispatch()
  const location=useLocation()

  const handleDeleteUserwithId= async(userId)=>{
    await dispatch(deleteUser(userId))
  dispatch(fetchUsers({ page: currentPage }));
  }

   return (
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 w-full  ${location.pathname==='/teams'? 'xl:grid-cols-6' : 'xl:grid-cols-5'} gap-8`}>
          {userlist.map((user) => (
                <UserCard key={user.id} user={user} handleRemoveUser={handleRemoveUser} handleAddUserToTeam={handleAddUserToTeam} CreateTeamwithUser={CreateTeamwithUser} handleDeleteUserwithId={handleDeleteUserwithId} handleEdit={() => handleEdit(user)} totalPages={totalPages}/>
              ))
            }
            {location.pathname==='/teams' &&
            <div className="bg-white rounded-lg p-4 shadow-md flex flex-col relative justify-center ">
              <button className="w-full h-full opacity-70 hover:opacity-50" onClick={handleAddUser}><i className="fa-solid fa-plus fa-xl"></i></button>
            </div>
          }
      </div>
  );
};

export default Users;
