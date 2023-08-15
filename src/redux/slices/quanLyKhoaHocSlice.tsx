import { createSlice } from "@reduxjs/toolkit";
import I_initialState from "../../interfaces/I_initialState";

const initialState: I_initialState["quanLyKhoaHocSlice"] = {
    danhSachKhoaHoc: [],
};

const quanLyKhoaHocSlice = createSlice({
    name: "quanLyKhoaHocSlice",
    initialState,
    reducers: {
        layDanhSachKhoaHocREDU: (state, { payload }) => {
            state.danhSachKhoaHoc = payload;
        },
    },
});

export const { layDanhSachKhoaHocREDU } = quanLyKhoaHocSlice.actions;

export default quanLyKhoaHocSlice.reducer;
