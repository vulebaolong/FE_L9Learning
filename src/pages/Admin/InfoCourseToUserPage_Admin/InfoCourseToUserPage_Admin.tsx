import { useParams } from "react-router-dom";
import UnenrolledUsers from "./UnenrolledUsers";
import EnrolledUsers from "./EnrolledUsers";
import { useEffect } from "react";
import { DispatchType, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";

function InfoCourseToUserPage_Admin() {
    const { id } = useParams();

    const dispatch: DispatchType = useDispatch();

    const { userInfoForCourse } = useSelector((state: RootState) => state.courseManagementSlice);

    useEffect(() => {
        dispatch({ type: "getUserInfoForCourseSaga", payload: id });
    }, [id, dispatch]);

    return (
        <section className="pb-24">
            <div className="space-y-20">
                <div>
                    <h1 className="heading_1 pt-5">Thông tin người dùng của khoá học</h1>
                    <div className="collumnCourse">
                        <div>
                            {/* HÌNH ẢNH */}
                            <div className={` aspect-[292/165] relative rounded-2xl overflow-hidden`}>
                                <img
                                    className="w-full h-full object-cover"
                                    src={userInfoForCourse?.course.image}
                                    alt=""
                                />
                            </div>
                            {/* TÊN KHOÁ HỌC */}
                            <p className="heading_3 mt-3">{userInfoForCourse?.course.courseName}</p>
                        </div>
                    </div>
                    <hr className="dark:!border-gray-700 border-gray-200 mt-3 mb-5" />
                </div>

                <div>
                    <h2 className="heading_2 mb-5">Người dùng đã đăng ký</h2>
                    <EnrolledUsers />
                </div>

                <div>
                    <h2 className="heading_2 mb-5">Người dùng chưa đăng ký</h2>
                    <UnenrolledUsers />
                </div>
            </div>
        </section>
    );
}
export default InfoCourseToUserPage_Admin;
