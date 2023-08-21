import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/store";
import style from "./ListCoursePage_Admin.module.css";
import Button from "../../components/Button/Button";
import { navigate } from "../../helpers/navigate";
import { useEffect } from "react";
import PopconfirmListCoursePage_Admin from "./PopconfirmListCoursePage_Admin";

function ListCoursePage_Admin() {
    const dispatch: DispatchType = useDispatch();

    useEffect(() => {
        dispatch({ type: "layDanhSachKhoaHocSaga" });
    }, []);

    const { danhSachKhoaHoc } = useSelector((state: RootState) => state.quanLyKhoaHocSlice);

    const handleChinhSuaKhoaHoc = (maKhoaHoc: string) => {
        navigate(`/editcourse/${maKhoaHoc}`);
    };

    return (
        <section className="pb-24">
            <h2 className="heading_1">Danh sách khoá học</h2>

            <div className="grid grid-cols-4 gap-7 mt-5">
                {danhSachKhoaHoc.map((khoaHoc) => {
                    return (
                        <div key={khoaHoc._id}>
                            {/* HÌNH ẢNH */}
                            <div className={`${style.overlay} aspect-[292/165] relative rounded-2xl overflow-hidden`}>
                                <div className={`${style.actionButton} flex flex-col gap-2 items-center`}>
                                    <Button
                                        onClick={() => {
                                            handleChinhSuaKhoaHoc(khoaHoc._id);
                                        }}
                                        type="white"
                                    >
                                        Chỉnh sửa
                                    </Button>
                                    <PopconfirmListCoursePage_Admin khoaHoc={khoaHoc} />
                                </div>
                                <img className="w-full h-full object-cover" src={khoaHoc.hinhAnh} alt="" />
                            </div>
                            {/* TÊN KHOÁ HỌC */}
                            <p className="heading_3 mt-3">{khoaHoc.tenKhoaHoc}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
export default ListCoursePage_Admin;
