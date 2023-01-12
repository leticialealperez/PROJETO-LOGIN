import { combineReducers } from 'redux';
import { contatosReducer } from './contatos/contatosSlice';
import { userLoggedReducer } from './userLogged/userLoggedSlice';
import { usersReducer } from './users/usersSlice';



const rootReducer = combineReducers({
  users: usersReducer,
  userLogged: userLoggedReducer,
  contatos: contatosReducer,
});

export { rootReducer };