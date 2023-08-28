import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import SideBar from "../components/SideBar/SideBar";
import Footer from "../components/Footer/Footer";

function MainLayout() {
    return (
        <>
            <Header />
            <div className="flex min-h-screen">
                <div className="hidden lg:block flex-shrink-0 w-sideBar">
                    <SideBar />
                </div>

                <div
                    className="
                    container py-5
                    lg:pl-[20px] lg:pr-[40px] lg:py-[20px] lg:w-content
                    "
                >
                    <Outlet />
                </div>

                {/* MOBILE */}
                {/* <div className="lg:hidden container py-5">
                    <Outlet />
                </div> */}
            </div>
            <Footer />
        </>
    );
}
export default MainLayout;
