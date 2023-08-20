import { useRef } from "react";
import { MdLightMode, MdNightlight } from "react-icons/md";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../redux/store";
import { toggleThemeREDU } from "../../redux/slices/toggleThemeSlice";

import UserControll from "./UserControll";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";

function Header() {
    const btnLightRef = useRef<HTMLDivElement | null>(null);
    const btnNightRef = useRef<HTMLDivElement | null>(null);

    const dispatch: DispatchType = useDispatch();

    const toggleTheme = () => {
        dispatch(toggleThemeREDU());
    };

    return (
        <div className="bg-white dark:bg-slate-900 sticky left-0 top-0 right-0 z-20 h-header px-7 flex items-center justify-between border-b dark:border-slate-700 border-slate-200">
            <div className="flex items-center gap-2">
                <Logo />
                <h4 className="text-sm font-bold">Học Lập Trình Để Đi Làm</h4>
            </div>

            <Search />

            <div className="flex items-center gap-2">
                <div ref={btnLightRef} onClick={toggleTheme} className="btnLight text-2xl cursor-pointer">
                    <MdLightMode />
                </div>
                <div ref={btnNightRef} onClick={toggleTheme} className="btnNight text-2xl hidden cursor-pointer">
                    <MdNightlight />
                </div>
                <UserControll />
            </div>
        </div>
    );
}
export default Header;
