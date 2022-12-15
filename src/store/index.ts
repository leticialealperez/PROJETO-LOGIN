import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './modules/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


const minhaStore = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);


export { minhaStore }

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof minhaStore.getState>; 


// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof minhaStore.dispatch;