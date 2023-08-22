import { FaRegBell, FaRegUser, FaShieldHalved } from "react-icons/fa6";
import { Link, Outlet, useMatch } from "react-router-dom";

function SettingsPage() {
    const btnActive = `dark:!text-slate-200 dark:!bg-[#e8ebed23] 
    !text-[#1a1a1a] !bg-[#e8ebed]`;

    const btn = `transition flex items-center gap-2 py-[14px] px-[10px] rounded-lg hover:dark:!text-slate-200 hover:dark:!bg-[#e8ebed23] hover:!text-[#1a1a1a] hover:!bg-[#e8ebed]`;
    const para = `text-black/80 text-sm dark:text-slate-400`;

    return (
        <section className="container pb-24">
            <h1 className={`heading_1 my-5`}>
                <span className="hidden lg:block">Cài đặt</span>
            </h1>

            <div className="lg:grid grid-cols-8">
                <div className="hidden lg:block col-span-2 space-y-1">
                    <Link to="/settings/personal" className={`${useMatch("/settings/personal") && btnActive} ${btn}`}>
                        <div className="text-xl">
                            <FaRegUser className="text-primary" />
                        </div>
                        <span className={`heading_3`}>Cài đặt tài khoản</span>
                    </Link>
                    <Link to="/settings/security" className={`${useMatch("/settings/security") && btnActive} ${btn}`}>
                        <div className="text-xl">
                            <FaShieldHalved className="text-primary" />
                        </div>
                        <span className={`heading_3`}>Bảo mật và đăng nhập</span>
                    </Link>
                    <Link to="/settings/notifications" className={`${useMatch("/settings/notifications") && btnActive} ${btn}`}>
                        <div className="text-xl">
                            <FaRegBell className="text-primary" />
                        </div>
                        <span className={`heading_3`}>Cài đặt thông báo</span>
                    </Link>
                </div>
                <div className="col-span-6 lg:pl-10 min-h-screen">
                    <Outlet />
                </div>
            </div>
        </section>
    );
}
export default SettingsPage;
