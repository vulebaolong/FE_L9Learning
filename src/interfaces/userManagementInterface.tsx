import { AxiosResponse } from "axios";

export interface I_login {
    username: string;
    password: string;
}

export interface I_register {
    fullName: string;
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
}

export interface I_userLogin {
    enrolledCourseDetail: I_enrolledCourseDetails[];
    id: string;
    username: string;
    email: string;
    phoneNumber: string;
    fullName: string;
    accessToken: string;
    userType: string;
    avatar: string;
    bannerProfile: string;
}

export interface I_PropLogged {
    userLogin: I_userLogin;
}

export interface I_accountInfo {
    enrolledCourseDetail: I_enrolledCourseDetails[];
    id: string;
    username: string;
    email: string;
    phoneNumber: string;
    fullName: string;
    userType: string;
    avatar: string;
    bannerProfile: string;
}

export interface I_enrolledCourseDetails {
    _id: string;
    courseName: string;
    description: string;
    image: string;
}

export interface I_componentDisabled {
    fullName: boolean;
    email: boolean;
}

export interface I_user {
    _id: string;
    username: string;
    email: string;
    phoneNumber: string;
    fullName: string;
    userType: string;
    avatar: string;
    bannerProfile: string;
    avatarName?: string;
}

export interface DataType {
    key: string;
    ordinalNumber: number;
    fullName: string;
    username: string;
    userType: string;
    phoneNumber: string;
    email: string;
    avatar: string;
}

export interface I_PropsFormEdit {
    userLogin: I_userLogin | I_userInfo;
    api?: (newInfo: object) => Promise<AxiosResponse<object, object>>;
    apiAvatar?: (avatar: FormData) => Promise<AxiosResponse<object, object>>;
    logApi: string;
    userId?: string;
}

export interface I_userInfo {
    _id: string;
    username: string;
    email: string;
    phoneNumber: string;
    fullName: string;
    userType: string;
    avatar: string;
    bannerProfile: string;
}

export interface I_courseInfoForUser {
    userInfo: I_userInfo;
    enrolledCourse: I_enrolledCourses[];
    unenrolledCourse: I_unenrolledCourses[];
}

export interface I_enrolledCourses {
    _id: string;
    courseName: string;
    image: string;
}

export interface I_unenrolledCourses {
    _id: string;
    courseName: string;
    image: string;
}


