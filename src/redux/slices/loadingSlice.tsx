import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoadingBtn: false,
    isLoadingPage: false,
};

const loadingSlice = createSlice({
    name: "loadingSlice",
    initialState,
    reducers: {
        setIsLoadingBtnREDU: (state, { payload }) => {
            state.isLoadingBtn = payload;
        },
        setIsLoadingPageREDU: (state, { payload }) => {
            state.isLoadingPage = payload;
        },
    },
});

export const {setIsLoadingBtnREDU, setIsLoadingPageREDU} = loadingSlice.actions;

export default loadingSlice.reducer;
