import { call, delay, put, takeLatest } from "redux-saga/effects";
import { userApi } from "../../api/quanLyNguoiDungApi";
import { I_dangKy, I_dangNhap } from "../../interfaces/I_quanLyNguoiDung";
import { capNhatUserLoginREDU, dangNhapREDU, setAutofillREDU, setDanhSachNguoiDungREDU, setIsPageDangNhapREDU, setThongTinNguoiDungREDU } from "../slices/quanLyNguoiDungSlice";
import { error, success } from "../../helpers/message";
import { lcStorage } from "../../helpers/localStorage";
import { ACCESS_TOKEN, USER_LOGIN } from "../../contants/userContants";
import { setIsOpenModalAddUserREDU, setIsOpenModalAuthREDU } from "../slices/modalSlice";
import { setIsLoadingBtnREDU, setIsLoadingPageREDU } from "../slices/loadingSlice";
import { DELAY_LOADING_PAGE } from "../../contants/configContants";

// dangNhapSaga
function* dangNhapSaga({ payload }: { payload: I_dangNhap; type: string }) {
    try {
        yield put(setIsLoadingBtnREDU(true));

        const { data, status } = yield call(() => userApi.dangNhap(payload));

        console.log("Saga - dangNhapSaga", { data, status });

        yield put(dangNhapREDU(data.result.data));

        //lưu localStorage
        lcStorage.set(USER_LOGIN, data.result.data);

        lcStorage.set(ACCESS_TOKEN, data.result.data.accessToken);

        success(data.result.message);

        yield put(setIsOpenModalAuthREDU(false));
    } catch (err) {
        error(err.response?.data?.result?.message);
    } finally {
        yield put(setIsLoadingBtnREDU(false));
    }
}

export function* theoDoiDangNhapSaga() {
    yield takeLatest("dangNhapSaga", dangNhapSaga);
}

// dangKySaga
function* dangKySaga({ payload }: { payload: I_dangKy; type: string }) {
    try {
        yield put(setIsLoadingBtnREDU(true));

        const { data, status } = yield call(() => userApi.dangKy(payload));

        console.log("Saga - dangKySaga", { data, status });

        success("Đăng ký thành công");

        yield put(setAutofillREDU(payload));

        yield put(setIsPageDangNhapREDU(true));
    } catch (err) {
        console.log(err);
        error(err.response?.data?.result?.message);
    } finally {
        yield put(setIsLoadingBtnREDU(false));
    }
}

export function* theoDoiDangKySaga() {
    yield takeLatest("dangKySaga", dangKySaga);
}

// layDanhSachNguoiDungSaga
function* layDanhSachNguoiDungSaga() {
    try {
        yield put(setIsLoadingPageREDU(true));

        const { data, status } = yield call(() => userApi.layDanhSachNguoiDung());

        console.log("Saga - layDanhSachNguoiDungSaga", { data, status });

        yield put(setDanhSachNguoiDungREDU(data.result.data));
    } catch (err) {
        console.log(err);
    } finally {
        yield delay(DELAY_LOADING_PAGE);
        yield put(setIsLoadingPageREDU(false));
    }
}

export function* theoDoiLayDanhSachNguoiDungSaga() {
    yield takeLatest("layDanhSachNguoiDungSaga", layDanhSachNguoiDungSaga);
}

// themNguoiDungSaga
function* themNguoiDungSaga({ payload }: { payload: I_dangKy; type: string }) {
    try {
        yield put(setIsLoadingBtnREDU(true));
        //Thêm người dùng
        const { data: data1, status: status1 } = yield call(() => userApi.dangKy(payload));

        console.log("Saga - themNguoiDungSaga", { data1, status1 });

        // Cập nhật lại danh sách người dùng
        const { data: data2, status: status2 } = yield call(() => userApi.layDanhSachNguoiDung());

        console.log("Saga - layDanhSachNguoiDung", { data2, status2 });

        yield put(setDanhSachNguoiDungREDU(data2.result.data));

        success("Thêm người dùng thành công");

        yield put(setIsOpenModalAddUserREDU(false));
    } catch (err) {
        console.log(err);
        error("Thêm người dùng không thành công");
    } finally {
        yield put(setIsLoadingBtnREDU(false));
    }
}

export function* theoDoiThemNguoiDungSaga() {
    yield takeLatest("themNguoiDungSaga", themNguoiDungSaga);
}

// capNhatUserLoginSaga
function* capNhatUserLoginSaga() {
    try {
        const { data, status } = yield call(() => userApi.layThongTinTaiKhoan());

        console.log("Saga - capNhatUserLoginSaga", { data, status });

        yield put(capNhatUserLoginREDU(data.result.data));
    } catch (err) {
        console.log(err);
        error(err.response?.data?.result?.message);
    }
}

export function* theoDoiCapNhatUserLoginSaga() {
    yield takeLatest("capNhatUserLoginSaga", capNhatUserLoginSaga);
}

// layThongTinTaiKhoanSaga
function* layThongTinTaiKhoanSaga() {
    try {
        yield put(setIsLoadingPageREDU(true));

        const { data, status } = yield call(() => userApi.layThongTinTaiKhoan());

        console.log("Saga - layThongTinTaiKhoanSaga", { data, status });

        yield put(capNhatUserLoginREDU(data.result.data));
    } catch (err) {
        console.log(err);
        error(err.response?.data?.result?.message);
    } finally {
        yield delay(DELAY_LOADING_PAGE);
        yield put(setIsLoadingPageREDU(false));
    }
}

export function* theoDoiLayThongTinTaiKhoanSaga() {
    yield takeLatest("layThongTinTaiKhoanSaga", layThongTinTaiKhoanSaga);
}

// layThongTinNguoiDungSaga
function* layThongTinNguoiDungSaga({ payload }: { payload: string; type: string }) {
    try {
        yield put(setIsLoadingPageREDU(true));

        const { data, status } = yield call(() => userApi.layThongTinNguoiDung(payload));

        console.log("Saga - layThongTinNguoiDungSaga", { data, status });

        yield put(setThongTinNguoiDungREDU(data.result.data));
    } catch (err) {
        console.log(err);
        error(err.response?.data?.result?.message);
    } finally {
        yield delay(DELAY_LOADING_PAGE);
        yield put(setIsLoadingPageREDU(false));
    }
}

export function* theoDoiLayThongTinNguoiDungSaga() {
    yield takeLatest("layThongTinNguoiDungSaga", layThongTinNguoiDungSaga);
}

// capNhatThongTinNguoiDungSaga
function* capNhatThongTinNguoiDungSaga({ payload }: { payload: string; type: string }) {
    try {
        const { data, status } = yield call(() => userApi.layThongTinNguoiDung(payload));

        console.log("Saga - capNhatThongTinNguoiDungSaga", { data, status });

        yield put(setThongTinNguoiDungREDU(data.result.data));
    } catch (err) {
        console.log(err);
        error(err.response?.data?.result?.message);
    }
}

export function* theoDoiCapNhatThongTinNguoiDungSaga() {
    yield takeLatest("capNhatThongTinNguoiDungSaga", capNhatThongTinNguoiDungSaga);
}
