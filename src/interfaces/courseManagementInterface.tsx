import { RcFile } from "antd/es/upload";

export interface I_video {
    title: string;
    video_url: string;
    duration: string;
}
export interface I_lesson {
    title: string;
    videos: I_video[];
}
export interface I_courseCategory {
    _id: string;
    categoryName: string;
}
export interface I_singleCourse {
    _id: string;
    courseName: string;
    description: string;
    price: number;
    willLearn: string[];
    lessons: I_lesson[];
    image: string;
    courseCategory_ID: I_courseCategory;
}

export interface I_PropContentCourse {
    course: I_singleCourse | undefined;
    totalDuration: string;
}

export interface file {
    file: {
        originFileObj: RcFile;
    };
}

export interface I_courseValues {
    _id: string;
    courseName: string;
    description: string;
    price: number;
    willLearn: string[];
    lessons: I_lesson[];
    image: file;
    courseCategory_ID: I_courseCategory;
}

export interface I_itemSearch {
    _id: string;
    courseName: string;
    image: string;
}

export type I_resultSearch = I_itemSearch[] | [];

export interface I_coursesByCategory {
    categoryName: string;
    coursesInCategory: I_courseCategoryDetail[];
}

export interface I_courseCategoryDetail {
    _id: string;
    courseName: string;
    image: string;
    courseCategory_ID: I_courseCategoryId;
}

export interface I_courseCategoryId {
    _id: string;
    categoryName: string;
}

export interface I_userInfoForCourse {
    course: I_course;
    enrolledUsers: I_enrolledUsers[];
    unenrolledUsers: I_unenrolledUsers[];
}

export interface I_course {
    _id: string;
    courseName: string;
    image: string;
}

export interface I_enrolledUsers {
    _id: string;
    username: string;
    email: string;
    phoneNumber: string;
    fullName: string;
    avatar: string;
    userType: string;
}

export interface I_unenrolledUsers {
    _id: string;
    username: string;
    email: string;
    phoneNumber: string;
    fullName: string;
    avatar: string;
    userType: string;
}

export interface I_PropsCta {
    title: string;
    desc: string;
    textBtn: string;
}

