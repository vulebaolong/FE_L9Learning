import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDrawer: false,
};

const drawerSlice = createSlice({
    name: "drawerSlice",
    initialState,
    reducers: {
        setIsDraweREDU: (state, { payload }) => {
            state.isDrawer = payload;
        },
    },
});

export const {setIsDraweREDU} = drawerSlice.actions;

export default drawerSlice.reducer;
