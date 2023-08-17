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
	updateAccount: (data) => {
		return axios.put(`/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, data);
	},
	updatePassword: (data) => {
		return axios.put(`/QuanLyNguoiDung/CapNhatMatKhau`, data);
	},
};


