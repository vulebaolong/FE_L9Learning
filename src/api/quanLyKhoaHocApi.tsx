import axios from "axios";

export const khoaHocApi = {
    layDanhSachKhoaHoc: () => {
        return axios.get(`/QuanLyKhoaHoc/LayDanhSachKhoaHoc`);
    },
};
