import { useEffect } from "react";
import { DispatchType, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import style from "./KhoaHoc.module.css";
import Button from "../../../components/Button/Button";
import { navigate } from "../../../helpers/navigate";

function KhoaHoc() {
    const dispatch: DispatchType = useDispatch();
    useEffect(() => {
        dispatch({ type: "getCourseListSaga" });
    }, []);
    const { courseList } = useSelector((state: RootState) => state.courseManagementSlice);
    const handleChiTietKhoaHoc = (khoaHocId: string) => {
        navigate(`/detailcourse/${khoaHocId}`)
    };
    return (
        <section className="py-24">
            <h2 className="heading_2">Tất cả khoá học</h2>
            <div className="collumnCourse">
                {courseList.map((khoaHoc) => {
                    return (
                        <div key={khoaHoc._id} className="">
                            <div className={`${style.overlay} aspect-[292/165] relative rounded-2xl overflow-hidden`}>
                                <Button
                                    onClick={() => {
                                        handleChiTietKhoaHoc(khoaHoc._id);
                                    }}
                                    type="white"
                                >
                                    Xem khoá học
                                </Button>
                                <img className="w-full h-full object-cover" src={khoaHoc.image} alt="" />
                            </div>
                            <p className="heading_3 mt-3">{khoaHoc.courseName}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
export default KhoaHoc;
