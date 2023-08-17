import { useEffect, useState } from "react";
import { khoaHocApi } from "../../api/quanLyKhoaHocApi";
import { I_danhMucKhoaHoc, I_motKhoaHoc } from "../../interfaces/I_quanLyKhoaHoc";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/store";
import Button from "../../components/Button/Button";
import style from "./CoursesPage.module.css";
import { navigate } from "../../helpers/navigate";
import imgRoadmap from "../../assets/roadmap.png";

function CoursesPage() {
    const [danhMucKhoaHoc, setDanhMucKhoaHoc] = useState([]);
    const dispatch: DispatchType = useDispatch();

    useEffect(() => {
        const fetch = async () => {
            const { data, status } = await khoaHocApi.layDanhMucKhoaHoc();
            console.log("call API - layDanhMucKhoaHoc", { data, status });
            setDanhMucKhoaHoc(data.result.data);
            dispatch({ type: "layDanhSachKhoaHocSaga" });
        };
        fetch();
    }, []);
    const { danhSachKhoaHoc } = useSelector((state: RootState) => state.quanLyKhoaHocSlice);
    let arrKhoaHoc: { tenDanhMuc: string; danhMucKhoaHoc: I_motKhoaHoc[] }[] = [];
    if (danhMucKhoaHoc.length > 0 && danhSachKhoaHoc.length > 0) {
        arrKhoaHoc = danhMucKhoaHoc.map((danhMuc: I_danhMucKhoaHoc) => {
            return {
                tenDanhMuc: danhMuc.tenDanhMuc,
                danhMucKhoaHoc: danhSachKhoaHoc.filter((khoaHoc) => {
                    return khoaHoc.danhMucKhoaHoc_ID?._id === danhMuc?._id;
                }),
            };
        });
    }
    arrKhoaHoc = arrKhoaHoc.filter((item) => item.danhMucKhoaHoc.length > 0);
    console.log(arrKhoaHoc);
    const handleChiTietKhoaHoc = (khoaHocId: string) => {
        navigate(`/detailcourse/${khoaHocId}`);
    };
    return (
        <section className="pb-24 space-y-20">
            <div>
                <h1 className={`heading_1 mt-4 mb-5`}>Khoá học</h1>
                <p>Các khóa học được thiết kế phù hợp cho cả người mới, nhiều khóa học miễn phí, chất lượng, nội dung dễ hiểu.</p>
            </div>
            {arrKhoaHoc.map((khoaHocs, index) => {
                return (
                    <div key={index} className="">
                        <h2 className="heading_2">{khoaHocs.tenDanhMuc}</h2>
                        <div className="grid grid-cols-4 gap-7 mt-5">
                            {khoaHocs.danhMucKhoaHoc.map((khoaHoc) => {
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
                                            <img className="w-full h-full object-cover" src={khoaHoc.hinhAnh} alt="" />
                                        </div>
                                        <p className="heading_3 mt-3">{khoaHoc.tenKhoaHoc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
            <div className="grid grid-cols-2 gap-2">
                <div className="w-[400px] self-center">
                    <h2 className="heading_2 my-5">Bạn đang tìm kiếm lộ trình học cho người mới?</h2>
                    <p className="my-[14px]">Các khóa học được thiết kế phù hợp cho người mới, lộ trình học rõ ràng, nội dung dễ hiểu.</p>
                    <Button type="bg-whiteblack">Xem lộ trình</Button>
                </div>
                <div className="w-[400px] ml-auto">
                    <img
                        // style={{
                        //     filter: "drop-shadow(0px 8px 24px rgba(220, 220, 220, 0.224))",
                        // }}
                        className="w-full h-full object-cover dark:drop-shadow-primary "
                        src={imgRoadmap}
                        alt=""
                    />
                </div>
            </div>
        </section>
    );
}
export default CoursesPage;
