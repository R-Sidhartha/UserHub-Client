
  const initialState = {
    users: [],
    // filteredUsers: [], 
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_USERS":
        return {
          ...state,
          users: action.payload,
          // filteredUsers: action.payload, 
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
          // filteredUsers: [...state.filteredUsers, action.payload],
        };
  
      case 'UPDATE_USER':
        const updatedUserIndex = state.users.users.findIndex(user => user.id === action.payload.id);
        const updatedUsers = [...state.users.users];
        updatedUsers[updatedUserIndex] = action.payload;
  
        return {
          ...state,
          users: updatedUsers,
        };
  
      case 'DELETE_USER':
        const updatedUsersAfterDelete = state.users.users.filter(user => user.id !== action.payload);
        // const updatedFilteredUsersAfterDelete = state.filteredUsers.filter(
        //   user => user.id !== action.payload
        // );
  
        return {
          ...state,
          users: updatedUsersAfterDelete,
          // filteredUsers: updatedFilteredUsersAfterDelete,
        };
  
      default:
        return state;
    }
  };
  
  export default userReducer;
  