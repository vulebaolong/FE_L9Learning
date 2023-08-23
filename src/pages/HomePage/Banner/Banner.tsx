import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules";
import SwiperClass from "swiper";
import "swiper/css";

import img1 from "../../../assets/banner/Banner_web_ReactJS.png";
import img2 from "../../../assets/banner/Banner_web_HTMLCSSPRO.png";
import img3 from "../../../assets/banner/Banner_web_Result.png";
import img4 from "../../../assets/banner/Banner_web_youtube.png";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import ContentSlider from "./ContentSlider";
import Button from "../../../components/Button/Button";

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
    {
        h2: "Thành Quả của Học Viên",
        p: "Để đạt được kết quả tốt trong mọi việc ta cần xác định mục tiêu rõ ràng cho việc đó. Học lập trình cũng không là ngoại lệ.",
        colorBackground: "bg-[linear-gradient(to_right,_rgb(118,18,255),_rgb(5,178,255))]",
        colorTextBtn: "group-hover:text-[#7612ff]",
        img: img3,
        textBtn: "Xem thành quả",
    },
    {
        h2: "L9 trên Youtube",
        p: "L9 được nhắc tới ở mọi nơi, ở đâu có cơ hội việc làm cho nghề IT và có những con người yêu thích lập trình F8 sẽ ở đó.",
        colorBackground: "bg-[linear-gradient(to_right,_rgb(254,33,94),_rgb(255,148,2))]",
        colorTextBtn: "group-hover:text-[#fe215e]",
        img: img4,
        textBtn: "Truy cập kênh",
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

    const progressCircle = useRef<SVGSVGElement | null>(null);
    const progressContent = useRef<HTMLDivElement | null>(null);

    const onAutoplayTimeLeft = (s, time: number, progress: number) => {
        if (!progressCircle.current || !progressContent.current) return;

        if (progressCircle.current.style) {
            progressCircle.current.style.setProperty("--progress", String(1 - progress));
        }

        if (progressContent.current.textContent !== undefined) {
            progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
        }
    };

    return (
        <section className="w-full relative">
            <Swiper
                modules={[Autoplay, Navigation, Pagination, A11y]}
                pagination={{ clickable: true }}
                spaceBetween={30}
                loop={true}
                speed={1100}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper rounded-2xl"
            >
                {dataContent.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <ContentSlider dataContent={{ ...item }} />
                        </SwiperSlide>
                    );
                })}
                <div className="hidden lg:flex">
                    <div className="autoplay-progress " slot="container-end">
                        <svg viewBox="0 0 48 48" ref={progressCircle}>
                            <circle cx="24" cy="24" r="20"></circle>
                        </svg>
                        <span ref={progressContent}></span>
                    </div>
                </div>
            </Swiper>
            <Button className={`left-0 -translate-x-1/2`} onClick={handleClickPrev} type="circle">
                <FaChevronLeft className="text-[#4b4b4b]" />
            </Button>

            <Button className={`right-0 translate-x-1/2`} onClick={handleClickNext} type="circle">
                <FaChevronRight className="text-[#4b4b4b]" />
            </Button>
        </section>
    );
}
export default Banner;
