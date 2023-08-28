import { useEffect, useState } from "react";
import { DispatchType, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "../../../components/Button/Button";
import style from "./InfoUserToCoursePage_Admin.module.css";
import { userApi } from "../../../api/userApi";
import { I_courseInfoForUser } from "../../../interfaces/userManagementInterface";
import { wait } from "../../../helpers/awaitHelper";
import { DELAY_LOADING_PAGE } from "../../../contants/configContants";
import { setIsLoadingBtnREDU, setIsLoadingPageREDU } from "../../../redux/slices/loadingSlice";
import { LoadingOutlined } from "@ant-design/icons";
import { error, success } from "../../../helpers/message";
import SkeletonCourses from "../../../components/Skeleton/SkeletonCourses";
import { Avatar } from "antd";

function InfoUserToCoursePage_Admin() {
    const dispatch: DispatchType = useDispatch();

    const [userCourseInfo, setThongTinKhoaHocNguoiDung] = useState<I_courseInfoForUser | null>(null);

    const { isLoadingBtn } = useSelector((state: RootState) => state.loadingSlice);

    const [isSkeleton, setIsSkeleton] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        const fetch = async () => {
            if (id !== undefined) {
                try {
                    dispatch(setIsLoadingPageREDU(true));

                    const { data, status } = await userApi.getCoursesInfoForUsser(id);

                    console.log("Call Api - getCoursesInfoForUsser", { data, status });

                    setThongTinKhoaHocNguoiDung(data.result.data);

                    await wait(DELAY_LOADING_PAGE);

                    dispatch(setIsLoadingPageREDU(false));
                } catch (err) {
                    console.log(err);

                    await wait(DELAY_LOADING_PAGE);
                    
                    dispatch(setIsLoadingPageREDU(false));
                }
            }
        };
        fetch();
    }, [id, dispatch]);

    const handleUnenrollUser = async (courseId: string) => {
        if (id === undefined) return;

        const payload = {
            userId: id,
            courseId,
        };
        try {
            dispatch(setIsLoadingBtnREDU(true));

            const { data: data1, status: status1 } = await userApi.cancelCourseEnrollmentForUser(payload);

            console.log("Call Api - enrollCourseForUser", { data1, status1 });

            success("Huỷ đăng ký khoá học cho người dùng thành công");

            // Cập nhật lại giao diện
            setIsSkeleton(true);
            const { data: data2, status: status2 } = await userApi.getCoursesInfoForUsser(id);

            console.log("Call Api - getCoursesInfoForUsser", { data2, status2 });

            setThongTinKhoaHocNguoiDung(data2.result.data);
        } catch (err) {
            console.log(err);
            error("Huỷ đăng ký khoá học cho người dùng không thành công");
        } finally {
            await wait(DELAY_LOADING_PAGE);
            dispatch(setIsLoadingBtnREDU(false));
            setIsSkeleton(false);
        }
    };

    const handleEnrollUser = async (courseId: string) => {
        if (id === undefined) return;

        const payload = {
            userId: id,
            courseId,
        };
        try {
            dispatch(setIsLoadingBtnREDU(true));

            const { data: data1, status: status1 } = await userApi.enrollCourseForUser(payload);

            console.log("Call Api - enrollCourseForUser", { data1, status1 });

            success("Đăng ký khoá học cho người dùng thành công");

            // Cập nhật lại giao diện
            setIsSkeleton(true);
            const { data: data2, status: status2 } = await userApi.getCoursesInfoForUsser(id);

            console.log("Call Api - getCoursesInfoForUsser", { data2, status2 });

            setThongTinKhoaHocNguoiDung(data2.result.data);
        } catch (err) {
            console.log(err);
            error("Đăng ký khoá học cho người dùng không thành công");
        } finally {
            await wait(DELAY_LOADING_PAGE);
            dispatch(setIsLoadingBtnREDU(false));
            setIsSkeleton(false);
        }
    };

    const renderEnrolledCourses = () => {
        if (isSkeleton === true) return <SkeletonCourses />;

        if (isSkeleton === false) {

            if (userCourseInfo?.enrolledCourse.length === 0) return <p>Không có khoá học</p>;

            return userCourseInfo?.enrolledCourse.map((course) => {

                return (
                    <div key={course._id}>
                        <div className={`${style.overlay} aspect-[292/165] relative rounded-2xl overflow-hidden`}>
                            <Button
                                onClick={() => {
                                    handleUnenrollUser(course._id);
                                }}
                                type="white"
                                disabled={isLoadingBtn}
                            >
                                <div className="flex items-center gap-2">
                                    {isLoadingBtn && <LoadingOutlined />}
                                    <span>Huỷ đăng ký</span>
                                </div>
                            </Button>
                            <img className="w-full h-full object-cover" src={course.image} alt="" />
                        </div>
                        <p className="heading_3 mt-3">{course.courseName}</p>
                    </div>
                );
            });
        }
    };

    const renderUnenrolledCourses = () => {
        if (isSkeleton === true) return <SkeletonCourses />;

        if (isSkeleton === false) {

            if (userCourseInfo?.unenrolledCourse.length === 0) return <p>Không có khoá học</p>;
            
            return userCourseInfo?.unenrolledCourse.map((course) => {
                return (
                    <div key={course._id} className="">
                        <div className={`${style.overlay} aspect-[292/165] relative rounded-2xl overflow-hidden`}>
                            <Button
                                onClick={() => {
                                    handleEnrollUser(course._id);
                                }}
                                type="white"
                            >
                                Đăng ký
                            </Button>
                            <img className="w-full h-full object-cover" src={course.image} alt="" />
                        </div>
                        <p className="heading_3 mt-3">{course.courseName}</p>
                    </div>
                );
            });
        }
    };
    
    return (
        <section className="pb-24">
            <div className="space-y-20">
                <div>
                    <h1 className="heading_1 pt-5">Thông tin khoá học của người dùng</h1>
                    <div className="flex items-center gap-2  mt-5">
                        <Avatar src={<img src={userCourseInfo?.userInfo.avatar} alt="avatar" />} size={60} />
                        <p className="w-1/2 truncate text-2xl font-black text-[#292929]/70 dark:text-slate-400">{userCourseInfo?.userInfo.fullName}</p>
                    </div>
                    <hr className="dark:!border-gray-700 border-gray-200 mt-3 mb-5" />
                </div>

                <div>
                    <h2 className="heading_2">Khoá học đã đăng ký</h2>
                    <div className="collumnCourse">{renderEnrolledCourses()}</div>
                </div>

                <div>
                    <h2 className="heading_2">Khoá học chưa đăng ký</h2>
                    <div className="collumnCourse">{renderUnenrolledCourses()}</div>
                </div>
            </div>
        </section>
    );
}
export default InfoUserToCoursePage_Admin;
