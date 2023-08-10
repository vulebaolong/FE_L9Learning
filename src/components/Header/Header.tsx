import { useRef } from "react";
import logoImg from "../../assets/logo/L9_logo.png";
import Button from "../Button/Button";
import { MdLightMode, MdNightlight } from "react-icons/md";

function Header() {
    const btnLightRef = useRef<HTMLDivElement | null>(null);
    const btnNightRef = useRef<HTMLDivElement | null>(null);

    const toggleTheme = () => {
        const html = document.querySelector("html");
        if (btnLightRef.current && btnNightRef.current) {
            btnLightRef.current.classList.toggle("hidden");
            btnNightRef.current.classList.toggle("hidden");
            html?.classList.toggle("dark");
        }
    };
    return (
        <div className="bg-white dark:bg-slate-900 sticky left-0 top-0 right-0 z-20 h-header px-7 flex items-center justify-between border-b dark:border-slate-700 border-slate-200">
            <div className="flex items-center gap-2">
                <a href="/">
                    <img className="w-[38px] h-[38px] rounded-lg" src={logoImg} alt="logo" />
                </a>
                <h4 className="text-sm font-bold">Học Lập Trình Để Đi Làm</h4>
            </div>

            <div className="flex items-center gap-2">
                <div ref={btnLightRef} onClick={toggleTheme} className="text-2xl cursor-pointer">
                    <MdLightMode />
                </div>
                <div ref={btnNightRef} onClick={toggleTheme} className="text-2xl hidden cursor-pointer">
                    <MdNightlight />
                </div>
                <Button type="primary">Đăng nhập</Button>
            </div>
        </div>
    );
}
export default Header;
