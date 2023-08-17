import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import SideBar from "../components/SideBar/SideBar";
import ModalAuth from "../components/Modal/ModalAuth";
import Footer from "../components/Footer/Footer";

function MainLayout() {
    return (
        <>
            <Header />
            <div className="flex min-h-screen">
                <div className="flex-shrink-0 w-sideBar">
                    <SideBar />
                </div>
                <div className="pl-[20px] pr-[40px] py-[20px] w-content">
                    <Outlet />
                </div>
            </div>
            <Footer />
            <ModalAuth />
        </>
    );
}
export default MainLayout;
