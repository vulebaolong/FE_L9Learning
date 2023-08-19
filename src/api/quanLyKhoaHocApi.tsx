import axios from "axios";

export const khoaHocApi = {
    layDanhSachKhoaHoc: () => {
        return axios.get(`/QuanLyKhoaHoc/LayDanhSachKhoaHoc`);
    },
    timKiemTenKhoaHoc: (tenKhoaHoc: string) => {
        return axios.get(`/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${tenKhoaHoc}`);
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
    xoaKhoaHoc: (maKhoaHoc: string) => {
        return axios.delete(`/QuanLyKhoaHoc/XoaKhoaHoc?maKhoaHoc=${maKhoaHoc}`);
    },
    layDanhMucKhoaHoc: () => {
        return axios.get(`/QuanLyKhoaHoc/LayDanhMucKhoaHoc`);
    },
    dangKyKhoaHoc: (maKhoaHoc: { maKhoaHoc: string }) => {
        return axios.post(`/QuanLyKhoaHoc/DangKyKhoaHoc`, maKhoaHoc);
    },
    huyDangKyKhoaHoc: (maKhoaHoc: { maKhoaHoc: string }) => {
        return axios.post(`/QuanLyKhoaHoc/HuyDangKyKhoaHoc`, maKhoaHoc);
    },
};
