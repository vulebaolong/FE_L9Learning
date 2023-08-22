import { I_motKhoaHoc, I_thongTinNguoiDungChoKhoaHoc } from "./I_quanLyKhoaHoc";
import { I_dangNhap, I_nguoiDung, I_thongTinKhoaHocNguoiDung, I_thongTinNguoiDung, I_userLogin } from "./I_quanLyNguoiDung";

interface I_quanLyKhoaHoc {
    danhSachKhoaHoc: I_motKhoaHoc[];
    thongTinNguoiDungChoKhoaHoc: I_thongTinNguoiDungChoKhoaHoc | null;
}

interface I_quanLyNguoiDung {
    userLogin: I_userLogin;
    isPageDangNhap: boolean;
    autofill: I_dangNhap | null;
    danhSachNguoiDung: I_nguoiDung[];
    thongTinNguoiDung: I_thongTinNguoiDung | null;
    thongTinKhoaHocNguoiDung: I_thongTinKhoaHocNguoiDung | null;
}

interface I_initialState {
    quanLyKhoaHocSlice: I_quanLyKhoaHoc;
    quanLyNguoiDungSlice: I_quanLyNguoiDung;
}

export default I_initialState;
