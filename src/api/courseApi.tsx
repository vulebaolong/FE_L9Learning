import axios from "axios";

export const courseApi = {
    getListCourses: () => {
        return axios.get(`/CourseManagement/GetListCourses`);
    },
    searchCourseByName: (courseName: string) => {
        return axios.get(`/CourseManagement/GetListCourses?courseName=${courseName}`);
    },
    getCourseById: (id: string) => {
        return axios.get(`/CourseManagement/GetCourseById?id=${id}`);
    },
    addCourse: (course: FormData) => {
        return axios.post(`/CourseManagement/AddCourse`, course);
    },
    updateCourse: (course: FormData) => {
        return axios.put(`/CourseManagement/UpdateCourse`, course);
    },
    deleteCourse: (courseCode: string) => {
        return axios.delete(`/CourseManagement/DeleteCourse?courseCode=${courseCode}`);
    },
    getListCourseCategories: () => {
        return axios.get(`/CourseManagement/GetListCourseCategories`);
    },
    enrollCourse: (courseCode: { courseCode: string }) => {
        return axios.post(`/CourseManagement/EnrollCourse`, courseCode);
    },
    cancelEnrollment: (courseCode: { courseCode: string }) => {
        return axios.post(`/CourseManagement/CancelEnrollment`, courseCode);
    },
    getCourseByCategory: (courseCode?: string) => {
        let url = "/CourseManagement/GetCourseByCategory";
        if (courseCode) {
            url += `?courseCategoryCode=${courseCode}`;
        }
        return axios.get(url);
    },
    getUserInformationForCourse: (courseId: string) => {
        return axios.get(`/CourseManagement/GetUserInformationForCourse?courseId=${courseId}`);
    },
    cancelUserEnrollmentForCourse: ({ userId, courseId }: { userId: string; courseId: string }) => {
        return axios.post(`/CourseManagement/CancelUserEnrollmentForCourse`, { userId, courseId });
    },
    enrollUserForCourse: ({ userId, courseId }: { userId: string; courseId: string }) => {
        return axios.post(`/CourseManagement/EnrollUserForCourse`, { userId, courseId });
    },
};
