import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CommonState {
    selectedItem?: any;
}

const initialState: CommonState = {
    selectedItem: null,
}

const authSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setSelectedItem(state, action: PayloadAction<any>) {
            state.selectedItem = action.payload
        }
    },
})

export const { setSelectedItem } = authSlice.actions
export default authSlice.reducer