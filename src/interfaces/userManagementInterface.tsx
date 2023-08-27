import { AxiosResponse } from "axios";

export interface I_login {
    taiKhoan: string;
    matKhau: string;
}

export interface I_register {
    hoTen: string;
    taiKhoan: string;
    matKhau: string;
    email: string;
    soDt: string;
}

export interface I_userLogin {
    chiTietKhoaHocGhiDanh: I_enrolledCourseDetails[];
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

export interface I_accountInfo {
    chiTietKhoaHocGhiDanh: I_enrolledCourseDetails[];
    id: string;
    taiKhoan: string;
    email: string;
    soDt: string;
    hoTen: string;
    maLoaiNguoiDung: string;
    avatar: string;
    bannerProfile: string;
}

export interface I_enrolledCourseDetails {
    _id: string;
    courseName: string;
    moTa: string;
    hinhAnh: string;
}

export interface I_componentDisabled {
    hoTen: boolean;
    email: boolean;
}

export interface I_user {
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
    userLogin: I_userLogin | I_userInfo;
    api?: (newInfo: object) => Promise<AxiosResponse<object, object>>;
    apiAvatar?: (avatar: FormData) => Promise<AxiosResponse<object, object>>;
    logApi: string;
    userId?: string;
}

export interface I_userInfo {
    _id: string;
    taiKhoan: string;
    email: string;
    soDt: string;
    hoTen: string;
    maLoaiNguoiDung: string;
    avatar: string;
    bannerProfile: string;
}

export interface I_courseInfoForUser {
    nguoiDung: I_userInfo;
    khoaHocDaDangKy: I_enrolledCourses[];
    khoaHocChuaDangKy: I_unenrolledCourses[];
}

export interface I_enrolledCourses {
    _id: string;
    courseName: string;
    hinhAnh: string;
}

export interface I_unenrolledCourses {
    _id: string;
    courseName: string;
    hinhAnh: string;
}


