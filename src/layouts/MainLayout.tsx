import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import SideBar from "../components/SideBar/SideBar";

function MainLayout() {
    return (
        <>
            <Header />
            <div className="flex min-h-screen h-[3000px]">
                <div className="flex-shrink-0 w-sideBar">
                    <SideBar />
                </div>
                <div className="pl-[20px] pr-[40px] py-[20px] w-content">
                    <Outlet />
                </div>
            </div>
        </>
    );
}
export default MainLayout;
