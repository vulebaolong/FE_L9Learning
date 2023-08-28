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
        // console.log(payload.get("description"));
        // console.log(payload.get("price"));
        // console.log(payload.get("willLearn"));
        // console.log(payload.get("lessons"));
        // console.log(payload.get("image"));
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
        // console.log("description ",payload.get("description"));
        // console.log("price ",payload.get("price"));
        // console.log("willLearn ",payload.get("willLearn"));
        // console.log("lessons ",payload.get("lessons"));
        // console.log("image ",payload.get("image"));

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
