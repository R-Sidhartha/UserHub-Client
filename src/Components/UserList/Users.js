import React from "react";
import UserCard from "./UserCard";
import { useLocation } from "react-router-dom";

const Users = ({userlist,handleRemoveUser,handleAddUserToTeam,CreateTeamwithUser,handleAddUser}) => {
  const location=useLocation()

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {userlist.map((user) => (
                <UserCard key={user.id} user={user} handleRemoveUser={handleRemoveUser} handleAddUserToTeam={handleAddUserToTeam} CreateTeamwithUser={CreateTeamwithUser}/>
              ))
            }
            {location.pathname==='/teams' &&
            <div className="bg-white rounded-lg p-4 shadow-md flex flex-col relative justify-center ">
              <button className="w-full h-full opacity-70 hover:opacity-50" onClick={handleAddUser}><i class="fa-solid fa-plus fa-xl"></i></button>
            </div>
          }
      </div>
  );
};

export default Users;
