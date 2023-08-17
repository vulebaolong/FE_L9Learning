// sagas.ts

import { all } from "redux-saga/effects";
import * as quanLyNguoiDungSaga from "./quanLyNguoiDungSaga";
import * as quanLyKhoaHocSaga from "./quanLyKhoaHocSaga";

export default function* rootSaga() {
    yield all([
        quanLyNguoiDungSaga.theoDoiDangNhapSaga(),
        quanLyNguoiDungSaga.theoDoiDangKySaga(),
        quanLyKhoaHocSaga.theoDoiLayDanhSachKhoaHocSaga(),
        quanLyKhoaHocSaga.theoDoiLayMotKhoaHocSaga(),
        quanLyKhoaHocSaga.theoDoiThemKhoaHocSaga(),
        quanLyKhoaHocSaga.theoDoiXoaKhoaHocSaga(),
        quanLyKhoaHocSaga.theoDoiCapNhatKhoaHocSaga(),
    ]);
}
