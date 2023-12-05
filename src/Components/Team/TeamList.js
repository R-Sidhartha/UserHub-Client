import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getAllTeams } from "../../Redux/Actions/TeamActions";
import TeamDetails from "./TeamDetails";

const TeamList = () => {
  const dispatch = useDispatch();
  const teamList = useSelector((state) => state.teams.teams);
 
  useEffect(() => {
    dispatch(getAllTeams());
  }, [dispatch]);
  
  return (
    <div>
      <h2 className="text-2xl text-center font-bold my-2">
        Team List <span className="opacity-60 text-xl">({teamList.length} teams)</span>
      </h2>
      <div className="flex flex-col">
      <div>
        {teamList.map((team) => (
          <div key={team._id}>
            <TeamDetails
              team={team}
            />
            <hr />
          </div>
        ))}
      </div>
      
      </div>
    </div>
  );
};

export default TeamList;
