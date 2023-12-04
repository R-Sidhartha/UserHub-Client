
const host = 'http://localhost:5000/api';

// Action Creators
export const fetchUsersSuccess = (users) => ({
  type:'FETCH_USERS',
  payload: users,
});
export const fetchUserById = (user) => ({
  type:'FETCH_USER_By_Id',
  payload: user,
});

export const createUserSuccess = (user) => ({
    type:'CREATE_USER',
    payload: user,
  });
  
  export const updateUserSuccess = (user) => ({
    type:'UPDATE_USER',
    payload: user,
  });
  
  export const deleteUserSuccess = (userId) => ({
    type:'DELETE_USER',
    payload: userId,
  });
  
  export const setSelectedUserIds = (userIds) => ({
    type: 'SET_SELECTED_USER_IDS',
    payload: userIds,
  });
  

// export const searchUsers = (query) => ({
//   type:'SEARCH_USERS',
//   payload: query,
// });

// export const filterUsers = (filterType, value) => ({
//   type:'FILTER_USERS',
//   payload: { filterType, value },
// });

// Async Action Creator
export const fetchUsers = (queryParams = {}) => {
  return async (dispatch) => {
    try {
      const {
        page=1 ,
        limit = 20,
        domain,
        gender,
        available,
        search,
      } = queryParams;

      // Building the query object
      const query = new URLSearchParams();
      if (domain) query.append('domain', domain);
      if (gender) query.append('gender', gender);
      if (available !== undefined && available !== null && available !== '') {query.append('available', available);}
      if (search) query.append('search', search);

      query.append('page', page);  // Add page to the query
      query.append('limit', limit);  // Add limit to the query

      const response = await fetch(`${host}/users?${query.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      dispatch(fetchUsersSuccess(data));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
};

export const getUserById = (userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${host}/users/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const user = await response.json();
      dispatch(fetchUserById(user));
    } catch (error) {
      // Handle error (dispatch an error action or any other logic)
      console.error('Error fetching user by ID:', error);
    }
  };
};

export const createUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${host}/users/creatuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const newUser = await response.json();
      dispatch(createUserSuccess(newUser));
    } catch (error) {
      // Handle error (dispatch an error action or any other logic)
      console.error('Error creating user:', error);
    }
  };
};

export const updateUser = (userId, updatedUserData) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${host}/users/updateuser/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedUser = await response.json();
      dispatch(updateUserSuccess(updatedUser));
    } catch (error) {
      // Handle error
      console.error('Error updating user:', error);
    }
  };
};

export const deleteUser = (userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${host}/users/deleteuser/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      dispatch(deleteUserSuccess(userId));
    } catch (error) {
      // Handle error
      console.error('Error deleting user:', error);
    }
  };
};
