import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CommonState {
    selectedItem?: any;
}

const initialState: CommonState = {
    selectedItem: JSON.parse(localStorage.getItem('selectedItem') || 'null')
}

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setSelectedItem(state, action: PayloadAction<any>) {
            state.selectedItem = action.payload
            localStorage.setItem('selectedItem', JSON.stringify(action.payload))
        }
    },
})

export const { setSelectedItem } = commonSlice.actions
export default commonSlice.reducer