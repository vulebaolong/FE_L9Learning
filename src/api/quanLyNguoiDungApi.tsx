import axios, { AxiosResponse } from "axios";
import { I_dangKy, I_dangNhap } from "../interfaces/I_quanLyNguoiDung";

/**
 * layThongTinTaiKhoan
 * capNhatMotThongTinTaiKhoan
 * => dành cho TÀI KHOẢN ĐANG ĐĂNG NHẬP
 *
 * layDanhSachNguoiDung
 * layThongTinNguoiDung
 * capNhatMotThongTinNguoiDung
 * xoaNguoiDung
 * => dành cho ADMIN QUẢN LÝ NGƯỜI DÙNG
 */

export const userApi = {
    dangNhap: (data: I_dangNhap) => {
        return axios.post(`/QuanLyNguoiDung/DangNhap`, data);
    },
    dangKy: (data: I_dangKy) => {
        return axios.post(`/QuanLyNguoiDung/DangKy`, data);
    },
    layThongTinTaiKhoan: () => {
        return axios.get(`/QuanLyNguoiDung/ThongTinTaiKhoan`);
    },
    capNhatMotThongTinTaiKhoan: (thongTinMoi: object) => {
        return axios.patch(`/QuanLyNguoiDung/CapNhatMotThongTinTaiKhoan`, thongTinMoi);
    },
    capNhatMatKhau: (thongTinMatKhau: { matKhauCurent: string; matKhauNew: string }) => {
        return axios.patch(`/QuanLyNguoiDung/CapNhatMatKhau`, thongTinMatKhau);
    },
    capNhatAvatarTaiKhoan: (avatar: FormData) => {
        return axios.patch(`/QuanLyNguoiDung/CapNhatAvatarTaiKhoan`, avatar);
    },
    capNhatAvatarNguoiDung: (avatar: FormData) => {
        return axios.patch(`/QuanLyNguoiDung/CapNhatAvatarNguoiDung`, avatar);
    },
    layDanhSachNguoiDung: () => {
        return axios.get(`/QuanLyNguoiDung/LayDanhSachNguoiDung`);
    },
    layThongTinNguoiDung: (idNguoiDung: string) => {
        return axios.get(`/QuanLyNguoiDung/LayThongTinNguoiDung?idNguoiDung=${idNguoiDung}`);
    },
    capNhatMotThongTinNguoiDung: (thongTinMoi: object) => {
        return axios.patch(`/QuanLyNguoiDung/CapNhatMotThongTinNguoiDung`, thongTinMoi);
    },
    xoaNguoiDung: (idNguoiDung: string) => {
        return axios.delete(`/QuanLyNguoiDung/XoaNguoiDung?idNguoiDung=${idNguoiDung}`);
    },
    layThongTinKhoaHocNguoiDung: (idNguoiDung: string) => {
        return axios.get(`/QuanLyNguoiDung/LayThongTinKhoaHocNguoiDung?idNguoiDung=${idNguoiDung}`);
    },
    huyDangKyKhoaHocChoNguoiDung: ({ idNguoiDung, idKhoaHoc }: { idNguoiDung: string; idKhoaHoc: string }) => {
        return axios.post(`/QuanLyNguoiDung/HuyDangKyKhoaHocChoNguoiDung`, { idNguoiDung, idKhoaHoc });
    },
    dangKyKhoaHocChoNguoiDung: ({ idNguoiDung, idKhoaHoc }: { idNguoiDung: string; idKhoaHoc: string }) => {
        return axios.post(`/QuanLyNguoiDung/DangKyKhoaHocChoNguoiDung`, { idNguoiDung, idKhoaHoc });
    },
};
