import { createSlice } from "@reduxjs/toolkit";
import I_initialState from "../../interfaces/I_initialState";

const initialState: I_initialState["quanLyKhoaHocSlice"] = {
    danhSachKhoaHoc: [],
    isOpenCollapseCourse: false,
};

const quanLyKhoaHocSlice = createSlice({
    name: "quanLyKhoaHocSlice",
    initialState,
    reducers: {
        layDanhSachKhoaHocREDU: (state, { payload }) => {
            state.danhSachKhoaHoc = payload;
        },
        setIsOpenCollapseCourseREDU: (state) => {
            if (state.isOpenCollapseCourse === false) {
                state.isOpenCollapseCourse = true;
            } else {
                state.isOpenCollapseCourse = false;
            }
        },
    },
});

export const { layDanhSachKhoaHocREDU, setIsOpenCollapseCourseREDU } = quanLyKhoaHocSlice.actions;

export default quanLyKhoaHocSlice.reducer;
