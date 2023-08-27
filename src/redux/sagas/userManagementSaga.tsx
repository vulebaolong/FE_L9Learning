import { call, delay, put, takeLatest } from "redux-saga/effects";
import { userApi } from "../../api/userApi";
import { I_register, I_login } from "../../interfaces/userManagementInterface";
import {
    updateUserLoginREDU,
    loginREDU,
    setAutofillREDU,
    setUserListREDU,
    setIsPageLoginREDU,
    setUserCourseInfoREDU,
    setUserInfoREDU,
} from "../slices/userManagementSlice";
import { error, success } from "../../helpers/message";
import { lcStorage } from "../../helpers/localStorage";
import { ACCESS_TOKEN, USER_LOGIN } from "../../contants/userContants";
import { setIsOpenModalAddUserREDU, setIsOpenModalAuthREDU } from "../slices/modalSlice";
import { setIsLoadingBtnREDU, setIsLoadingPageREDU } from "../slices/loadingSlice";
import { DELAY_LOADING_PAGE } from "../../contants/configContants";

// loginSaga
function* loginSaga({ payload }: { payload: I_login; type: string }) {
    try {
        yield put(setIsLoadingBtnREDU(true));

        const { data, status } = yield call(() => userApi.login(payload));

        console.log("Saga - loginSaga", { data, status });

        yield put(loginREDU(data.result.data));

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

export function* watchLoginSaga() {
    yield takeLatest("loginSaga", loginSaga);
}

// registerSaga
function* registerSaga({ payload }: { payload: I_register; type: string }) {
    try {
        yield put(setIsLoadingBtnREDU(true));

        const { data, status } = yield call(() => userApi.register(payload));

        console.log("Saga - registerSaga", { data, status });

        success("Đăng ký thành công");

        yield put(setAutofillREDU(payload));

        yield put(setIsPageLoginREDU(true));
    } catch (err) {
        console.log(err);
        error(err.response?.data?.result?.message);
    } finally {
        yield put(setIsLoadingBtnREDU(false));
    }
}

export function* watchRegisterSaga() {
    yield takeLatest("registerSaga", registerSaga);
}

// getUserListSaga
function* getUserListSaga() {
    try {
        yield put(setIsLoadingPageREDU(true));

        const { data, status } = yield call(() => userApi.getListUsers());

        console.log("Saga - getUserListSaga", { data, status });

        yield put(setUserListREDU(data.result.data));

        yield delay(DELAY_LOADING_PAGE);

        yield put(setIsLoadingPageREDU(false));
    } catch (err) {
        console.log(err);

        yield delay(DELAY_LOADING_PAGE);

        yield put(setIsLoadingPageREDU(false));
    } 
}

export function* watchGetUserListSaga() {
    yield takeLatest("getUserListSaga", getUserListSaga);
}

// addUserSaga
function* addUserSaga({ payload }: { payload: I_register; type: string }) {
    try {
        yield put(setIsLoadingBtnREDU(true));
        //Thêm người dùng
        const { data: data1, status: status1 } = yield call(() => userApi.register(payload));

        console.log("Saga - addUserSaga", { data1, status1 });

        // Cập nhật lại danh sách người dùng
        const { data: data2, status: status2 } = yield call(() => userApi.getListUsers());

        console.log("Saga - getListUsers", { data2, status2 });

        yield put(setUserListREDU(data2.result.data));

        success("Thêm người dùng thành công");

        yield put(setIsOpenModalAddUserREDU(false));
    } catch (err) {
        console.log(err);
        error("Thêm người dùng không thành công");
    } finally {
        yield put(setIsLoadingBtnREDU(false));
    }
}

export function* watchAddUserSaga() {
    yield takeLatest("addUserSaga", addUserSaga);
}

// updateDisplayAccountSaga
// cập nhật lại giao diện
function* updateDisplayAccountSaga() {
    try {
        const { data, status } = yield call(() => userApi.getAccountInfo());

        console.log("Saga - updateDisplayAccountSaga", { data, status });

        yield put(updateUserLoginREDU(data.result.data));
    } catch (err) {
        console.log(err);
        error(err.response?.data?.result?.message);
    }
}

export function* watchUpdateDisplayAccountSaga() {
    yield takeLatest("updateDisplayAccountSaga", updateDisplayAccountSaga);
}

// getAccountInfoSaga
function* getAccountInfoSaga() {
    try {
        yield put(setIsLoadingPageREDU(true));

        const { data, status } = yield call(() => userApi.getAccountInfo());

        console.log("Saga - getAccountInfoSaga", { data, status });

        yield put(updateUserLoginREDU(data.result.data));

        yield delay(DELAY_LOADING_PAGE);

        yield put(setIsLoadingPageREDU(false));
    } catch (err) {
        console.log(err);
        error(err.response?.data?.result?.message);

        yield delay(DELAY_LOADING_PAGE);

        yield put(setIsLoadingPageREDU(false));
    } 
}

export function* watchGetAccountInfoSaga() {
    yield takeLatest("getAccountInfoSaga", getAccountInfoSaga);
}

// GetUserInfoSaga
function* GetUserInfoSaga({ payload }: { payload: string; type: string }) {
    try {
        yield put(setIsLoadingPageREDU(true));

        const { data, status } = yield call(() => userApi.getUserInfo(payload));

        console.log("Saga - GetUserInfoSaga", { data, status });

        yield put(setUserInfoREDU(data.result.data));

        yield delay(DELAY_LOADING_PAGE);

        yield put(setIsLoadingPageREDU(false));
    } catch (err) {
        console.log(err);

        error(err.response?.data?.result?.message);

        yield delay(DELAY_LOADING_PAGE);

        yield put(setIsLoadingPageREDU(false));
    } 
}

export function* watchGetUserInfoSaga() {
    yield takeLatest("GetUserInfoSaga", GetUserInfoSaga);
}

// updateDisplayUserSaga
// cập nhật lại giao diện
function* updateDisplayUserSaga({ payload }: { payload: string; type: string }) {
    try {
        const { data, status } = yield call(() => userApi.getUserInfo(payload));

        console.log("Saga - updateDisplayUserSaga", { data, status });

        yield put(setUserInfoREDU(data.result.data));
    } catch (err) {
        console.log(err);
        error(err.response?.data?.result?.message);
    }
}

export function* watchUpdateDisplayUserSaga() {
    yield takeLatest("updateDisplayUserSaga", updateDisplayUserSaga);
}
