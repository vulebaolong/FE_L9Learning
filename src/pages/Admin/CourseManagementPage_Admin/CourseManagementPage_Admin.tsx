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

    const handleChinhSuaKhoaHoc = (courseCode: string) => {
        navigate(`/editcourse/${courseCode}`);
    };

    const handleThongTinKhoaHoc = (courseCode: string) => {
        navigate(`/coursetouser/${courseCode}`);
    };

    const handleThemKhoaHoc = () => {
        navigate("/addcourse");
    };

    return (
        <section className="pb-24">
            <div className="flex items-center gap-5 mb-5">
                <h1 className={`heading_1 my-5`}>Quản lý khoá học</h1>
                <Tooltip title="Thêm khoá học">
                    <div className="">
                        <Button onClick={handleThemKhoaHoc} type="circle_2">
                            <FaPlus />
                        </Button>
                    </div>
                </Tooltip>
            </div>

            <div className="collumnCourse">
                {courseList.map((khoaHoc) => {
                    return (
                        <div key={khoaHoc._id}>
                            {/* HÌNH ẢNH */}
                            <div className={`${style.overlay} aspect-[292/165] relative rounded-2xl overflow-hidden`}>
                                <div className={`${style.actionButton} flex flex-col gap-2 items-center`}>
                                    <Button
                                        onClick={() => {
                                            handleThongTinKhoaHoc(khoaHoc._id);
                                        }}
                                        type="white"
                                    >
                                        Thông tin
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            handleChinhSuaKhoaHoc(khoaHoc._id);
                                        }}
                                        type="white"
                                    >
                                        Chỉnh sửa
                                    </Button>
                                    <PopconfirmCourseManagementPage_Admin khoaHoc={khoaHoc} />
                                </div>
                                <img className="w-full h-full object-cover" src={khoaHoc.hinhAnh} alt="" />
                            </div>
                            {/* TÊN KHOÁ HỌC */}
                            <p className="heading_3 mt-3">{khoaHoc.courseName}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
export default CourseManagementPage_Admin;
