import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    type: string;
    className?: string;
    onClick?: () => void;
}
function Button({ children, type, className, onClick }: Props) {
    let classType = "";
    if (type === "primary") {
        classType = "bg-primary hover:bg-primary_hover active:bg-primary_active  text-white text-sm font-semibold px-5 py-2";
    }
    if (type === "transparent") {
        classType = "bg-transparent border-2 border-white hover:bg-white text-sm font-semibold px-5 py-2";
    }
    if (type === "bg-whiteblack") {
        classType = "bg-white hover:bg-[#292929] border-2 border-[#292929] text-[#292929] hover:text-white   dark:bg-transparent dark:hover:bg-white dark:text-white dark:hover:text-[#292929] dark:border-slate-200 dark:hover:border-[#292929]   text-sm font-semibold px-5 py-2";
    }
    if (type === "circle") {
        classType = "w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-[0_3px_6px_rgba(0,0,0,.16)] absolute top-1/2 -translate-y-[calc(50%_+_12px)] z-10";
    }
    if (type === "gradian") {
        classType = "h-[44px] w-full bg-[linear-gradient(70.06deg,#2cccff_-5%,#22dfbf_106%)] font-semibold text-lg text-white";
    }
    if (type === "white") {
        classType = "bg-white  hover:bg-white/90 active:bg-white/80 text-black text-sm font-semibold px-5 py-2";
    }
    if (type === "red") {
        classType = "bg-red-500  hover:bg-red-500/90 active:bg-red-500/80 text-white text-sm font-semibold px-5 py-2";
    }
    return (
        <button onClick={onClick} className={`${className} ${classType} cursor-pointer transition rounded-full `}>
            {children}
        </button>
    );
}
export default Button;
