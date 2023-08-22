import { Popover } from "antd";
import { FaHouse, FaLightbulb, FaNewspaper, FaRoad } from "react-icons/fa6";
import { Link, useMatch } from "react-router-dom";

function SideBar() {
    const btnActive = `dark:!text-slate-200 dark:!bg-[#e8ebed54] 
    !text-[#1a1a1a] !bg-[#e8ebed]`;

    const btnSideBar = `flex flex-col items-center justify-center w-[72px] h-[72px] rounded-2xl transition space-y-[6px]
    dark:bg-transparent dark:hover:!bg-[#e8ebed3c] dark:hover:!text-slate-200 dark:text-slate-400
    bg-transparent hover:bg-[#f5f5f5] text-[#404040] hover:text-[#1a1a1a]
    `;


    return (
        <div className="px-2 sticky top-header py-5">
            <ul className="space-y-1">
                <li>
                    <Link to="/" className={`${useMatch("/") && btnActive} ${btnSideBar} `}>
                        <div className="text-xl">
                            <FaHouse />
                        </div>
                        <span className="text-xs font-semibold">Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/roadmap" className={`${useMatch("/roadmap") && btnActive} ${btnSideBar} `}>
                        <div className="text-xl">
                            <FaRoad />
                        </div>
                        <span className="text-xs font-semibold">Lộ trình</span>
                    </Link>
                </li>
                <li>
                    <Link to="/courses" className={`${useMatch("/courses") && btnActive} ${btnSideBar} `}>
                        <div className="text-xl">
                            <FaLightbulb />
                        </div>
                        <span className="text-xs font-semibold">Học</span>
                    </Link>
                </li>
                <li>
                    <Link to="/blog" className={`${useMatch("/blog") && btnActive} ${btnSideBar} `}>
                        <div className="text-xl">
                            <FaNewspaper />
                        </div>
                        <span className="text-xs font-semibold">Blog</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
export default SideBar;
