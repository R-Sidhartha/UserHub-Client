export const CREATE_TEAM_SUCCESS = 'CREATE_TEAM_SUCCESS';
export const GET_TEAM_SUCCESS = 'GET_TEAM_SUCCESS';
export const GET_ALL_TEAMS_SUCCESS = 'GET_ALL_TEAM_SUCCESS';
export const UPDATE_TEAM_SUCCESS = 'UPDATE_TEAM_SUCCESS';
export const DELETE_TEAM_SUCCESS = 'DELETE_TEAM_SUCCESS';

const host = 'http://localhost:5000/api';

// Action Creators
export const createTeamSuccess = (team) => ({
  type: CREATE_TEAM_SUCCESS,
  payload: team,
});

export const getTeamSuccess = (team) => ({
  type: GET_TEAM_SUCCESS,
  payload: team,
});

export const getAllTeamsSuccess = (teams) => ({
  type: GET_ALL_TEAMS_SUCCESS,
  payload: teams,
});

export const updateTeamSuccess = (team) => ({
  type: UPDATE_TEAM_SUCCESS,
  payload: team,
});

export const deleteTeamSuccess = (teamId) => ({
  type: DELETE_TEAM_SUCCESS,
  payload: teamId,
});



// Async Action Creators
export const getAllTeams = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${host}/teams`); // Assuming you have an endpoint to fetch all teams

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const allTeams = await response.json();
      dispatch(getAllTeamsSuccess(allTeams));
    } catch (error) {
      console.error('Error getting all teams:', error);
    }
  };
};

export const createTeam = ({name='',userIds=[]}) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${host}/teams/createteam`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name,userIds }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const newTeam = await response.json();
      dispatch(createTeamSuccess(newTeam));
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };
};

export const getTeamById = (teamId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${host}/teams/team/${teamId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const team = await response.json();
      dispatch(getTeamSuccess(team));
    } catch (error) {
      console.error('Error getting team:', error);
    }
  };
  
};
// TeamActions.js

export const updateTeam = (teamId,{ name, userIdToAdd = "", userIdToRemove=""}) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${host}/teams/update/${teamId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, userIdToAdd, userIdToRemove }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedTeam = await response.json();
      dispatch(updateTeamSuccess(updatedTeam));
    } catch (error) {
      console.error('Error updating team:', error);
    }
  };
};


export const deleteTeam = (teamId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${host}/teams/delete/${teamId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      dispatch(deleteTeamSuccess(teamId));
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };
};
