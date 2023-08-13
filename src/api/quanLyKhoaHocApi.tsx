import axios from "axios";

export const khoaHocApi = {
    layDanhSachKhoaHoc: () => {
        return axios.get(`/QuanLyKhoaHoc/LayDanhSachKhoaHoc`);
    },
    layMotKhoaHoc: (id: string) => {
        return axios.get(`/QuanLyKhoaHoc/LayMotKhoaHoc?id=${id}`);
    },
};
