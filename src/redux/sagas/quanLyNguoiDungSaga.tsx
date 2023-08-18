import { call, put, takeLatest } from "redux-saga/effects";
import { userApi } from "../../api/quanLyNguoiDungApi";
import { I_dangKy, I_dangNhap } from "../../interfaces/I_quanLyNguoiDung";
import { capNhatUserLoginREDU, dangNhapREDU, setAutofillREDU, setIsPageDangNhapREDU } from "../slices/quanLyNguoiDungSlice";
import { error, success } from "../../helpers/message";
import { lcStorage } from "../../helpers/localStorage";
import { ACCESS_TOKEN, USER_LOGIN } from "../../contants/userContants";
import { setIsOpenModalREDU } from "../slices/modalSlice";

// dangNhapSaga
function* dangNhapSaga({ payload }: { payload: I_dangNhap; type: string }) {
    try {
        const { data, status } = yield call(() => userApi.dangNhap(payload));

        console.log("Saga - dangNhapSaga", { data, status });

        yield put(dangNhapREDU(data.result.data));

        //lưu localStorage
        lcStorage.set(USER_LOGIN, data.result.data);

        lcStorage.set(ACCESS_TOKEN, data.result.data.accessToken);

        success(data.result.message);

        yield put(setIsOpenModalREDU(false));
    } catch (err) {
        error(err.response?.data?.result?.message);
    }
}

// Khai báo Saga Watcher để theo dõi action FETCH_USERS
export function* theoDoiDangNhapSaga() {
    yield takeLatest("dangNhapSaga", dangNhapSaga);
}

// dangKySaga
function* dangKySaga({ payload }: { payload: I_dangKy; type: string }) {
    try {
        const { data, status } = yield call(() => userApi.dangKy(payload));

        console.log("Saga - dangKySaga", { data, status });

        success("Đăng ký thành công");

        yield put(setAutofillREDU(payload));

        yield put(setIsPageDangNhapREDU(true));
    } catch (err) {
        console.log(err);
        error(err.response?.data?.result?.message);
    }
}

// Khai báo Saga Watcher để theo dõi action FETCH_USERS
export function* theoDoiDangKySaga() {
    yield takeLatest("dangKySaga", dangKySaga);
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

// Khai báo Saga Watcher để theo dõi action FETCH_USERS
export function* theoDoiCapNhatUserLoginSaga() {
    yield takeLatest("capNhatUserLoginSaga", capNhatUserLoginSaga);
}
