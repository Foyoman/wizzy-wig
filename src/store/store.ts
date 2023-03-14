import { configureStore } from '@reduxjs/toolkit';
import fileReducer from './fileSlice';
import fileSysReducer from './fileSysSlice';
import markdownReducer from './markdownSlice';

export const store = configureStore({
	reducer: {
		file: fileReducer,
		fileSys: fileSysReducer,
		markdown: markdownReducer,
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type : {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch