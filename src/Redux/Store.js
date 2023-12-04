import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import userReducer from './Reducers/UserReducer';
import teamReducer from './Reducers/TeamReducer';

const store = configureStore({
  reducer: {
    users: userReducer,
    teams: teamReducer,
  },
  middleware: [thunk],
});

export default store;
