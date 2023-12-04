import { CREATE_TEAM_SUCCESS, GET_TEAM_SUCCESS, GET_ALL_TEAMS_SUCCESS,UPDATE_TEAM_SUCCESS, DELETE_TEAM_SUCCESS} from '../Actions/TeamActions';

const initialState = {
  teams: [],
  currentTeam: null,
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TEAM_SUCCESS:
      return {
        ...state,
        teams: [...state.teams, action.payload],
        currentTeam: action.payload,
      };

    case GET_TEAM_SUCCESS:
      return {
        ...state,
        currentTeam: action.payload,
      };
    case GET_ALL_TEAMS_SUCCESS:
      return {
        ...state,
        teams: action.payload,
      };
      case UPDATE_TEAM_SUCCESS:
      return {
        ...state,
        teams: state.teams.map((team) =>
          team._id === action.payload._id ? action.payload : team
        ),
        currentTeam: action.payload,
      };

    case DELETE_TEAM_SUCCESS:
      return {
        ...state,
        teams: state.teams.filter((team) => team._id !== action.payload),
        currentTeam: null,
      };

    default:
      return state;
  }
};

export default teamReducer;
