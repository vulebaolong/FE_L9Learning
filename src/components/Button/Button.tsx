import { MouseEvent, ReactNode } from "react";

interface Props {
    children: ReactNode;
    type: "primary" | "transparent" | "transparent_1" | "transparent_2" | "bg-whiteblack" | "circle" | "circle_2" | "gradian" | "white" | "red";
    className?: string;
    name?: string;
    htmlFor?: "button" | "submit" | "reset" | undefined;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
}
function Button({ name, htmlFor, children, type, className, onClick, disabled = false }: Props) {
    let classType = "";
    let classDisabled = "";
    if (type === "primary") {
        classType = "bg-primary hover:bg-primary_hover active:bg-primary_active text-white text-sm font-semibold px-5 py-2";
    }
    if (type === "transparent") {
        classType = "bg-transparent border-2 border-white hover:bg-white text-sm font-semibold px-5 py-2";
    }
    if (type === "transparent_1") {
        classType = "bg-transparent border-2 dark:border-white/60 dark:hover:border-white/80 border-black/20 hover:border-black/50 text-sm font-semibold px-5 py-2 h-fit";
    }
    if (type === "transparent_2") {
        classType = "bg-transparent border-2 border-red-500/60 hover:border-red-500/80 text-sm font-semibold px-5 py-2 h-fit";
    }
    if (type === "bg-whiteblack") {
        classType =
            "bg-white hover:bg-[rgb(41,41,41)] active:bg-[rgba(41,41,41,0.8)] border-2 border-[rgb(41,41,41)] text-[rgb(41,41,41)] hover:text-white dark:bg-transparent dark:hover:bg-white dark:active:bg-white/80 dark:text-white dark:hover:text-[#292929] dark:border-slate-200 dark:hover:border-[#292929]   text-sm font-semibold px-5 py-2";
    }
    if (type === "circle") {
        classType = "w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-[0_3px_6px_rgba(0,0,0,.16)] absolute top-1/2 -translate-y-[calc(50%_+_12px)] z-10";
    }
    if (type === "circle_2") {
        classType = "w-10 h-10 bg-primary hover:bg-primary_hover active:bg-primary_active text-white rounded-full flex items-center justify-center shadow-[0_3px_6px_rgba(0,0,0,.3)] dark:!shadow-[0_3px_6px_rgba(246,246,246,0.3)]";
    }
    if (type === "gradian") {
        classType = "h-[44px] w-full bg-[linear-gradient(70.06deg,#2cccff_-5%,#22dfbf_106%)] font-semibold text-lg text-white";
    }
    if (type === "white") {
        classType = "bg-white w-max hover:bg-white/90 active:bg-white/80 text-black text-sm font-semibold px-5 py-2";
    }
    if (type === "red") {
        classType = "bg-red-500 w-max hover:bg-red-500/90 active:bg-red-500/80 text-white text-sm font-semibold px-5 py-2";
    }
    if (disabled === true) {
        classDisabled = "!cursor-not-allowed";
    }
    return (
        <button disabled={disabled} name={name} type={htmlFor} onClick={onClick} className={`ButtonMe ${className} ${classType} ${classDisabled} cursor-pointer transition rounded-full `}>
            {children}
        </button>
    );
}
export default Button;
