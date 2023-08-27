import axios, { AxiosResponse } from "axios";
import { I_register, I_login } from "../interfaces/userManagementInterface";

/**
 * getAccountInfo
 * updateOneAccountInfo
 * => dành cho TÀI KHOẢN ĐANG ĐĂNG NHẬP
 *
 * getListUsers
 * getUserInfo
 * updateOneUserInfo
 * deleteUser
 * => dành cho ADMIN QUẢN LÝ NGƯỜI DÙNG
 */

export const userApi = {
    login: (data: I_login) => {
        return axios.post(`/UserManagement/Login`, data);
    },
    register: (data: I_register) => {
        return axios.post(`/UserManagement/Register`, data);
    },

    // ACCCOUNT
    getAccountInfo: () => {
        return axios.get(`/UserManagement/GetAccountInfo`);
    },
    updateOneAccountInfo: (newInfo: object) => {
        return axios.patch(`/UserManagement/UpdateOneAccountInfo`, newInfo);
    },
    updatePassword: (passwordInfo: { currentPassword: string; newPassword: string }) => {
        return axios.patch(`/UserManagement/UpdatePassword`, passwordInfo);
    },
    updateAccountAvatar: (avatar: FormData) => {
        return axios.patch(`/UserManagement/UpdateAccountAvatar`, avatar);
    },

    // USER
    updateUserAvatar: (avatar: FormData) => {
        return axios.patch(`/UserManagement/UpdateUserAvatar`, avatar);
    },
    getListUsers: () => {
        return axios.get(`/UserManagement/GetListUsers`);
    },
    getUserInfo: (userId: string) => {
        return axios.get(`/UserManagement/GetUserInfo?userId=${userId}`);
    },
    updateOneUserInfo: (newInfo: object) => {
        return axios.patch(`/UserManagement/UpdateOneUserInfo`, newInfo);
    },
    deleteUser: (userId: string) => {
        return axios.delete(`/UserManagement/DeleteUser?userId=${userId}`);
    },
    getCoursesInfoForUsser: (userId: string) => {
        return axios.get(`/UserManagement/GetCoursesInfoForUsser?userId=${userId}`);
    },
    cancelCourseEnrollmentForUser: ({ userId, courseId }: { userId: string; courseId: string }) => {
        return axios.post(`/UserManagement/CancelCourseEnrollmentForUser`, { userId, courseId });
    },
    enrollCourseForUser: ({ userId, courseId }: { userId: string; courseId: string }) => {
        return axios.post(`/UserManagement/EnrollCourseForUser`, { userId, courseId });
    },
};
