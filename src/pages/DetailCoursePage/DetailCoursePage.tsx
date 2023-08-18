import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { khoaHocApi } from "../../api/quanLyKhoaHocApi";
import { I_motKhoaHoc } from "./../../interfaces/I_quanLyKhoaHoc";
import { FaBatteryFull, FaCheck, FaCirclePlay, FaClock, FaFilm, FaGaugeHigh } from "react-icons/fa6";
import { formatCurrency } from "../../helpers/formatNumber";
import Button from "../../components/Button/Button";
import { DispatchType, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import ContentCourse from "./ContentCourse";
import { handleDuration } from "./../../helpers/durationHelper";
import { error, success } from "../../helpers/message";

function DetailCoursePage() {
    const dispatch: DispatchType = useDispatch();

    const [khoaHoc, setKhoaHoc] = useState<I_motKhoaHoc>();

    const { id } = useParams();

    const { userLogin } = useSelector((state: RootState) => state.quanLyNguoiDungSlice);

    useEffect(() => {
        const fetch = async () => {
            if (id !== undefined) {
                const { data, status } = await khoaHocApi.layMotKhoaHoc(id);
                console.log("fetch - layMotKhoaHoc", { data, status });
                setKhoaHoc(data.result.data);
            }
        };

        fetch();
    }, [id]);

    console.log(khoaHoc?.chuongHoc);

    let baiHoc = 0;

    khoaHoc?.chuongHoc.forEach((item) => {
        baiHoc += item.videos.length;
    });

    let totalDuration = "0";

    if (khoaHoc?.chuongHoc !== undefined) {
        totalDuration = handleDuration(khoaHoc?.chuongHoc);
    }

    let isSeHocDuoc = false;

    if (khoaHoc?.seHocDuoc !== undefined) {
        if (khoaHoc?.seHocDuoc.length > 0) isSeHocDuoc = true;
    }

    const handleDangKyKhoaHoc = async () => {
        if (id !== undefined) {
            try {
                const { data, status } = await khoaHocApi.dangKyKhoaHoc({ maKhoaHoc: id });
                console.log("Call API - dangKyKhoaHoc", { data, status });

                success("Đăng ký khoá học thành công");

                dispatch({ type: "capNhatUserLoginSaga" });
            } catch (err) {
                error("Đăng ký khoá học không thành công");
            }
        }
    };

    const renderHoctiep = () => {
        const flag = userLogin.chiTietKhoaHocGhiDanh.findIndex((khoaHoc) => khoaHoc._id === id);

        // Trường hợp khoá học ĐÃ đăng ký
        if (flag !== -1) {
            return (
                <div className="text-center">
                    <Button className="px-10 py-3" type="primary">
                        <span className="text-base">TIẾP TỤC HỌC</span>
                    </Button>
                </div>
            );
        }

        // Trường hợp khoá học CHƯA đăng ký
        if (flag === -1) {
            return (
                <>
                    <h5 className="text-primary text-3xl font-semibold text-center">{formatCurrency(khoaHoc?.giaTien)}</h5>

                    <div className="text-center">
                        <Button onClick={handleDangKyKhoaHoc} className="px-10 py-3" type="primary">
                            <span className="text-base">ĐĂNG KÝ HỌC</span>
                        </Button>
                    </div>
                </>
            );
        }
    };

    return (
        <section className="pb-24">
            <div className="flex">
                <div className="w-[66.66667%]">
                    <h1 className={`heading_1 mt-4`}>{khoaHoc?.tenKhoaHoc}</h1>
                    <p className={`para mt-5 mb-16`}>{khoaHoc?.moTa}</p>
                    {isSeHocDuoc && (
                        <div className="space-y-3 mb-16">
                            <h2 className={`heading_2`}>Bạn sẽ học được gì?</h2>
                            <div className="grid grid-cols-2 gap-5">
                                {khoaHoc?.seHocDuoc.map((text: string, index) => {
                                    return (
                                        <div key={index} className="flex items-center gap-2 pr-3">
                                            <div className="text-primary text-sm">
                                                <FaCheck />
                                            </div>
                                            <p className={`para`}>{text}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <div className="space-y-3">
                        <ContentCourse totalDuration={totalDuration} khoaHoc={khoaHoc} />
                    </div>
                </div>
                <div className="w-[33.33333%] pl-12 space-y-7">
                    {/* HÌNH ẢNH */}
                    <div className="rounded-2xl overflow-hidden relative cursor-pointer">
                        <img className="w-full h-full object-cover" src={khoaHoc?.hinhAnh} alt="" />
                        <div className="absolute z-10 top-0 left-0 w-full h-full bg-[linear-gradient(180deg,rgba(30,30,28,0),rgba(30,30,28,.9))] "></div>
                        <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-6xl">
                            <FaCirclePlay />
                        </div>
                        <p className="absolute z-10 bottom-0 left-0 text-center mb-4 font-semibold w-full text-white">Xem giới thiệu khóa học</p>
                    </div>

                    {/* GIÁ TIỀN VÀ BUTTON */}
                    {renderHoctiep()}

                    {/* THÔNG TIN KHÁC */}
                    <div className="w-fit mx-auto space-y-5">
                        <div className="flex gap-5 items-center">
                            <div className={`para`}>
                                <FaGaugeHigh />
                            </div>
                            <span className={`para`}>Trình độ cơ bản</span>
                        </div>
                        <div className="flex gap-5 items-center">
                            <div className={`para`}>
                                <FaFilm />
                            </div>
                            <span className={`para`}>
                                <span>Tổng số </span>
                                <strong>{baiHoc} </strong> bài học
                            </span>
                        </div>
                        <div className="flex gap-5 items-center">
                            <div className={`para`}>
                                <FaClock />
                            </div>
                            <span className={`para`}>
                                Thời lượng <strong>{totalDuration}</strong>
                            </span>
                        </div>
                        <div className="flex gap-5 items-center">
                            <div className={`para`}>
                                <FaBatteryFull />
                            </div>
                            <span className={`para`}>Học mọi lúc mọi nơi</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default DetailCoursePage;
