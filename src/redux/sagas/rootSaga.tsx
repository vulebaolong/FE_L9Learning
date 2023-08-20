// sagas.ts

import { all } from "redux-saga/effects";
import * as quanLyNguoiDungSaga from "./quanLyNguoiDungSaga";
import * as quanLyKhoaHocSaga from "./quanLyKhoaHocSaga";

export default function* rootSaga() {
    yield all([
        quanLyNguoiDungSaga.theoDoiDangNhapSaga(),
        quanLyNguoiDungSaga.theoDoiDangKySaga(),
        quanLyNguoiDungSaga.theoDoiCapNhatUserLoginSaga(),
        quanLyNguoiDungSaga.theoDoiLayThongTinTaiKhoanSaga(),
        quanLyNguoiDungSaga.theoDoiThemNguoiDungSaga(),
        quanLyNguoiDungSaga.theoDoiLayDanhSachNguoiDungSaga(),
        quanLyKhoaHocSaga.theoDoiLayDanhSachKhoaHocSaga(),
        quanLyKhoaHocSaga.theoDoiLayMotKhoaHocSaga(),
        quanLyKhoaHocSaga.theoDoiThemKhoaHocSaga(),
        quanLyKhoaHocSaga.theoDoiXoaKhoaHocSaga(),
        quanLyKhoaHocSaga.theoDoiCapNhatKhoaHocSaga(),
    ]);
}
