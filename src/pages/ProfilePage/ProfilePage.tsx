import { useEffect } from "react";
import { userApi } from "../../api/userApi";
import { I_accountInfo } from "../../interfaces/userManagementInterface";
import { FaUserGroup } from "react-icons/fa6";
import { Popconfirm, Typography } from "antd";
import Button from "../../components/Button/Button";
import style from "./ProfilePage.module.css";
import { navigate } from "../../helpers/navigate";
import { courseApi } from "../../api/courseApi";
import { DispatchType, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { error, success } from "../../helpers/message";
import PopconfirmProfile from "./PopconfirmProfile";

function ProfilePage() {
    const dispatch: DispatchType = useDispatch();

    const { userLogin } = useSelector((state: RootState) => state.userManagementSlice);

    useEffect(() => {
        dispatch({ type: "getAccountInfoSaga" });
    }, []);

    const renderEnrolledCourse = () => {
        const length = userLogin?.enrolledCourseDetail.length;

        if (length === undefined) return;
        if (length > 0)
            return (
                <>
                    Đã đăng ký <strong>{length}</strong> khoá học
                </>
            );
        if (length === 0) return `Chưa đăng ký khoá học`;
    };

    const box = `px-[18px] py-[14px] shadow-[0_0_5px_0_rgba(0,0,0,.1),0_0_1px_0_rgba(0,0,0,.1)] dark:shadow-[0_0_5px_0_rgba(255,255,255,.1),0_0_1px_0_rgba(255,255,255,.1)] rounded-lg space-y-5`;

    const handleContinueLearning = (courseId: string) => {
        navigate(`/detailcourse/${courseId}`);
    };

    return (
        <section className="pb-24">
            <div className="container">
                {/* BANNER */}
                <div className="aspect-[25/7] rounded-b-xl overflow-hidden">
                    <img className="w-full object-cover" src={userLogin?.bannerProfile} alt="" />
                </div>

                {/* BODY */}
                <div className="px-5 space-y-5">
                    {/* INFO */}
                    <div className="relative flex">
                        {/* AVATAR */}
                        <div className="absolute bottom-0 left-0 aspect-square w-32 xl:w-44 border-4 border-white dark:border-slate-900  rounded-full overflow-hidden">
                            <img className="w-full h-full object-cover" src={userLogin?.avatar} alt="" />
                        </div>
                        <div className="w-32 xl:w-44 flex-shrink-0"></div>

                        {/* CHI TIẾT */}
                        <div className="my-5 ml-5 w-full h-10 sm:h-auto">
                            <p className="font-extrabold text-2xl w-1/2 truncate hidden sm:block">{userLogin?.fullName}</p>
                            <p className="w-1/2 truncate hidden sm:block">{renderEnrolledCourse()}</p>
                        </div>
                    </div>

                    {/* CHI TIẾT */}
                    <div className="my-5 w-full sm:hidden">
                        <p className="font-extrabold text-2xl truncate">{userLogin?.fullName}</p>
                        <p className="truncate">{renderEnrolledCourse()}</p>
                    </div>

                    {/* CONTENT */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                        {/* HOẠT ĐỘNG */}
                        <div className="space-y-5">
                            <div className={`${box} space-y-5`}>
                                <h4 className="heading_3">Giới thiệu</h4>
                                <div className="flex items-center gap-2">
                                    <FaUserGroup className="text-xl" />
                                    <p className={`para`}>
                                        Thành viên của <strong>L9 - Học lập trình để đi làm</strong> từ 2 năm trước
                                    </p>
                                </div>
                            </div>
                            <div className={`${box} space-y-5`}>
                                <h4 className="heading_3">Hoạt động gần đây</h4>
                                <div className="flex items-center gap-2">
                                    <p className={`para`}>Chưa có hoạt động gần đây</p>
                                </div>
                            </div>
                        </div>

                        {/* CÁC KHOÁ HỌC ĐÃ THAM GIA */}
                        <div className="">
                            <div className={`${box}`}>
                                <h4 className="heading_3">Các khóa học đã tham gia</h4>
                                <div className="space-y-5">
                                    {userLogin?.enrolledCourseDetail.length === 0 && "Chưa đăng ký khoá học"}
                                    {userLogin?.enrolledCourseDetail.map((course) => {
                                        return (
                                            <div key={course._id} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                {/* HÌNH ẢNH */}
                                                <div className="">
                                                    <div className={`${style.overlay} aspect-[292/165] relative rounded-2xl overflow-hidden`}>
                                                        <div className={`${style.actionButton} flex flex-col gap-2 items-center`}>
                                                            <Button
                                                                onClick={() => {
                                                                    handleContinueLearning(course._id);
                                                                }}
                                                                type="white"
                                                            >
                                                                Tiếp tục học
                                                            </Button>
                                                            <PopconfirmProfile course={course} />
                                                        </div>
                                                        <img className="w-full h-full object-cover" src={course.image} alt="" />
                                                    </div>
                                                    <p className="font-bold truncate sm:hidden">{course.courseName}</p>
                                                </div>

                                                {/* MÔ TẢ */}
                                                <div className="space-y-2 hidden sm:block">
                                                    <p className="heading_3 truncate">{course.courseName}</p>
                                                    <Typography.Paragraph className={`para`} ellipsis={{ rows: 5 }}>
                                                        {course.description}
                                                    </Typography.Paragraph>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default ProfilePage;
