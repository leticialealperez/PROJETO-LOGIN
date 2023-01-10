import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './modules/rootReducer';

// const persistConfig = {
//   key: 'app',
//   storage: meuStorage,
// };


const minhaStore = configureStore({
  reducer: rootReducer,
});

export { minhaStore }

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof minhaStore.getState>; 


// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof minhaStore.dispatch;