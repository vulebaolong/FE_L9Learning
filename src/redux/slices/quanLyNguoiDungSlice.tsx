import { createSlice } from "@reduxjs/toolkit";
import { USER_LOGIN } from "../../contants/userContants";
import { lcStorage } from "../../helpers/localStorage";
import I_initialState from "../../interfaces/I_initialState";

const initialState: I_initialState["quanLyNguoiDungSlice"] = {
    userLogin: lcStorage.get(USER_LOGIN),
    isPageDangNhap: true,
    autofill: null,
    danhSachNguoiDung: [],
};

const quanLyNguoiDungSlice = createSlice({
    name: "quanLyNguoiDungSlice",
    initialState,
    reducers: {
        dangNhapREDU: (state, { payload }) => {
            state.userLogin = payload;
        },
        capNhatUserLoginREDU: (state, { payload }) => {
            // delete payload.chiTietKhoaHocGhiDanh;
            lcStorage.set(USER_LOGIN, payload);
            state.userLogin = payload;
        },
        setIsPageDangNhapREDU: (state, { payload }) => {
            state.isPageDangNhap = payload;
        },
        setAutofillREDU: (state, { payload }) => {
            state.autofill = payload;
        },
        setDanhSachNguoiDungREDU: (state, { payload }) => {
            state.danhSachNguoiDung = payload;
        },
    },
});

export const { setDanhSachNguoiDungREDU, setAutofillREDU, dangNhapREDU, capNhatUserLoginREDU, setIsPageDangNhapREDU } = quanLyNguoiDungSlice.actions;

export default quanLyNguoiDungSlice.reducer;
