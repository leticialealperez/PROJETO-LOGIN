import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { apiDelete, apiGet, apiPost, apiPut } from '../../../services/ApiService';
import { Contato, DeleteContactRequest, SaveContactRequest, UpdateContactRequest } from '../typeStore';



const adapter = createEntityAdapter<Contato>({
  selectId: (item) => item.id,
});

export const { selectAll: buscarContatos, selectById: buscarContatoPorId } = adapter.getSelectors(
  (state: RootState) => state.contatos
);

// GET
export const getContacts = createAsyncThunk('contatos/getContacts', async (idUser: string) => {
  const resposta = await apiGet(`/users/${idUser}/contacts`)

  return resposta;
});

// POST
export const saveContact = createAsyncThunk('contatos/saveContact', async (parametros: SaveContactRequest) => {
  const { idUser, newContact } = parametros;
  
  const resposta = await apiPost(`/users/${idUser}/contacts`, newContact);

  return resposta;
});

// PUT
export const updateContact = createAsyncThunk('contatos/updateContact', async (parametros: UpdateContactRequest) => {
  const { idUser, idContact, contactUpdated } = parametros;
  const resposta = await apiPut(`/users/${idUser}/contacts/${idContact}`, contactUpdated);

  return resposta
});

// DELETE
export const deleteContact = createAsyncThunk('contatos/deleteContact', async (parametros: DeleteContactRequest, { dispatch }) => {
  const { idUser, idContact } = parametros;

  const resposta = await apiDelete(`/users/${idUser}/contacts/${idContact}`);
  
  const payload = {
    ...resposta,
    idContactRemoved: idContact,
  };
  
  // if(resposta.success) {
  //   dispatch(getContacts(idUser));
  // }

  return payload;
});

const contatosSlice = createSlice({
  name: 'contatos',
  initialState: adapter.getInitialState({
    loading: false,
    mensagem: '',
    success: false,
  }),
  reducers: {
    limparRecados: adapter.removeAll,
    setarRecados: adapter.addMany,
  },
  extraReducers: (builder) => {
    // GET - pendente e completo
    builder.addCase(getContacts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getContacts.fulfilled, (state, action) => {
      state.loading = false;
      state.mensagem = action.payload.message;
      state.success = action.payload.success;

      if(action.payload.success) {
        adapter.addMany(state, action.payload.data)
      }
    });

    // POST - pendente e completo
    builder.addCase(saveContact.pending, (state, action) => {
      state.loading = true;
    })

    builder.addCase(saveContact.fulfilled, (state, action) => {
      state.loading = false;
      state.mensagem = action.payload.message;
      state.success = action.payload.success;

      if(action.payload.success) {
        adapter.addOne(state, action.payload.data)
      }
    });

    // PUT - pendente e completo
    builder.addCase(updateContact.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(updateContact.fulfilled, (state, action) => {
      state.loading = false;
      state.mensagem = action.payload.message;
      state.success = action.payload.success;

      if(action.payload.success) {
        adapter.updateOne(state, action.payload.data)
      }
    })


    // DELETE - pendente e completo
    builder.addCase(deleteContact.pending, (state, action) => {
      state.loading = true
    });

    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state.loading = false;
      state.mensagem = action.payload.message;
      state.success = action.payload.success;

      if(action.payload.success) {
        adapter.removeOne(state, action.payload.idContactRemoved)
      }
    })
  }
});

export const { limparRecados, setarRecados } = contatosSlice.actions;
export const contatosReducer = contatosSlice.reducer;
