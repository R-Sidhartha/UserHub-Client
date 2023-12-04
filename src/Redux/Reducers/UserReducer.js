
  const initialState = {
    users: [],
    filteredUsers: [], 
    selectedUserIds:[]
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_USERS":
        return {
          ...state,
          users: action.payload,
          filteredUsers: action.payload, // initialize filteredUsers with all users
        };
  
      case "FETCH_USER_By_Id":
        return {
          ...state,
          users: action.payload,
        };
  
      case 'CREATE_USER':
        return {
          ...state,
          users: [...state.users, action.payload],
          filteredUsers: [...state.filteredUsers, action.payload],
        };
  
      case 'UPDATE_USER':
        const updatedUserIndex = state.users.users.findIndex(user => user.id === action.payload.id);
        const updatedUsers = [...state.users];
        updatedUsers[updatedUserIndex] = action.payload;
  
        const updatedFilteredUserIndex = state.filteredUsers.findIndex(
          user => user.id === action.payload.id
        );
        const updatedFilteredUsers = [...state.filteredUsers];
        updatedFilteredUsers[updatedFilteredUserIndex] = action.payload;
  
        return {
          ...state,
          users: updatedUsers,
          filteredUsers: updatedFilteredUsers,
        };
  
      case 'DELETE_USER':
        const updatedUsersAfterDelete = state.users.users.filter(user => user.id !== action.payload);
        const updatedFilteredUsersAfterDelete = state.filteredUsers.filter(
          user => user.id !== action.payload
        );
  
        return {
          ...state,
          users: updatedUsersAfterDelete,
          filteredUsers: updatedFilteredUsersAfterDelete,
        };
  
      case 'SEARCH_USERS':
        const searchTerm = action.payload.toLowerCase();
        const searchedUsers = state.users.users.filter(user =>
          `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm)
        );
  
        return {
          ...state,
          filteredUsers: searchedUsers,
        };
  
      case 'FILTER_USERS':
        const { filterType, value } = action.payload;
        const filteredUsers = state.users.users.filter(user => user[filterType] === value);
  
        return {
          ...state,
          filteredUsers,
        };
        case 'SET_SELECTED_USER_IDS':
          return {
            ...state,
            selectedUserIds: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default userReducer;
  