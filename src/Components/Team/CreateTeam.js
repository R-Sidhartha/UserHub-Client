import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createTeam } from '../../Redux/Actions/TeamActions';
import { useNavigate } from 'react-router-dom';

const CreateTeam = ({UserIdToCreate,handleCloseModal}) => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [newTeamName, setNewTeamName] = useState("");
  const teamData = {
    name: newTeamName,
    userIds: [UserIdToCreate],
  };
  const handleCreateTeam = () => {
    dispatch(createTeam(teamData));
    setNewTeamName("");
    navigate('/teams')
  };

  return (
    <div className="my-3 flex justify-center">
          <div className="modal w-1/3 bg-gray-500 rounded-2xl p-1 relative">
            <div className="modal-content flex justify-center flex-col items-center">
              <h2 className='font-semibold text-lg text-center mt-3' >Create New Team</h2>
              <p className='my-2 text-sm'>(The User selected must have Unique doamin and available)</p>
              <form onSubmit={handleCreateTeam}>
            <label className='font-semibold'>
              Team Name:
              <input
                className='mx-2 rounded-md'
                type="text"
                minLength={3}
                required
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
              />
            </label>
            <button className='bg-black p-1 text-sm text-white rounded-lg my-2' type="submit">Create</button>
          </form>
          <div>
            <button className='absolute top-1 right-3' onClick={handleCloseModal}><i className="fa-regular fa-circle-xmark fa-lg opacity-60"></i></button>
          </div>
            </div>
          </div>
      </div>
  )
}

export default CreateTeam
