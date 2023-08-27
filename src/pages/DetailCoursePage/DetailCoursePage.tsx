import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { courseApi } from "../../api/courseApi";
import { I_singleCourse } from "../../interfaces/courseManagementInterface";
import { FaBatteryFull, FaCheck, FaCirclePlay, FaClock, FaFilm, FaGaugeHigh } from "react-icons/fa6";
import { formatCurrency } from "../../helpers/formatNumber";
import Button from "../../components/Button/Button";
import { DispatchType, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import ContentCourse from "./ContentCourse";
import { handleDuration } from "./../../helpers/durationHelper";
import { error, success } from "../../helpers/message";
import { setIsOpenModalAuthREDU } from "../../redux/slices/modalSlice";
import { LoadingOutlined } from "@ant-design/icons";
import { setIsLoadingBtnREDU, setIsLoadingPageREDU } from "../../redux/slices/loadingSlice";
import { wait } from "../../helpers/awaitHelper";
import { DELAY_LOADING_PAGE } from "../../contants/configContants";

function DetailCoursePage() {
    const dispatch: DispatchType = useDispatch();

    const [khoaHoc, setKhoaHoc] = useState<I_singleCourse>();

    const { id } = useParams();

    const { userLogin } = useSelector((state: RootState) => state.userManagementSlice);

    const { isLoadingBtn } = useSelector((state: RootState) => state.loadingSlice);

    useEffect(() => {
        const fetch = async () => {
            if (id !== undefined) {
                try {
                    dispatch(setIsLoadingPageREDU(true));

                    const { data, status } = await courseApi.getCourseById(id);

                    console.log("fetch - getCourseById", { data, status });

                    setKhoaHoc(data.result.data);

                    await wait(DELAY_LOADING_PAGE);
                    
                    dispatch(setIsLoadingPageREDU(false));
                } catch(err) {
                    console.log(err);
                    
                    await wait(DELAY_LOADING_PAGE);

                    dispatch(setIsLoadingPageREDU(false));
                }
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
                dispatch(setIsLoadingBtnREDU(true));

                const { data, status } = await courseApi.enrollCourse({ courseCode: id });

                console.log("Call API - enrollCourse", { data, status });

                success("Đăng ký khoá học thành công");

                dispatch({ type: "updateDisplayAccountSaga" });
            } catch (err) {
                error("Đăng ký khoá học không thành công");
            } finally {
                dispatch(setIsLoadingBtnREDU(false));
            }
        }
    };

    const handleDangKyKhoaHocNotLogged = () => {
        dispatch(setIsOpenModalAuthREDU(true));
    };

    const renderHoctiep = () => {
        // Trường hợp CHƯA đăng nhập
        if (userLogin === null) {
            console.log("Trường hợp CHƯA đăng nhập");
            return (
                <>
                    <h5 className="text-primary text-3xl font-semibold text-center">{formatCurrency(khoaHoc?.giaTien)}</h5>

                    <div className="text-center">
                        <Button onClick={handleDangKyKhoaHocNotLogged} className="px-10 py-3" type="primary">
                            <span className="text-base">ĐĂNG KÝ HỌC</span>
                        </Button>
                    </div>
                </>
            );
        }

        // Trường hợp ĐÃ đăng nhập
        const flag = userLogin.chiTietKhoaHocGhiDanh.findIndex((khoaHoc) => khoaHoc._id === id);

        console.log(flag);

        // Trường hợp khoá học ĐÃ đăng ký
        if (flag > -1) {
            console.log("Trường hợp khoá học ĐÃ đăng ký");

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
            console.log("Trường hợp khoá học CHƯA đăng ký");
            return (
                <>
                    <h5 className="text-primary text-3xl font-semibold text-center">{formatCurrency(khoaHoc?.giaTien)}</h5>

                    <div className="text-center">
                        <Button disabled={isLoadingBtn} onClick={handleDangKyKhoaHoc} className="px-10 py-3 space-x-2" type="primary">
                            {isLoadingBtn && <LoadingOutlined />}
                            <span className="text-base">ĐĂNG KÝ HỌC</span>
                        </Button>
                    </div>
                </>
            );
        }
    };

    return (
        <section className="pb-24">
            <div className="flex xl:flex-row flex-col">
                <div className="xl:w-[66.66667%] xl:order-1 order-2">
                    <h1 className={`heading_1 mt-4`}>{khoaHoc?.courseName}</h1>
                    <p className={`para mt-5 mb-16`}>{khoaHoc?.moTa}</p>
                    {isSeHocDuoc && (
                        <div className="space-y-3 mb-16">
                            <h2 className={`heading_2`}>Bạn sẽ học được gì?</h2>
                            <div className="grid sm:grid-cols-2 gap-5">
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
                <div className="xl:w-[33.33333%] xl:order-2 order-1 xl:pl-12 xl:block xl:mb-0 grid md:grid-cols-2 md:gap-0 gap-16 mb-16">
                    {/* HÌNH ẢNH */}
                    <div className="rounded-2xl overflow-hidden relative cursor-pointer xl:mb-7">
                        <img className="w-full h-full object-cover" src={khoaHoc?.hinhAnh} alt="" />
                        <div className="absolute z-10 top-0 left-0 w-full h-full bg-[linear-gradient(180deg,rgba(30,30,28,0),rgba(30,30,28,.9))] "></div>
                        <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-6xl">
                            <FaCirclePlay />
                        </div>
                        <p className="absolute z-10 bottom-0 left-0 text-center mb-4 font-semibold w-full text-white">Xem giới thiệu khóa học</p>
                    </div>

                    {/* GIÁ TIỀN VÀ BUTTON VÀ THÔNG TIN KHÁC*/}
                    <div className="self-center">
                        {/* GIÁ TIỀN VÀ BUTTON */}
                        {renderHoctiep()}

                        {/* THÔNG TIN KHÁC */}
                        <div className="w-fit mx-auto space-y-5 mt-7">
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
            </div>
        </section>
    );
}
export default DetailCoursePage;
