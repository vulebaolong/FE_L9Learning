import { call, delay, put, takeLatest } from "redux-saga/effects";
import { courseApi } from "../../api/courseApi";
import { getCourseListREDU, setUserInfoForCourseREDU } from "../slices/courseManagementSlice";
import { error, success } from "../../helpers/message";
import { navigate } from "../../helpers/navigate";
import { setIsLoadingBtnREDU, setIsLoadingPageREDU } from "../slices/loadingSlice";
import { DELAY_LOADING_PAGE } from "../../contants/configContants";

// getCourseListSaga
function* getCourseListSaga() {
    try {
        yield put(setIsLoadingPageREDU(true));

        const { data, status } = yield call(() => courseApi.getListCourses());

        console.log("Saga - getCourseListSaga", { data, status });

        yield put(getCourseListREDU(data.result.data));

        yield delay(DELAY_LOADING_PAGE);

        yield put(setIsLoadingPageREDU(false));
    } catch (err) {
        console.log(err);

        yield delay(DELAY_LOADING_PAGE);

        yield put(setIsLoadingPageREDU(false));
    }
}

export function* watchGetCourseListSaga() {
    yield takeLatest("getCourseListSaga", getCourseListSaga);
}

// addCourseSaga
function* addCourseSaga({ payload }: { payload: FormData; type: string }) {
    try {
        console.log(payload);

        // console.log(payload.get("courseName"));
        // console.log(payload.get("moTa"));
        // console.log(payload.get("giaTien"));
        // console.log(payload.get("seHocDuoc"));
        // console.log(payload.get("chuongHoc"));
        // console.log(payload.get("hinhAnh"));
        yield put(setIsLoadingBtnREDU(true));

        const { data, status } = yield call(() => courseApi.addCourse(payload));

        console.log("Saga - addCourseSaga", { data, status });

        success("Thêm khoá học thành công");

        navigate("/coursemanagement");
    } catch (err) {
        console.log(err);
        error("Thêm khoá học không thành công");
    } finally {
        yield put(setIsLoadingBtnREDU(false));
    }
}

export function* watchAddCourseSaga() {
    yield takeLatest("addCourseSaga", addCourseSaga);
}

// updateCourseSaga
function* updateCourseSaga({ payload }: { payload: FormData; type: string }) {
    try {
        yield put(setIsLoadingBtnREDU(true));

        console.log(payload);

        // console.log("courseCode ",payload.get("courseCode"));
        // console.log("courseName ",payload.get("courseName"));
        // console.log("moTa ",payload.get("moTa"));
        // console.log("giaTien ",payload.get("giaTien"));
        // console.log("seHocDuoc ",payload.get("seHocDuoc"));
        // console.log("chuongHoc ",payload.get("chuongHoc"));
        // console.log("hinhAnh ",payload.get("hinhAnh"));

        const { data, status } = yield call(() => courseApi.updateCourse(payload));

        console.log("Saga - updateCourseSaga", { data, status });

        success("Cập nhật khoá học thành công");

        navigate("/coursemanagement");
    } catch (err) {
        console.log(err);
        error("Cập nhật khoá học không thành công");
    } finally {
        yield put(setIsLoadingBtnREDU(false));
    }
}

export function* watchUpdateCourseSaga() {
    yield takeLatest("updateCourseSaga", updateCourseSaga);
}

// getUserInfoForCourseSaga
function* getUserInfoForCourseSaga({ payload }: { payload: string; type: string }) {
    try {
        yield put(setIsLoadingPageREDU(true));

        const { data, status } = yield call(() => courseApi.getUserInformationForCourse(payload));

        console.log("Saga - getUserInfoForCourseSaga", { data, status });

        yield put(setUserInfoForCourseREDU(data.result.data));

        yield delay(DELAY_LOADING_PAGE);

        yield put(setIsLoadingPageREDU(false));
    } catch (err) {
        console.log(err);

        yield delay(DELAY_LOADING_PAGE);
        
        yield put(setIsLoadingPageREDU(false));
    } 
}

export function* watchGetUserInfoForCourseSaga() {
    yield takeLatest("getUserInfoForCourseSaga", getUserInfoForCourseSaga);
}
