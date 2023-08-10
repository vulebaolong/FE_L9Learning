import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, A11y } from "swiper/modules";
import SwiperClass from "swiper";

import img1 from "../../../assets/banner/Banner_web_ReactJS.png";
import img2 from "../../../assets/banner/Banner_web_HTMLCSSPRO.png";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import ContentSlider from "./ContentSlider";

const dataContent = [
    {
        h2: "Học ReactJS Miễn Phí!",
        p: "Khóa học ReactJS từ cơ bản tới nâng cao. Kết quả của khóa học này là bạn có thể làm hầu hết các dự án thường gặp với ReactJS.",
        colorBackground: "bg-[linear-gradient(to_right,rgb(40,119,250),rgb(103,23,205))]",
        colorTextBtn: "group-hover:text-[#2877FA]",
        img: img1,
        textBtn: "Đăng ký ngay",
    },
    {
        h2: "Khóa học HTML CSS Pro",
        p: "Đây là khóa học đầy đủ và chi tiết nhất bạn có thể tìm thấy được ở trên Internet!",
        colorBackground: "bg-[linear-gradient(to_right,rgb(104,40,250),rgb(255,186,164))]",
        colorTextBtn: "group-hover:text-[#6828fa]",
        img: img2,
        textBtn: "Tìm hiểu thêm",
    },
];

function Banner() {
    const swiperRef = useRef<SwiperClass>();

    const handleClickPrev = () => {
        swiperRef.current?.slidePrev();
    };

    const handleClickNext = () => {
        swiperRef.current?.slideNext();
    };

    const classBtn = `w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-[0_3px_6px_rgba(0,0,0,.16)] absolute top-1/2 -translate-y-1/2 z-10`;
    return (
        <section className="w-full relative">
            <Swiper
                modules={[Navigation, Pagination, A11y]}
                pagination={{ clickable: true }}
                spaceBetween={30}
                loop={true}
                speed={1100}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                className="mySwiper rounded-2xl"
            >
                {dataContent.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <ContentSlider dataContent={{...item}} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <button className={`left-0 -translate-x-1/2  ${classBtn}`} onClick={handleClickPrev}>
                <FaChevronLeft />
            </button>

            <button className={`right-0 translate-x-1/2  ${classBtn}`} onClick={handleClickNext}>
                <FaChevronRight />
            </button>
        </section>
    );
}
export default Banner;
