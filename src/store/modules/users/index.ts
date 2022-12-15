import { Users } from '../typeStore';
import { ActionUser } from './actions';

const initialState: Users = []


const usersReducer = (state = initialState, action: ActionUser): Users => {
    
  switch(action.type) {
      case 'adicionar':

        const exists = state.some((user) => user.email === action.payload.email)

        if(exists) {
          return state
        }

        return [...state, action.payload]
      
      case 'atualizar': 
        const indexUser = state.findIndex((user) => user.email === action.payload.email)

        if(indexUser === -1 ) {
          return state
        }

        const listaAtualizada = [...state]

        listaAtualizada[indexUser] = action.payload;

        return listaAtualizada;
      
      default:
        return state;
      
    }
};


export { usersReducer };