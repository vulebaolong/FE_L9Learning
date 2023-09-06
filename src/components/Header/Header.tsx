import { MdLightMode, MdNightlight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/store";
import { toggleThemeREDU } from "../../redux/slices/toggleThemeSlice";

import UserControll from "./UserControll";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import NavbarMobile from "./Mobile/NavbarMobile";

function Header() {
    const { userLogin } = useSelector((state: RootState) => state.userManagementSlice);

    const dispatch: DispatchType = useDispatch();

    const toggleTheme = () => {
        dispatch(toggleThemeREDU());
    };

    return (
        <>
            {/* MOBILE */}
            <div className="flex lg:hidden bg-white dark:bg-slate-900 sticky left-0 top-0 right-0 z-20 h-header px-7  items-center justify-between border-b dark:border-slate-700 border-slate-200">
                {/* NAV */}
                <div className="">
                    <NavbarMobile />
                </div>

                {/* LOGO */}
                {userLogin && (
                    <div className="items-center gap-2">
                        <Logo />
                        <h4 className="hidden lg:flex text-sm font-bold">Học Lập Trình Để Đi Làm</h4>
                    </div>
                )}

                {/* TOOGLE THEME */}
                <div className="flex items-center gap-2">
                    <div onClick={toggleTheme} className="btnLightMb text-2xl cursor-pointer">
                        <MdLightMode />
                    </div>
                    <div onClick={toggleTheme} className="btnNightMb text-2xl hidden cursor-pointer">
                        <MdNightlight />
                    </div>
                    <UserControll />
                </div>
            </div>

            {/* DESKTOP */}
            <div className="hidden lg:flex bg-white dark:bg-slate-900 sticky left-0 top-0 right-0 z-20 h-header px-7  items-center justify-between border-b dark:border-slate-700 border-slate-200">
                {/* LOGO */}
                <div className="flex items-center gap-2">
                    <Logo />
                    <h4 className="text-sm font-bold">Học Lập Trình Để Đi Làm</h4>
                </div>

                {/* SEARCH */}
                <div className="hidden md:block">
                    <Search />
                </div>

                {/* TOOGLE THEME */}
                <div className="flex items-center gap-2">
                    <div onClick={toggleTheme} className="btnLightDt text-2xl cursor-pointer">
                        <MdLightMode />
                    </div>
                    <div onClick={toggleTheme} className="btnNightDt text-2xl hidden cursor-pointer">
                        <MdNightlight />
                    </div>
                    <UserControll />
                </div>
            </div>
        </>
    );
}
export default Header;
