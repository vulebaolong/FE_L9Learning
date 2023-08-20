import { useEffect, useState } from "react";
import { khoaHocApi } from "../../api/quanLyKhoaHocApi";
import { I_danhMucKhoaHoc, I_khoaHocDanhMuc, I_khoaHocTheoDanhMuc, I_motKhoaHoc } from "../../interfaces/I_quanLyKhoaHoc";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/store";
import Button from "../../components/Button/Button";
import style from "./CoursesPage.module.css";
import { navigate } from "../../helpers/navigate";
import imgRoadmap from "../../assets/roadmap.png";
import { Select, Skeleton } from "antd";
import { setIsLoadingPageREDU } from "../../redux/slices/loadingSlice";
import { wait } from "../../helpers/awaitHelper";
import { DELAY_LOADING_PAGE } from "../../contants/configContants";
import SkeletonCoursesPage from "./SkeletonCoursesPage";

function CoursesPage() {
    const dispatch: DispatchType = useDispatch();

    const [danhMucKhoaHoc, setDanhMucKhoaHoc] = useState<I_danhMucKhoaHoc[]>([]);

    const [khoaHocTheoDanhMuc, setKhoaHocTheoDanhMuc] = useState<I_khoaHocTheoDanhMuc[]>([]);

    const [isSkeleton, setIsSkeleton] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                dispatch(setIsLoadingPageREDU(true));
                const { data: data1, status: status1 } = await khoaHocApi.layDanhMucKhoaHoc();
                console.log("call API - layDanhMucKhoaHoc - ĐẦU TRANG", { data1, status1 });
                setDanhMucKhoaHoc(data1.result.data);

                const { data: data2, status: status2 } = await khoaHocApi.layKhoaHocTheoDanhMuc();
                console.log("call API - layKhoaHocTheoDanhMuc - ĐẦU TRANG", { data2, status2 });
                setKhoaHocTheoDanhMuc(data2.result.data);
            } finally {
                await wait(DELAY_LOADING_PAGE);
                dispatch(setIsLoadingPageREDU(false));
            }
        };

        fetch();
    }, []);

    const handleChiTietKhoaHoc = (khoaHocId: string) => {
        navigate(`/detailcourse/${khoaHocId}`);
    };

    const options = danhMucKhoaHoc.map((danhMuc) => {
        return {
            value: danhMuc._id,
            label: danhMuc.tenDanhMuc,
        };
    });

    options.unshift({ value: "Tất cả", label: "Tất cả" });

    const handleChange = async (value: string) => {
        // Trường hợp lấy tất cả khoá học
        if (value === "Tất cả") {
            try {
                setIsSkeleton(true);

                const { data, status } = await khoaHocApi.layKhoaHocTheoDanhMuc();

                console.log("call API - layKhoaHocTheoDanhMuc - CLICK Tất cả", { data, status });

                setKhoaHocTheoDanhMuc(data.result.data);
            } finally {
                setIsSkeleton(false);
            }
            return;
        }

        // Trường hợp lấy khoá học theo 1 danh mục
        try {
            setIsSkeleton(true);

            const { data, status } = await khoaHocApi.layKhoaHocTheoDanhMuc(value);

            console.log(`call API - layKhoaHocTheoDanhMuc - CLICK`, { data, status });

            setKhoaHocTheoDanhMuc(data.result.data);
        } finally {
            setIsSkeleton(false);
        }
    };

    return (
        <section className="pb-24 space-y-20">
            <div>
                <h1 className={`heading_1 mt-4 mb-5`}>Khoá học</h1>
                <p>Các khóa học được thiết kế phù hợp cho cả người mới, nhiều khóa học miễn phí, chất lượng, nội dung dễ hiểu.</p>
            </div>
            <div className="">
                <h2 className="heading_2">Lọc</h2>
                <div className="flex items-center mt-5 gap-2">
                    <p className="heading_3 ">Danh mục: </p>
                    <Select onChange={handleChange} defaultValue="Tất cả" style={{ width: 220 }} options={options} />
                </div>
            </div>
            {isSkeleton === true ? (
                <SkeletonCoursesPage />
            ) : (
                khoaHocTheoDanhMuc?.map((khoaHocs, index) => {
                    return (
                        <div key={index} className="">
                            <h2 className="heading_2">{khoaHocs.tenDanhMuc}</h2>
                            <div className="grid grid-cols-4 gap-7 mt-5">
                                {khoaHocs.khoaHocDanhMuc.map((khoaHoc) => {
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
                })
            )}
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
