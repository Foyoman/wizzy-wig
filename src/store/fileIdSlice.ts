import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FileIdState {
	value: string;
}

const initialState: FileIdState = {
	value: "",
}

export const fileIdSlice = createSlice({
	name: 'fileId',
	initialState,
	reducers: {
		updateId: (state, action: PayloadAction<string>) => {
			state.value = action.payload;
		}
	}
})

// Action creators are generated for each case reducer function
export const { updateId } = fileIdSlice.actions;

export default fileIdSlice.reducer;