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
    capNhatKhoaHoc: (khoahoc: FormData) => {
        return axios.put(`/QuanLyKhoaHoc/CapNhatKhoaHoc`, khoahoc);
    },
    xoaKhoaHoc: (idKhoaHoc: string) => {
        return axios.delete(`/QuanLyKhoaHoc/XoaKhoaHoc?idKhoaHoc=${idKhoaHoc}`);
    },
    layDanhMucKhoaHoc: () => {
        return axios.get(`/QuanLyKhoaHoc/LayDanhMucKhoaHoc`);
    },
};
