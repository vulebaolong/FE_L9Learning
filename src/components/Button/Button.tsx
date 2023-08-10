import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    type: string;
    className?: string;
}
function Button({ children, type, className }: Props) {
    let classType = "";
    if (type === "primary") {
        classType = "bg-primary hover:bg-primary_hover active:bg-primary_active  text-white text-sm font-semibold px-5 py-2";
    }
    if (type === "transparent") {
        classType = "bg-transparent border-2 border-white hover:bg-white  text-sm font-semibold px-5 py-2";
    }
    return (
        <button  className={`${className} ${classType}  cursor-pointer transition rounded-full`}>
            {children}
        </button>
    );
}
export default Button;
