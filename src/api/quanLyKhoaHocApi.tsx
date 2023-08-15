import axios from "axios";

export const khoaHocApi = {
    layDanhSachKhoaHoc: () => {
        return axios.get(`/QuanLyKhoaHoc/LayDanhSachKhoaHoc`);
    },
    layMotKhoaHoc: (id: string) => {
        return axios.get(`/QuanLyKhoaHoc/LayMotKhoaHoc?id=${id}`);
    },
    themKhoaHoc: (khoahoc: FormData) => {
        return axios.post(`/QuanLyKhoaHoc/ThemKhoaHoc`, khoahoc);
    },
    xoaKhoaHoc: (idKhoaHoc: string) => {
        return axios.delete(`/QuanLyKhoaHoc/XoaKhoaHoc?idKhoaHoc=${idKhoaHoc}`);
    },
};
