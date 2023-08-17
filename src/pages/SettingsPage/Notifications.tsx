import { Switch } from "antd";
import { MouseEvent, useState } from "react";

function Notifications() {
    const [isSwitchBaiHocMoi, setIsSwitchBaiHocMoi] = useState(true);
    const [isSwitchThongBaoBaiHocMoi, setIsSwitchThongBaoBaiHocMoi] = useState(true);
    const [isSwitchNhacBinhLuan, setIsSwitchNhacBinhLuan] = useState(true);
    const [isSwitchTLBinhLuan, setIsSwitchTLBinhLuan] = useState(true);
    const [isSwitchCXBinhLuan, setIsSwitchCXBinhLuan] = useState(true);
    const [isSwitchBinhLuatBlog, setIsSwitchBinhLuatBlog] = useState(true);
    const [isSwitchCXBlog, setIsSwitchCXBlog] = useState(true);
    const [isSwitchThaoLuan, setIsSwitchThaoLuan] = useState(true);

    const handleBaiHocMoi = () => {
        if (isSwitchBaiHocMoi) setIsSwitchBaiHocMoi(false);
        if (!isSwitchBaiHocMoi) setIsSwitchBaiHocMoi(true);
    };
    const handleThongBaoBaiHocMoi = () => {
        if (isSwitchThongBaoBaiHocMoi) setIsSwitchThongBaoBaiHocMoi(false);
        if (!isSwitchThongBaoBaiHocMoi) setIsSwitchThongBaoBaiHocMoi(true);
    };
    const handleNhacBinhLuan = () => {
        if (isSwitchNhacBinhLuan) setIsSwitchNhacBinhLuan(false);
        if (!isSwitchNhacBinhLuan) setIsSwitchNhacBinhLuan(true);
    };
    const handleTLBinhLuan = () => {
        if (isSwitchTLBinhLuan) setIsSwitchTLBinhLuan(false);
        if (!isSwitchTLBinhLuan) setIsSwitchTLBinhLuan(true);
    };
    const handleCXBinhLuan= () => {
        if (isSwitchCXBinhLuan) setIsSwitchCXBinhLuan(false);
        if (!isSwitchCXBinhLuan) setIsSwitchCXBinhLuan(true);
    };
    const handleBinhLuatBlog = () => {
        if (isSwitchBinhLuatBlog) setIsSwitchBinhLuatBlog(false);
        if (!isSwitchBinhLuatBlog) setIsSwitchBinhLuatBlog(true);
    };
    const handleCXBlog = () => {
        if (isSwitchCXBlog) setIsSwitchCXBlog(false);
        if (!isSwitchCXBlog) setIsSwitchCXBlog(true);
    };
    const handleThaoLuan = () => {
        if (isSwitchThaoLuan) setIsSwitchThaoLuan(false);
        if (!isSwitchThaoLuan) setIsSwitchThaoLuan(true);
    };
    const box = `flex justify-between items-center py-[12px] px-[20px] rounded-lg hover:bg-[#e8ebed] dark:hover:bg-[#e8ebed23] cursor-pointer transition`;
    return (
        <div className="space-y-8">
            <div>
                <h2 className="heading_2">Email</h2>
                <hr className="dark:!border-gray-700 border-gray-200 mt-3 mb-5" />
                <div className="space-y-2">
                    <p>Gửi email cho tôi khi có:</p>
                    <div onClick={handleBaiHocMoi} className={`${box}`}>
                        <p className="para">Bài học mới</p>
                        <Switch checked={isSwitchBaiHocMoi} />
                    </div>
                </div>
            </div>
            <div>
                <h2 className="heading_2">Thông báo</h2>
                <hr className="dark:!border-gray-700 border-gray-200 mt-3 mb-5" />
                <div className="space-y-2">
                    <p>Gửi thông báo cho tôi khi có:</p>
                    <div onClick={handleThongBaoBaiHocMoi} className={`${box}`}>
                        <p className="para">Bài học mới</p>
                        <Switch checked={isSwitchThongBaoBaiHocMoi} />
                    </div>
                    <div onClick={handleNhacBinhLuan} className={`${box}`}>
                        <p className="para">Nhắc đến trong bình luận</p>
                        <Switch checked={isSwitchNhacBinhLuan} />
                    </div>
                    <div onClick={handleTLBinhLuan} className={`${box}`}>
                        <p className="para">Trả lời bình luận</p>
                        <Switch checked={isSwitchTLBinhLuan} />
                    </div>
                    <div onClick={handleCXBinhLuan} className={`${box}`}>
                        <p className="para">Cảm xúc trong bình luận</p>
                        <Switch checked={isSwitchCXBinhLuan} />
                    </div>
                    <div onClick={handleBinhLuatBlog} className={`${box}`}>
                        <p className="para">Bình luận trong bài blog</p>
                        <Switch checked={isSwitchBinhLuatBlog} />
                    </div>
                    <div onClick={handleCXBlog} className={`${box}`}>
                        <p className="para">Cảm xúc trong bài blog</p>
                        <Switch checked={isSwitchCXBlog} />
                    </div>
                    <div onClick={handleThaoLuan} className={`${box}`}>
                        <p className="para">Câu trả lời được chọn trong màn thảo luận</p>
                        <Switch checked={isSwitchThaoLuan} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Notifications;
