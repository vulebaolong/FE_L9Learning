import { createSlice } from "@reduxjs/toolkit";
import I_initialState from "../../interfaces/initialStateInterface";

const initialState: I_initialState["courseManagementSlice"] = {
    courseList: [],
    userInfoForCourse: null,
};

const courseManagementSlice = createSlice({
    name: "courseManagementSlice",
    initialState,
    reducers: {
        getCourseListREDU: (state, { payload }) => {
            state.courseList = payload;
        },
        setUserInfoForCourseREDU: (state, { payload }) => {
            state.userInfoForCourse = payload;
        },
    },
});

export const { setUserInfoForCourseREDU, getCourseListREDU } = courseManagementSlice.actions;

export default courseManagementSlice.reducer;
