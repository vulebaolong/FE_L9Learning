import { useDispatch } from "react-redux";
import { navigate } from "../../../helpers/navigate";
import { DispatchType } from "../../../redux/store";
import Logo from "../../Logo/Logo";
import { setIsDraweREDU } from "../../../redux/slices/drawerSlice";
import { setIsOpenModalAuthREDU } from "../../../redux/slices/modalSlice";

function NotLoggedMobile() {
    const dispatch: DispatchType = useDispatch();

    const textItem = `text-base cursor-pointer transition
  text-[#666] hover:text-[#292929]
  dark:text-white/70 dark:hover:text-white/90`;

    const handleHome = () => {
        navigate("/");
        dispatch(setIsDraweREDU(false));
    };

    const handleRoadmap = () => {
        navigate("/roadmap");
        dispatch(setIsDraweREDU(false));
    };

    const handleCourse = () => {
        navigate("/courses");
        dispatch(setIsDraweREDU(false));
    };

    const handleLogin = () => {
        dispatch(setIsDraweREDU(false));
        dispatch(setIsOpenModalAuthREDU(true));
    };
    return (
        <div className="space-y-7">
            <div className="flex lg:hidden items-center gap-2">
                <Logo />
                <h4 className="text-sm font-bold">Học Lập Trình Để Đi Làm</h4>
            </div>

            {/* ĐĂNG NHẬP */}
            <div className="">
                <span className={textItem} onClick={handleLogin}>
                    Đăng nhập
                </span>
            </div>

            <hr className="dark:!border-gray-700 border-gray-200" />

            {/* TRANG CHỦ */}
            <div className="">
                <span className={textItem} onClick={handleHome}>
                    Trang chủ
                </span>
            </div>

            {/* LỘ TRÌNH */}
            <div className="">
                <span className={textItem} onClick={handleRoadmap}>
                    Lộ trình
                </span>
            </div>

            {/* KHOÁ HỌC */}
            <div className="">
                <span className={textItem} onClick={handleCourse}>
                    Khoá học
                </span>
            </div>
        </div>
    );
}
export default NotLoggedMobile;
