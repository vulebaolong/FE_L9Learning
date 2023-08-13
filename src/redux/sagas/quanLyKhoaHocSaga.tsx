import { call, put, takeLatest } from "redux-saga/effects";
import { khoaHocApi } from "../../api/quanLyKhoaHocApi";
import { layDanhSachKhoaHocREDU } from "../slices/quanLyKhoaHocSlice";

// layDanhSachKhoaHocSaga
function* layDanhSachKhoaHocSaga() {
    try {
        const { data, status } = yield call(() => khoaHocApi.layDanhSachKhoaHoc());

        console.log("Saga - layDanhSachKhoaHocSaga", { data, status });

        yield put(layDanhSachKhoaHocREDU(data.result.data));
    } catch (err) {
        console.log(err);
    }
}

// Khai báo Saga Watcher để theo dõi action FETCH_USERS
export function* theoDoiLayDanhSachKhoaHocSaga() {
    yield takeLatest("layDanhSachKhoaHocSaga", layDanhSachKhoaHocSaga);
}