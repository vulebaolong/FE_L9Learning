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
    id: string;
    taiKhoan: string;
    email: string;
    soDt: string;
    hoTen: string;
    accessToken: string;
    maLoaiNguoiDung: string;
    avatar: string;
}

export interface I_PropDangNhap {
    handleNavigateDangKy: () => void;
}
export interface I_PropDangKy {
    handleNavigateDangNhap: () => void;
}
export interface I_PropLogged {
    userLogin: I_userLogin;
}
