import { useEffect } from "react";
import { DispatchType, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import style from "./Course.module.css";
import Button from "../../../components/Button/Button";
import { navigate } from "../../../helpers/navigate";

function Course() {
    const dispatch: DispatchType = useDispatch();

    const { courseList } = useSelector((state: RootState) => state.courseManagementSlice);

    useEffect(() => {
        dispatch({ type: "getCourseListSaga" });
    }, []);

    const handleChiTietKhoaHoc = (courseId: string) => {
        navigate(`/detailcourse/${courseId}`);
    };
    return (
        <section className="py-24">
            <h2 className="heading_2">Tất cả khoá học</h2>
            <div className="collumnCourse">
                {courseList.map((course) => {
                    return (
                        <div key={course._id} className="">
                            <div className={`${style.overlay} aspect-[292/165] relative rounded-2xl overflow-hidden`}>
                                <Button
                                    onClick={() => {
                                        handleChiTietKhoaHoc(course._id);
                                    }}
                                    type="white"
                                >
                                    Xem khoá học
                                </Button>
                                <img className="w-full h-full object-cover" src={course.image} alt="" />
                            </div>
                            <p className="heading_3 mt-3">{course.courseName}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
export default Course;
