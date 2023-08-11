import axios from "axios";
import { I_dangNhap } from "../redux/sagas/quanLyNguoiDung";

export const userApi = {
	dangNhap: (data: I_dangNhap) => {
		return axios.post(`/QuanLyNguoiDung/DangNhap`, data);
	},
	dangKy: (data) => {
		return axios.post(`/QuanLyNguoiDung/DangKy`, data);
	},
	getInfoAccount: () => {
		return axios.get(`/QuanLyNguoiDung/ThongTinTaiKhoan`);
	},
	getInfoTicket: () => {
		return axios.get(`/QuanLyNguoiDung/ThongTinDatVe`);
	},
	updateAccount: (data) => {
		return axios.put(`/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, data);
	},
	updatePassword: (data) => {
		return axios.put(`/QuanLyNguoiDung/CapNhatMatKhau`, data);
	},
};


