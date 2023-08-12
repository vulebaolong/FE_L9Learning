import { createSlice } from "@reduxjs/toolkit";
import { USER_LOGIN } from "../../contants/userContants";
import { lcStorage } from "../../helpers/localStorage";

const initialState = {
    userLogin: lcStorage.get(USER_LOGIN),
};

const quanLyNguoiDungSlice = createSlice({
    name: "quanLyNguoiDungSlice",
    initialState,
    reducers: {
        dangNhapREDU: (state, { payload }) => {
            state.userLogin = payload;
        },
    },
});

export const { dangNhapREDU } = quanLyNguoiDungSlice.actions;

export default quanLyNguoiDungSlice.reducer;
