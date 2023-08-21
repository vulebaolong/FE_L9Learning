import { AxiosResponse } from "axios";

export interface I_dangNhap {
    taiKhoan: string;
    matKhau: string;
}

export interface I_dangKy {
    hoTen: string;
    taiKhoan: string;
    matKhau: string;
    email: string;
    soDt: string;
}

export interface I_userLogin {
    chiTietKhoaHocGhiDanh: I_chiTietKhoaHocGhiDanh[];
    id: string;
    taiKhoan: string;
    email: string;
    soDt: string;
    hoTen: string;
    accessToken: string;
    maLoaiNguoiDung: string;
    avatar: string;
    bannerProfile: string;
}

export interface I_PropLogged {
    userLogin: I_userLogin;
}

export interface I_thongTinTaiKhoan {
    chiTietKhoaHocGhiDanh: I_chiTietKhoaHocGhiDanh[];
    id: string;
    taiKhoan: string;
    email: string;
    soDt: string;
    hoTen: string;
    maLoaiNguoiDung: string;
    avatar: string;
    bannerProfile: string;
}

export interface I_chiTietKhoaHocGhiDanh {
    _id: string;
    tenKhoaHoc: string;
    moTa: string;
    hinhAnh: string;
}

export interface I_componentDisabled {
    hoTen: boolean;
    email: boolean;
}

export interface I_nguoiDung {
    _id: string;
    taiKhoan: string;
    email: string;
    soDt: string;
    hoTen: string;
    maLoaiNguoiDung: string;
    avatar: string;
    bannerProfile: string;
    tenAvatar?: string;
}

export interface DataType {
    key: string;
    soThuTu: number;
    hoTen: string;
    taiKhoan: string;
    maLoaiNguoiDung: string;
    soDt: string;
    email: string;
    avatar: string;
}

export interface I_PropsFormEdit {
    userLogin: I_userLogin | I_thongTinNguoiDung;
    api?: (thongTinMoi: object) => Promise<AxiosResponse<object, object>>;
    apiAvatar?: (avatar: FormData) => Promise<AxiosResponse<object, object>>;
    logApi: string;
    idNguoiDung?: string;
}

export interface I_thongTinNguoiDung {
    _id: string;
    taiKhoan: string;
    email: string;
    soDt: string;
    hoTen: string;
    maLoaiNguoiDung: string;
    avatar: string;
    bannerProfile: string;
}
