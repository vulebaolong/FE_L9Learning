import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../../redux/store";
import { Avatar, Popover, Tag } from "antd";
import { navigate } from "../../../helpers/navigate";
import { setIsDraweREDU } from "../../../redux/slices/drawerSlice";
import { lcStorage } from "../../../helpers/localStorage";
import { ACCESS_TOKEN, USER_LOGIN } from "../../../contants/userContants";
import Logo from "../../Logo/Logo";
import { useState } from "react";

function LogedMobile() {
    const { userLogin } = useSelector((state: RootState) => state.userManagementSlice);

    const [isOpenPopupSetting, setIsOpenPopupSetting] = useState(false);

    const handleOpenChange = (newOpen: boolean) => {
        setIsOpenPopupSetting(newOpen);
    };

    const dispatch: DispatchType = useDispatch();

    const renderTag = () => {
        if (userLogin.userType === "Customer") {
            return <Tag color="green">khách hàng</Tag>;
        }
        if (userLogin.userType === "Admin") {
            return <Tag color="red">admin</Tag>;
        }
    };

    const textItem = `text-base cursor-pointer transition
    text-[#666] hover:text-[#292929]
    dark:text-white/70 dark:hover:text-white/90`;

    const handleProfile = () => {
        navigate("/profile");
        dispatch(setIsDraweREDU(false));
    };

    const handleCourse = () => {
        navigate("/courses");
        dispatch(setIsDraweREDU(false));
    };

    const handleHome = () => {
        navigate("/");
        dispatch(setIsDraweREDU(false));
    };

    const handleRoadmap = () => {
        navigate("/roadmap");
        dispatch(setIsDraweREDU(false));
    };

    const handleSettingPersonal = () => {
        navigate("/settings/personal");
        setIsOpenPopupSetting(false);
        dispatch(setIsDraweREDU(false));
    };

    const handleSettingSecurity = () => {
        navigate("/settings/security");
        setIsOpenPopupSetting(false);
        dispatch(setIsDraweREDU(false));
    };

    const handleSettingNotifications = () => {
        navigate("/settings/notifications");
        setIsOpenPopupSetting(false);
        dispatch(setIsDraweREDU(false));
    };

    const handleLogout = () => {
        navigate("/");
        lcStorage.remove(USER_LOGIN);
        lcStorage.remove(ACCESS_TOKEN);
        // Reload lại trang web
        window.location.reload();
    };

    const handleCourseManagement = () => {
        navigate("/coursemanagement");
        dispatch(setIsDraweREDU(false));
    };

    const handleUserManagement = () => {
        navigate("/usermanagement");
        dispatch(setIsDraweREDU(false));
    };

    const renderControllAdmin = () => {
        if (userLogin.userType !== "Admin") return;

        return (
            <>
                <div>
                    <span className={textItem} onClick={handleCourseManagement}>
                        Quản lý khoá học
                    </span>
                </div>
                <div className="mt-4">
                    <span className={textItem} onClick={handleUserManagement}>
                        Quản lý người dùng
                    </span>
                </div>
                <hr className="dark:!border-gray-700 border-gray-200" />
            </>
        );
    };

    const content = (
        <div className="space-y-7 py-5">
            <div>
                <span className={textItem} onClick={handleSettingPersonal}>
                    Cài đặt tài khoản
                </span>
            </div>
            <div>
                <span className={textItem} onClick={handleSettingSecurity}>
                    Bảo mật và đăng nhập
                </span>
            </div>
            <div>
                <span className={textItem} onClick={handleSettingNotifications}>
                    Cài đặt thông báo
                </span>
            </div>
        </div>
    );

    return (
        <div className="space-y-7">
            <div className="flex lg:hidden items-center gap-2">
                <Logo />
                <h4 className="text-sm font-bold">Học Lập Trình Để Đi Làm</h4>
            </div>

            {/* AVATAR */}
            <div className="flex items-center gap-3 w-full">
                <div className="">
                    <Avatar src={<img src={userLogin.avatar} alt="avatar" />} size={60} />
                </div>
                <div className=" whitespace-normal max-w-[154px] space-y-1">
                    {renderTag()}
                    <p className="text-base font-bold truncate ">{userLogin.fullName}</p>
                </div>
            </div>

            <hr className="dark:!border-gray-700 border-gray-200" />

            {/* TRANG CHỦ */}
            <div className="">
                <span className={textItem} onClick={handleHome}>
                    Trang chủ
                </span>
            </div>

            {/* TRANG CÁ NHÂN */}
            <div className="mt-4">
                <span className={textItem} onClick={handleProfile}>
                    Trang cá nhân
                </span>
            </div>

            <hr className="dark:!border-gray-700 border-gray-200" />

            {/* ADMIN */}
            {renderControllAdmin()}

            {/* LỘ TRÌNH */}
            <div className="">
                <span className={textItem} onClick={handleRoadmap}>
                    Lộ trình
                </span>
            </div>

            {/* KHOÁ HỌC */}
            <div className="mt-4">
                <span className={textItem} onClick={handleCourse}>
                    Khoá học
                </span>
            </div>

            <hr className="dark:!border-gray-700 border-gray-200" />

            {/* CÀI ĐẶT */}
            <div className="">
                <Popover onOpenChange={handleOpenChange} open={isOpenPopupSetting} placement="right" content={content} trigger="click">
                    <span className={textItem}>Cài đặt</span>
                </Popover>
            </div>

            {/* ĐĂNG XUẤT */}
            <div className="mt-4">
                <span className={textItem} onClick={handleLogout}>
                    Đăng xuất
                </span>
            </div>
        </div>
    );
}
export default LogedMobile;
