import { createSlice } from "@reduxjs/toolkit";
import { USER_LOGIN } from "../../contants/userContants";
import { lcStorage } from "../../helpers/localStorage";
import I_initialState from "../../interfaces/initialStateInterface";

const initialState: I_initialState["userManagementSlice"] = {
    userLogin: lcStorage.get(USER_LOGIN),
    isPageLogin: true,
    autofill: null,
    userList: [],
    userInfo: null,
    userCourseInfo: null,
};

const userManagementSlice = createSlice({
    name: "userManagementSlice",
    initialState,
    reducers: {
        loginREDU: (state, { payload }) => {
            state.userLogin = payload;
        },
        updateUserLoginREDU: (state, { payload }) => {
            // delete payload.enrolledCourseDetail;
            lcStorage.set(USER_LOGIN, payload);
            state.userLogin = payload;
        },
        setIsPageLoginREDU: (state, { payload }) => {
            state.isPageLogin = payload;
        },
        setAutofillREDU: (state, { payload }) => {
            state.autofill = payload;
        },
        setUserListREDU: (state, { payload }) => {
            state.userList = payload;
        },
        setUserInfoREDU: (state, { payload }) => {
            state.userInfo = payload;
        },
        setUserCourseInfoREDU: (state, { payload }) => {
            state.userCourseInfo = payload;
        },
    },
});

export const { setUserCourseInfoREDU, setUserInfoREDU, setUserListREDU, setAutofillREDU, loginREDU, updateUserLoginREDU, setIsPageLoginREDU } =
    userManagementSlice.actions;

export default userManagementSlice.reducer;
