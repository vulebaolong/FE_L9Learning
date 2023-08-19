import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoadingBtn: false,
};

const loadingSlice = createSlice({
    name: "loadingSlice",
    initialState,
    reducers: {
        setIsLoadingBtnREDU: (state, { payload }) => {
            state.isLoadingBtn = payload;
        },
    },
});

export const {setIsLoadingBtnREDU} = loadingSlice.actions;

export default loadingSlice.reducer;
