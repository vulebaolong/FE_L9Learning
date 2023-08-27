import { I_singleCourse, I_userInfoForCourse } from "./courseManagementInterface";
import { I_login, I_user, I_courseInfoForUser, I_userInfo, I_userLogin } from "./userManagementInterface";

interface I_courseManagement {
    courseList: I_singleCourse[];
    userInfoForCourse: I_userInfoForCourse | null;
}

interface I_userManagement {
    userLogin: I_userLogin;
    isPageLogin: boolean;
    autofill: I_login | null;
    userList: I_user[];
    userInfo: I_userInfo | null;
    userCourseInfo: I_courseInfoForUser | null;
}

interface I_initialState {
    courseManagementSlice: I_courseManagement;
    userManagementSlice: I_userManagement;
}

export default I_initialState;
