// sagas.ts

import { all } from "redux-saga/effects";
import * as quanLyNguoiDungSaga from "./quanLyNguoiDungSaga";

export default function* rootSaga() {
    yield all([quanLyNguoiDungSaga.theoDoiDangNhapSaga(), quanLyNguoiDungSaga.theoDoiDangKySaga()]);
}
