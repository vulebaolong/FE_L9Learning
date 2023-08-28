import { useEffect, useState } from "react";
import { courseApi } from "../../api/courseApi";
import { I_courseCategory, I_coursesByCategory } from "../../interfaces/courseManagementInterface";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../redux/store";
import Button from "../../components/Button/Button";
import style from "./CoursesPage.module.css";
import { navigate } from "../../helpers/navigate";
import { Select } from "antd";
import { setIsLoadingPageREDU } from "../../redux/slices/loadingSlice";
import { wait } from "../../helpers/awaitHelper";
import { DELAY_LOADING_PAGE } from "../../contants/configContants";
import SkeletonWarpCourses from "../../components/Skeleton/SkeletonWarpCourses";
import Cta from "../../components/Cta/Cta";

function CoursesPage() {
    const dispatch: DispatchType = useDispatch();

    const [courseCategories, setCourseCategories] = useState<I_courseCategory[]>([]);

    const [coursesByCategory, setCoursesByCategory] = useState<I_coursesByCategory[]>([]);

    const [isSkeleton, setIsSkeleton] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                console.log("call api");

                dispatch(setIsLoadingPageREDU(true));
                const { data: data1, status: status1 } = await courseApi.getListCourseCategories();
                // console.log("call API - getListCourseCategories - ĐẦU TRANG", { data1, status1 });
                
                const { data: data2, status: status2 } = await courseApi.getCourseByCategory();
                // console.log("call API - getCourseByCategory - ĐẦU TRANG", { data2, status2 });
                setCourseCategories(data1.result.data);
                setCoursesByCategory(data2.result.data);

                await wait(DELAY_LOADING_PAGE);

                dispatch(setIsLoadingPageREDU(false));
            } catch (err) {
                console.log(err);

                await wait(DELAY_LOADING_PAGE);

                dispatch(setIsLoadingPageREDU(false));
            }
        };

        fetch();
    }, [dispatch]);

    const handleCourseDetail = (courseId: string) => {
        navigate(`/detailcourse/${courseId}`);
    };

    const options = courseCategories.map((category) => {
        return {
            value: category._id,
            label: category.categoryName,
        };
    });

    options.unshift({ value: "Tất cả", label: "Tất cả" });

    const handleChange = async (value: string) => {
        // Trường hợp lấy tất cả khoá học
        if (value === "Tất cả") {
            try {
                setIsSkeleton(true);

                const { data, status } = await courseApi.getCourseByCategory();

                console.log("call API - getCourseByCategory - CLICK Tất cả", { data, status });

                setCoursesByCategory(data.result.data);
            } finally {
                setIsSkeleton(false);
            }
            return;
        }

        // Trường hợp lấy khoá học theo 1 danh mục
        try {
            setIsSkeleton(true);

            const { data, status } = await courseApi.getCourseByCategory(value);

            console.log(`call API - getCourseByCategory - CLICK`, { data, status });

            setCoursesByCategory(data.result.data);
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
                <SkeletonWarpCourses />
            ) : (
                coursesByCategory?.map((courses, index) => {
                    return (
                        <div key={index} className="">
                            <h2 className="heading_2">{courses.categoryName}</h2>
                            <div className="collumnCourse">
                                {courses.coursesInCategory.map((course) => {
                                    return (
                                        <div key={course._id} className="">
                                            <div className={`${style.overlay} aspect-[292/165] relative rounded-2xl overflow-hidden`}>
                                                <Button
                                                    onClick={() => {
                                                        handleCourseDetail(course._id);
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
                        </div>
                    );
                })
            )}
            <Cta
                textBtn="Xem lộ trình"
                title="Bạn đang tìm kiếm lộ trình học cho người mới?"
                desc="Các khóa học được thiết kế phù hợp cho người mới, lộ trình học rõ ràng, nội dung dễ hiểu."
            />
        </section>
    );
}
export default CoursesPage;
