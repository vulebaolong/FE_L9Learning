import { I_khoaHoc } from "./I_quanLyKhoaHoc";

interface I_quanLyKhoaHoc {
    danhSachKhoaHoc: I_khoaHoc[];
}

interface I_initialState {
    quanLyKhoaHocSlice: I_quanLyKhoaHoc;
}

export default I_initialState;
