import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../typeStore';


const initialState: Omit<User, 'contacts'> = {
  id: '',
  email: '',
  name: '',
  password: ''
}


const userLoggedSlice = createSlice({
  name: 'userLogged',
  initialState,
  reducers: {
    setUsuarioLogado: (
      state,
      action: PayloadAction<Omit<User, 'contacts'>>
    ) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.password = action.payload.password;
    },
    clearUsuarioLogado: (state) => {
      return initialState;
    },
  },
});

export const { setUsuarioLogado, clearUsuarioLogado } = userLoggedSlice.actions;
export const userLoggedReducer = userLoggedSlice.reducer;
