import { call, put, takeLatest } from "redux-saga/effects";
import { loginREDU } from "../slices/userSlice";
import { userApi } from "../../api/quanLyNguoiDungApi";
import { I_dangNhap } from "../../interfaces/I_quanLyNguoiDung";

// dangNhapSaga
function* dangNhapSaga({ payload }: { payload: I_dangNhap; type: string }) {
    try {
        const { data, status } = yield call(() => userApi.dangNhap(payload));
        console.log("Saga - dangNhapSaga", { data, status });
        // yield put(loginREDU(data.content));
    } catch (error) {
        console.log(error);
    }
}

// Khai báo Saga Watcher để theo dõi action FETCH_USERS
export function* theoDoiDangNhapSaga() {
    yield takeLatest("dangNhapSaga", dangNhapSaga);
}
