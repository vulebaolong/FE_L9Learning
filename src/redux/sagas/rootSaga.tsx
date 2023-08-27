// sagas.ts

import { all } from "redux-saga/effects";
import * as userManagementSaga  from "./userManagementSaga";
import * as courseManagementSaga  from "./courseManagementSaga";

export default function* rootSaga() {
    yield all([
        userManagementSaga .watchLoginSaga(),
        userManagementSaga .watchRegisterSaga(),
        userManagementSaga .watchUpdateDisplayAccountSaga(),
        userManagementSaga .watchGetAccountInfoSaga(),
        userManagementSaga .watchGetUserInfoSaga(),
        userManagementSaga .watchUpdateDisplayUserSaga(),
        userManagementSaga .watchAddUserSaga(),
        userManagementSaga .watchGetUserListSaga(),

        courseManagementSaga .watchGetCourseListSaga(),
        courseManagementSaga .watchAddCourseSaga(),
        courseManagementSaga .watchUpdateCourseSaga(),
        courseManagementSaga .watchGetUserInfoForCourseSaga(),
    ]);
}
