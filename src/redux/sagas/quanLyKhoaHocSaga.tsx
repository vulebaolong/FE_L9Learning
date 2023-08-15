import { call, put, takeLatest } from "redux-saga/effects";
import { khoaHocApi } from "../../api/quanLyKhoaHocApi";
import { layDanhSachKhoaHocREDU } from "../slices/quanLyKhoaHocSlice";
import { error, success } from "../../helpers/message";

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

export function* theoDoiLayDanhSachKhoaHocSaga() {
    yield takeLatest("layDanhSachKhoaHocSaga", layDanhSachKhoaHocSaga);
}

// layMotKhoaHocSaga
function* layMotKhoaHocSaga({ payload }: { payload: string; type: string }) {
    try {
        const { data, status } = yield call(() => khoaHocApi.layMotKhoaHoc(payload));

        console.log("Saga - layMotKhoaHocSaga", { data, status });

        yield put(layDanhSachKhoaHocREDU(data.result.data));
    } catch (err) {
        console.log(err);
    }
}

export function* theoDoiLayMotKhoaHocSaga() {
    yield takeLatest("layMotKhoaHocSaga", layMotKhoaHocSaga);
}

// themKhoaHocSaga
function* themKhoaHocSaga({ payload }: { payload: FormData; type: string }) {
    try {
        console.log(payload);

        // console.log(payload.get("tenKhoaHoc"));
        // console.log(payload.get("moTa"));
        // console.log(payload.get("giaTien"));
        // console.log(payload.get("seHocDuoc"));
        // console.log(payload.get("chuongHoc"));
        // console.log(payload.get("hinhAnh"));

        const { data, status } = yield call(() => khoaHocApi.themKhoaHoc(payload));

        console.log("Saga - themKhoaHocSaga", { data, status });
    } catch (err) {
        console.log(err);
    }
}

export function* theoDoiThemKhoaHocSaga() {
    yield takeLatest("themKhoaHocSaga", themKhoaHocSaga);
}

// xoaKhoaHocSaga
function* xoaKhoaHocSaga({ payload }: { payload: string; type: string }) {
    try {
        const { data, status } = yield call(() => khoaHocApi.xoaKhoaHoc(payload));

        console.log("Saga - xoaKhoaHocSaga", { data, status });

        success("Xoá khoá học thành công");

        yield call(layDanhSachKhoaHocSaga);
    } catch (err) {
        console.log(err);
        error("Xoá khoá học không thành công");
    }
}

export function* theoDoiXoaKhoaHocSaga() {
    yield takeLatest("xoaKhoaHocSaga", xoaKhoaHocSaga);
}
