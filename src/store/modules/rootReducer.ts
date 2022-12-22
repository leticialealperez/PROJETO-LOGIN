import { combineReducers } from 'redux';
import { recadosReducer } from './recados/recadosSlice';
import { userLoggedReducer } from './userLogged/userLoggedSlice';
import { usersReducer } from './users/usersSlice';



const rootReducer = combineReducers({
  users: usersReducer,
  userLogged: userLoggedReducer,
  recados: recadosReducer
});

export { rootReducer };