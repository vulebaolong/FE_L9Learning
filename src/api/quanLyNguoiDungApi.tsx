import axios from "axios";
import { I_dangKy, I_dangNhap } from "../interfaces/I_quanLyNguoiDung";

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
    capNhatMotThongTinNguoiDung: (thongTinMoi: object) => {
        return axios.patch(`/QuanLyNguoiDung/CapNhatMotThongTinNguoiDung`, thongTinMoi);
    },
    capNhatMatKhau: (thongTinMatKhau: { matKhauCurent: string; matKhauNew: string }) => {
        return axios.patch(`/QuanLyNguoiDung/CapNhatMatKhau`, thongTinMatKhau);
    },
};
