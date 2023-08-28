import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../../redux/store";
import style from "./CourseManagementPage_Admin.module.css";
import Button from "../../../components/Button/Button";
import { navigate } from "../../../helpers/navigate";
import { useEffect } from "react";
import PopconfirmCourseManagementPage_Admin from "./PopconfirmCourseManagementPage_Admin";
import { Tooltip } from "antd";
import { FaPlus } from "react-icons/fa6";

function CourseManagementPage_Admin() {
    const dispatch: DispatchType = useDispatch();

    useEffect(() => {
        dispatch({ type: "getCourseListSaga" });
    }, []);

    const { courseList } = useSelector((state: RootState) => state.courseManagementSlice);

    const handleEditCourse = (courseCode: string) => {
        navigate(`/editcourse/${courseCode}`);
    };

    const handleCourseInfo = (courseCode: string) => {
        navigate(`/coursetouser/${courseCode}`);
    };

    const handleAddCourse = () => {
        navigate("/addcourse");
    };

    return (
        <section className="pb-24">
            <div className="flex items-center gap-5 mb-5">
                <h1 className={`heading_1 my-5`}>Quản lý khoá học</h1>
                <Tooltip title="Thêm khoá học">
                    <div className="">
                        <Button onClick={handleAddCourse} type="circle_2">
                            <FaPlus />
                        </Button>
                    </div>
                </Tooltip>
            </div>

            <div className="collumnCourse">
                {courseList.map((course) => {
                    return (
                        <div key={course._id}>
                            {/* HÌNH ẢNH */}
                            <div className={`${style.overlay} aspect-[292/165] relative rounded-2xl overflow-hidden`}>
                                <div className={`${style.actionButton} flex flex-col gap-2 items-center`}>
                                    <Button
                                        onClick={() => {
                                            handleCourseInfo(course._id);
                                        }}
                                        type="white"
                                    >
                                        Thông tin
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            handleEditCourse(course._id);
                                        }}
                                        type="white"
                                    >
                                        Chỉnh sửa
                                    </Button>
                                    <PopconfirmCourseManagementPage_Admin course={course} />
                                </div>
                                <img className="w-full h-full object-cover" src={course.image} alt="" />
                            </div>
                            {/* TÊN KHOÁ HỌC */}
                            <p className="heading_3 mt-3">{course.courseName}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
export default CourseManagementPage_Admin;
