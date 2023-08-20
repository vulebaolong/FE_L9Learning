import { call, delay, put, takeLatest } from "redux-saga/effects";
import { khoaHocApi } from "../../api/quanLyKhoaHocApi";
import { layDanhSachKhoaHocREDU } from "../slices/quanLyKhoaHocSlice";
import { error, success } from "../../helpers/message";
import { navigate } from "../../helpers/navigate";
import { setIsLoadingBtnREDU, setIsLoadingPageREDU } from "../slices/loadingSlice";
import { DELAY_LOADING_PAGE } from "../../contants/configContants";

// layDanhSachKhoaHocSaga
function* layDanhSachKhoaHocSaga() {
    try {
        yield put(setIsLoadingPageREDU(true));

        const { data, status } = yield call(() => khoaHocApi.layDanhSachKhoaHoc());

        console.log("Saga - layDanhSachKhoaHocSaga", { data, status });

        yield put(layDanhSachKhoaHocREDU(data.result.data));
    } catch (err) {
        console.log(err);
    } finally {
        yield delay(DELAY_LOADING_PAGE)
        yield put(setIsLoadingPageREDU(false));
    }
}

export function* theoDoiLayDanhSachKhoaHocSaga() {
    yield takeLatest("layDanhSachKhoaHocSaga", layDanhSachKhoaHocSaga);
}

// layMotKhoaHocSaga
function* layMotKhoaHocSaga({ payload }: { payload: string; type: string }) {
    try {
        yield put(setIsLoadingPageREDU(true));

        const { data, status } = yield call(() => khoaHocApi.layMotKhoaHoc(payload));

        console.log("Saga - layMotKhoaHocSaga", { data, status });

        // yield put(layDanhSachKhoaHocREDU(data.result.data));
    } catch (err) {
        console.log(err);
    } finally {
        yield delay(DELAY_LOADING_PAGE)
        yield put(setIsLoadingPageREDU(false));
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
        yield put(setIsLoadingBtnREDU(true));

        const { data, status } = yield call(() => khoaHocApi.themKhoaHoc(payload));

        console.log("Saga - themKhoaHocSaga", { data, status });

        success("Thêm khoá học thành công");

        navigate("/listcourse");
    } catch (err) {
        console.log(err);
        error("Thêm khoá học không thành công");
    } finally {
        yield put(setIsLoadingBtnREDU(false));
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

// capNhatKhoaHocSaga
function* capNhatKhoaHocSaga({ payload }: { payload: FormData; type: string }) {
    try {
        yield put(setIsLoadingBtnREDU(true));

        console.log(payload);

        // console.log("maKhoaHoc ",payload.get("maKhoaHoc"));
        // console.log("tenKhoaHoc ",payload.get("tenKhoaHoc"));
        // console.log("moTa ",payload.get("moTa"));
        // console.log("giaTien ",payload.get("giaTien"));
        // console.log("seHocDuoc ",payload.get("seHocDuoc"));
        // console.log("chuongHoc ",payload.get("chuongHoc"));
        // console.log("hinhAnh ",payload.get("hinhAnh"));

        const { data, status } = yield call(() => khoaHocApi.capNhatKhoaHoc(payload));

        console.log("Saga - capNhatKhoaHocSaga", { data, status });

        success("Cập nhật khoá học thành công");
    } catch (err) {
        console.log(err);
        error("Cập nhật khoá học không thành công");
    } finally {
        yield put(setIsLoadingBtnREDU(false));
    }
}

export function* theoDoiCapNhatKhoaHocSaga() {
    yield takeLatest("capNhatKhoaHocSaga", capNhatKhoaHocSaga);
}
