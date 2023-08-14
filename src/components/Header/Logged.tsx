import { Avatar, Popover, Tag } from "antd";
import { useState } from "react";
import { I_PropLogged } from "../../interfaces/I_quanLyNguoiDung";
import { lcStorage } from "../../helpers/localStorage.js";
import { USER_LOGIN } from "../../contants/userContants.js";
import { navigate } from "../../helpers/navigate.js";

function Logged(props: I_PropLogged) {
    const { userLogin } = props;

    const [isOpenPopupUser, setIsOpenPopupUser] = useState(false);

    const handleOpenChange = (newOpen: boolean) => {
        setIsOpenPopupUser(newOpen);
    };

    const renderTag = () => {
        if (userLogin.maLoaiNguoiDung === "KhachHang") {
            return <Tag color="green">khách hàng</Tag>;
        }
        if (userLogin.maLoaiNguoiDung === "QuanTri") {
            return <Tag color="red">admin</Tag>;
        }
    };

    const handleDangXuat = () => {
        lcStorage.remove(USER_LOGIN);
        // Reload lại trang web
        window.location.reload();
    };

    const handleThemKhoaHoc = () => {
        navigate("/addcourse");
        setIsOpenPopupUser(false);
    };

    const renderControllAdmin = () => {
        if (userLogin.maLoaiNguoiDung !== "QuanTri") return;

        return (
            <>
                <div className="">
                    <span
                        onClick={handleThemKhoaHoc}
                        className="text-base cursor-pointer transition
                text-[#666] hover:text-[#292929]
                dark:text-white/70 dark:hover:text-white/90
                "
                    >
                        Thêm khoá học
                    </span>
                </div>
                <div className="mt-4">
                    <span
                        className="text-base cursor-pointer transition
                text-[#666] hover:text-[#292929]
                dark:text-white/70 dark:hover:text-white/90
                "
                    >
                        Danh sách khoá học
                    </span>
                </div>
                <hr className="dark:!border-gray-700 border-gray-200 my-5" />
            </>
        );
    };

    const content = (
        <div className="w-[250px] p-3 ">
            <div className="flex items-center gap-3 w-full">
                <div className="">
                    <Avatar src={<img src={userLogin.avatar} alt="avatar" />} size={60} />
                </div>
                <div className=" whitespace-normal max-w-[154px] space-y-1">
                    {renderTag()}
                    <p className="text-base font-bold truncate ">{userLogin.hoTen}</p>
                </div>
            </div>

            <hr className="dark:!border-gray-700 border-gray-200 my-5" />

            {renderControllAdmin()}

            <div className="">
                <span
                    className="text-base cursor-pointer transition
                text-[#666] hover:text-[#292929]
                dark:text-white/70 dark:hover:text-white/90
                "
                >
                    Trang cá nhân
                </span>
            </div>
            <div className="mt-4">
                <span
                    className="text-base cursor-pointer transition
                text-[#666] hover:text-[#292929]
                dark:text-white/70 dark:hover:text-white/90
                "
                >
                    Khoá học
                </span>
            </div>

            <hr className="dark:!border-gray-700 border-gray-200 my-5" />

            {/* CÀI ĐẶT */}
            <div className="">
                <span
                    className="text-base cursor-pointer transition
                text-[#666] hover:text-[#292929]
                dark:text-white/70 dark:hover:text-white/90
                "
                >
                    Cài đặt
                </span>
            </div>

            {/* ĐĂNG XUẤT */}
            <div className="mt-4">
                <span
                    onClick={handleDangXuat}
                    className="text-base cursor-pointer transition
                text-[#666] hover:text-[#292929]
                dark:text-white/70 dark:hover:text-white/90
                "
                >
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
