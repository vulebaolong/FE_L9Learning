import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { khoaHocApi } from "../../api/quanLyKhoaHocApi";
import { I_motKhoaHoc } from "./../../interfaces/I_quanLyKhoaHoc";
import { FaBatteryFull, FaCheck, FaCirclePlay, FaClock, FaFilm, FaGaugeHigh } from "react-icons/fa6";
import { Collapse } from "antd";
import type { CollapseProps } from "antd";
import { formatCurrency } from "../../helpers/formatNumber";
import Button from "../../components/Button/Button";
import CollapseCourse from "./CollapseCourse";
import { DispatchType } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setIsOpenCollapseCourseREDU } from "../../redux/slices/quanLyKhoaHocSlice";

function DetailCoursePage() {
    const dispatch: DispatchType = useDispatch();

    const [khoaHoc, setKhoaHoc] = useState<I_motKhoaHoc>();

    const { id } = useParams();

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

    const heading_2 = `font-bold text-xl dark:text-slate-200`;

    const para = `text-black/80 text-sm dark:text-slate-400`;

    console.log(khoaHoc?.chuongHoc);

    let baiHoc = 0;

    khoaHoc?.chuongHoc.forEach((item) => {
        baiHoc += item.videos.length;
    });

    // Replace with your API key
    // const API_KEY = "AIzaSyAlz03xiJ64w3ombtwYVAEG9_tYP6_WKy4";

    // Replace with the video ID you want to retrieve the duration for
    // const videoId = "F4UQX4ASZ7k";

    // YouTube Data API endpoint
    // const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=contentDetails`;

    // Fetch video data from YouTube API
    // fetch(apiUrl)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log(data);
    //         const duration = data.items[0].contentDetails.duration;

    //         console.log(`Video duration: ${convertDuration(duration)}`);
    //     })
    //     .catch((error) => {
    //         console.error("Error retrieving video duration:", error);
    //     });

    const handleMoTatCa = () => {
        dispatch(setIsOpenCollapseCourseREDU());
    };

    return (
        <section>
            <div className="flex">
                <div className="w-[66.66667%]">
                    <h1 className="mt-4 font-bold text-3xl dark:text-slate-200">{khoaHoc?.tenKhoaHoc}</h1>
                    <p className={`${para} mt-5 mb-16`}>{khoaHoc?.moTa}</p>
                    <div className="space-y-3 mb-16">
                        <h2 className={`${heading_2}`}>Bạn sẽ học được gì?</h2>
                        <div className="grid grid-cols-2 gap-2">
                            {khoaHoc?.seHocDuoc.map((text: string, index) => {
                                return (
                                    <div key={index} className="flex items-center gap-2 pr-3">
                                        <div className="text-primary text-sm">
                                            <FaCheck />
                                        </div>
                                        <p className={`${para}`}>{text}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h2 className={`${heading_2}`}>Nội dung khóa học</h2>
                        <div className="flex items-baseline justify-between">
                            <div className="">
                                <span className={`${para}`}>
                                    <strong>{khoaHoc?.chuongHoc.length} </strong> chương
                                </span>
                                <span> • </span>
                                <span className={`${para}`}>
                                    <strong>{baiHoc} </strong> bài học
                                </span>
                                <span> • </span>
                                <span className={`${para}`}>
                                    Thời lượng <strong>03 giờ 25 phút</strong>
                                </span>
                            </div>
                            <span onClick={handleMoTatCa} className={`${para} font-semibold cursor-pointer !text-primary hover:!text-primary_hover active:!text-primary_active`}>
                                Mở rộng tất cả
                            </span>
                        </div>
                        <CollapseCourse khoaHoc={khoaHoc} />
                    </div>
                </div>
                <div className="w-[33.33333%] pl-12 space-y-7">
                    <div className="rounded-2xl overflow-hidden relative cursor-pointer">
                        <img className="w-full h-full object-cover" src={khoaHoc?.hinhAnh} alt="" />
                        <div className="absolute z-10 top-0 left-0 w-full h-full bg-[linear-gradient(180deg,rgba(30,30,28,0),rgba(30,30,28,.9))] "></div>
                        <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-6xl">
                            <FaCirclePlay />
                        </div>
                        <p className="absolute z-10 bottom-0 left-0 text-center mb-4 font-semibold w-full text-white">Xem giới thiệu khóa học</p>
                    </div>
                    <h5 className="text-primary text-3xl font-semibold text-center">{formatCurrency(khoaHoc?.giaTien)}</h5>
                    <div className="text-center">
                        <Button className="px-10 py-3" type="primary">
                            <span className="text-base">ĐĂNG KÝ HỌC</span>
                        </Button>
                    </div>
                    <div className="w-fit mx-auto space-y-5">
                        <div className="flex gap-5 items-center">
                            <div className={`${para}`}>
                                <FaGaugeHigh />
                            </div>
                            <span className={`${para}`}>Trình độ cơ bản</span>
                        </div>
                        <div className="flex gap-5 items-center">
                            <div className={`${para}`}>
                                <FaFilm />
                            </div>
                            <span className={`${para}`}>
                                <span>Tổng số </span>
                                <strong>{baiHoc} </strong> bài học
                            </span>
                        </div>
                        <div className="flex gap-5 items-center">
                            <div className={`${para}`}>
                                <FaClock />
                            </div>
                            <span className={`${para}`}>
                                Thời lượng <strong>03 giờ 25 phút</strong>
                            </span>
                        </div>
                        <div className="flex gap-5 items-center">
                            <div className={`${para}`}>
                                <FaBatteryFull />
                            </div>
                            <span className={`${para}`}>Học mọi lúc mọi nơi</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default DetailCoursePage;
