import { Avatar, Popover, Tag } from "antd";
import { useState } from "react";
import { I_PropLogged } from "../../interfaces/userManagementInterface.js";
import { lcStorage } from "../../helpers/localStorage.js";
import { ACCESS_TOKEN, USER_LOGIN } from "../../contants/userContants.js";
import { navigate } from "../../helpers/navigate.js";

function Logged(props: I_PropLogged) {
    const { userLogin } = props;

    const [isOpenPopupUser, setIsOpenPopupUser] = useState(false);

    const handleOpenChange = (newOpen: boolean) => {
        setIsOpenPopupUser(newOpen);
    };

    const renderTag = () => {
        if (userLogin.userType === "Customer") {
            return <Tag color="green">khách hàng</Tag>;
        }
        if (userLogin.userType === "Admin") {
            return <Tag color="red">admin</Tag>;
        }
    };

    const handleDangXuat = () => {
        navigate("/");
        lcStorage.remove(USER_LOGIN);
        lcStorage.remove(ACCESS_TOKEN);
        // Reload lại trang web
        window.location.reload();
    };

    const handleCourseManagement = () => {
        navigate("/coursemanagement");
        setIsOpenPopupUser(false);
    };

    const handleProfile = () => {
        navigate("/profile");
        setIsOpenPopupUser(false);
    };

    const handleSetting = () => {
        navigate("/settings/personal");
        setIsOpenPopupUser(false);
    };

    const handleCourse = () => {
        navigate("/courses");
        setIsOpenPopupUser(false);
    };

    const handleUserManagement = () => {
        navigate("/usermanagement");
        setIsOpenPopupUser(false);
    };

    const handleApi = () => {
        navigate("/api");
        setIsOpenPopupUser(false);
    };

    const textItem = `text-base cursor-pointer transition
    text-[#666] hover:text-[#292929]
    dark:text-white/70 dark:hover:text-white/90`;

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
                <hr className="dark:!border-gray-700 border-gray-200 my-5" />
            </>
        );
    };

    const content = (
        <div className="w-[250px] p-3 ">
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

            <hr className="dark:!border-gray-700 border-gray-200 my-5" />

            {/* API*/}
            <div className="">
                <span className={textItem} onClick={handleApi}>
                    Api
                </span>
            </div>


            {/* TRANG CÁ NHÂN */}
            <div className="mt-4">
                <span className={textItem} onClick={handleProfile}>
                    Trang cá nhân
                </span>
            </div>

            {/* KHOÁ HỌC */}
            <div className="mt-4">
                <span className={textItem} onClick={handleCourse}>
                    Khoá học
                </span>
            </div>
            <hr className="dark:!border-gray-700 border-gray-200 my-5" />

            {/* ADMIN */}
            {renderControllAdmin()}

            {/* CÀI ĐẶT */}
            <div className="">
                <span className={textItem} onClick={handleSetting}>
                    Cài đặt
                </span>
            </div>

            {/* ĐĂNG XUẤT */}
            <div className="mt-4">
                <span className={textItem} onClick={handleDangXuat}>
                    Đăng xuất
                </span>
            </div>
        </div>
    );

    return (
        <Popover onOpenChange={handleOpenChange} open={isOpenPopupUser} className="cursor-pointer" content={content} trigger="click" placement="bottomRight">
            <Avatar
                onClick={() => {
                    setIsOpenPopupUser(true);
                }}
                src={<img src={userLogin.avatar} alt="avatar" />}
                size={35}
            />
        </Popover>
    );
}
export default Logged;
