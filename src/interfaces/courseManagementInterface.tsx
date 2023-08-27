import { UploadFile } from "antd";
import { RcFile } from "antd/es/upload";

export interface I_video {
    title: string;
    video_url: string;
    duration: string;
}
export interface I_lesson {
    title: string;
    videos: I_video[];
}
export interface I_courseCategory {
    _id: string;
    tenDanhMuc: string;
}
export interface I_singleCourse {
    _id: string;
    courseName: string;
    moTa: string;
    ngayTao: string;
    soLuongHocVien: number;
    luotXem: number;
    giaTien: number;
    seHocDuoc: string[];
    chuongHoc: I_lesson[];
    hinhAnh: string;
    danhMucKhoaHoc_ID: I_courseCategory;
}

export interface I_PropContentCourse {
    khoaHoc: I_singleCourse | undefined;
    totalDuration: string;
}

export interface file {
    file: {
        originFileObj: RcFile;
    };
}

export interface I_courseValues {
    _id: string;
    courseName: string;
    moTa: string;
    ngayTao: string;
    soLuongHocVien: number;
    luotXem: number;
    giaTien: number;
    seHocDuoc: string[];
    chuongHoc: I_lesson[];
    hinhAnh: file;
    danhMucKhoaHoc_ID: I_courseCategory;
}

export interface I_itemSearch {
    _id: string;
    courseName: string;
    hinhAnh: string;
}

export type I_resultSearch = I_itemSearch[] | [];

export interface I_coursesByCategory {
    tenDanhMuc: string;
    khoaHocDanhMuc: I_courseCategoryDetail[];
}

export interface I_courseCategoryDetail {
    _id: string;
    courseName: string;
    hinhAnh: string;
    danhMucKhoaHoc_ID: I_courseCategoryId;
}

export interface I_courseCategoryId {
    _id: string;
    tenDanhMuc: string;
}

export interface I_userInfoForCourse {
    khoaHoc: I_khoaHoc;
    nguoiDungDaDangKy: I_enrolledUsers[];
    nguoiDungChuaDangKy: I_unenrolledUsers[];
}

export interface I_khoaHoc {
    _id: string;
    courseName: string;
    hinhAnh: string;
}

export interface I_enrolledUsers {
    _id: string;
    taiKhoan: string;
    email: string;
    soDt: string;
    hoTen: string;
    avatar: string;
    maLoaiNguoiDung: string;
}

export interface I_unenrolledUsers {
    _id: string;
    taiKhoan: string;
    email: string;
    soDt: string;
    hoTen: string;
    avatar: string;
    maLoaiNguoiDung: string;
}

export interface I_PropsCta {
    title: string;
    desc: string;
    textBtn: string;
}

