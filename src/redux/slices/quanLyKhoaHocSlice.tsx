import { createSlice } from "@reduxjs/toolkit";
import I_initialState from "../../interfaces/I_initialState";

const initialState: I_initialState["quanLyKhoaHocSlice"] = {
    danhSachKhoaHoc: [],
    thongTinNguoiDungChoKhoaHoc: null,
};

const quanLyKhoaHocSlice = createSlice({
    name: "quanLyKhoaHocSlice",
    initialState,
    reducers: {
        layDanhSachKhoaHocREDU: (state, { payload }) => {
            state.danhSachKhoaHoc = payload;
        },
        setThongTinNguoiDungChoKhoaHocREDU: (state, { payload }) => {
            state.thongTinNguoiDungChoKhoaHoc = payload;
        },
    },
});

export const { setThongTinNguoiDungChoKhoaHocREDU, layDanhSachKhoaHocREDU } = quanLyKhoaHocSlice.actions;

export default quanLyKhoaHocSlice.reducer;
