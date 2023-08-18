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
