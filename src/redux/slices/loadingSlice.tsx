import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoadingBtn: false,
    isLoadingPage: false,
    isSkeletonInfoCourseToUser: false,
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
        setIsSkeletonInfoCourseToUserREDU: (state, { payload }) => {
            state.isSkeletonInfoCourseToUser = payload;
        },
    },
});

export const { setIsSkeletonInfoCourseToUserREDU, setIsLoadingBtnREDU, setIsLoadingPageREDU } = loadingSlice.actions;

export default loadingSlice.reducer;
