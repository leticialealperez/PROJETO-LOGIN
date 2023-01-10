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
export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const { data } = await apiGet('/users');

  if(data.success) {
    return data
  }

  return {
    ...data,
    data: []
  };
});


// saveUser
export const saveUser = createAsyncThunk(
  'users/saveUser',
  async (dadosNovoUsuario: SaveUserRequest) => {
    const { data } = await apiPost('/users', dadosNovoUsuario);

    if (data.success) {
      return data;
    }

    return {
      ...data,
      data: {},
    };
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
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(
      getUsers.fulfilled,
      (state, action: PayloadAction<ResponseAPI>) => {
        usersAdapter.setAll(state, action.payload.data);
        state.loading = false;
        state.mensagem = action.payload.message;
        state.success = action.payload.success;
      }
    );
    builder.addCase(
      getUsers.rejected,
      (state, action) => {
        state.loading = false;
        state.mensagem = action.error.message ?? '';
        state.success = false;
      }
    );

    builder.addCase(saveUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      saveUser.fulfilled,
      (state, action: PayloadAction<ResponseAPI>) => {
        usersAdapter.addOne(state, action.payload.data);
        state.loading = false;
        state.mensagem = action.payload.message;
        state.success = action.payload.success;
      }
    );
    builder.addCase(saveUser.rejected, (state, action) => {
      state.loading = false;
      state.mensagem = action.error.message ?? '';
      state.success = false;
    });
    
  }
});


export const { atualizarUsuario } = usersSlice.actions;

export const usersReducer = usersSlice.reducer