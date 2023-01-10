import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../..';
import { apiGet, apiPost } from '../../../services/ApiService';
import { ResponseAPI, SaveUserRequest, User } from '../typeStore';


// opcional - quando o identificador do dado for de nome id
const usersAdapter = createEntityAdapter<User>({
  selectId: (state) => state.id,
});

export const { selectAll: buscarUsuarios, selectById: buscarUsuarioPorEmail } = usersAdapter.getSelectors<RootState>((state) => state.users);


// criar asyncThunk
export const getUsers = createAsyncThunk<ResponseAPI>('users/getUsers', async () => {
  const response = await apiGet('/users');

  return response;
});


// saveUser
export const saveUser = createAsyncThunk<ResponseAPI, SaveUserRequest>(
  'users/saveUser',
  async (dadosNovoUsuario: SaveUserRequest) => {
    const response = await apiPost('/users', dadosNovoUsuario);

    return response;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState({
    success: false,
    mensagem: '',
    loading: false,
  }),
  reducers: {
    atualizarUsuario: usersAdapter.updateOne,
    clearProperties: (state) => {
      state.loading = false;
      state.mensagem = '';
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(
      getUsers.fulfilled,
      (state, action: PayloadAction<ResponseAPI>) => {
        if(action.payload.success) {
          usersAdapter.setAll(state, action.payload.data);
        }
        state.loading = false;
        state.success = action.payload.success;
      }
    );

    builder.addCase(saveUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      saveUser.fulfilled,
      (state, action) => {
        if(action.payload.success) {
          usersAdapter.addOne(state, action.payload.data);
        }
        state.loading = false;
        state.mensagem = action.payload.message;
        state.success = action.payload.success;
      }
    );    
  }
});


export const { atualizarUsuario, clearProperties } = usersSlice.actions;

export const usersReducer = usersSlice.reducer