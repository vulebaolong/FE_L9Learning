import { useEffect } from "react";
import { DispatchType, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import style from "./KhoaHoc.module.css";
import Button from "../../../components/Button/Button";
import { navigate } from "../../../helpers/navigate";

function KhoaHoc() {
    const dispatch: DispatchType = useDispatch();
    useEffect(() => {
        dispatch({ type: "layDanhSachKhoaHocSaga" });
    }, []);
    const { danhSachKhoaHoc } = useSelector((state: RootState) => state.quanLyKhoaHocSlice);
    const handleChiTietKhoaHoc = (khoaHocId: string) => {
        navigate(`/detailcourse/${khoaHocId}`)
    };
    return (
        <section className="py-24">
            <h2 className="text-3xl text-[#242424] dark:text-slate-200 font-black">Tất cả khoá học</h2>
            <div className="grid grid-cols-4 gap-7 mt-5">
                {danhSachKhoaHoc.map((khoaHoc) => {
                    return (
                        <div key={khoaHoc._id} className="">
                            <div className={`${style.overlay} relative rounded-2xl overflow-hidden`}>
                                <Button
                                    onClick={() => {
                                        handleChiTietKhoaHoc(khoaHoc._id);
                                    }}
                                    type="white"
                                >
                                    Xem khoá học
                                </Button>
                                <img src={khoaHoc.hinhAnh} alt="" />
                            </div>
                            <p className="mt-3 text-[#292929] dark:text-slate-400 font-semibold">{khoaHoc.tenKhoaHoc}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
export default KhoaHoc;
