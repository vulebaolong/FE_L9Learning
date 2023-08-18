import { useEffect, useState } from "react";
import { userApi } from "../../api/quanLyNguoiDungApi";
import { I_thongTinTaiKhoan } from "../../interfaces/I_quanLyNguoiDung";
import { FaUserGroup } from "react-icons/fa6";
import { Typography } from "antd";

function ProfilePage() {
    const [thongTinTaiKhoan, setThongTinTaiKhoan] = useState<I_thongTinTaiKhoan>();

    useEffect(() => {
        const fetch = async () => {
            const { data, status } = await userApi.layThongTinTaiKhoan();
            console.log("Call API - layThongTinTaiKhoan", { data, status });
            // setDanhMucKhoaHoc(data.result.data);
            setThongTinTaiKhoan(data.result.data);
        };
        fetch();
    }, []);
    const box = `px-[18px] py-[14px] shadow-[0_0_5px_0_rgba(0,0,0,.1),0_0_1px_0_rgba(0,0,0,.1)] dark:shadow-[0_0_5px_0_rgba(255,255,255,.1),0_0_1px_0_rgba(255,255,255,.1)] rounded-lg space-y-5`;
    const para = `text-black/80 text-sm dark:text-slate-400`;
    return (
        <section className="pb-24">
            <div className="container">
                {/* BANNER */}
                <div className="aspect-[25/7] rounded-b-xl overflow-hidden">
                    <img className="w-full object-cover" src={thongTinTaiKhoan?.bannerProfile} alt="" />
                </div>

                {/* BODY */}
                <div className="px-5 space-y-5">
                    {/* INFO */}
                    <div className="relative flex">
                        {/* AVATAR */}
                        <div className="absolute bottom-0 left-0 aspect-square w-44 border-4 border-white dark:border-slate-900  rounded-full overflow-hidden">
                            <img className="w-full object-cover" src={thongTinTaiKhoan?.avatar} alt="" />
                        </div>
                        <div className="w-44 flex-shrink-0"></div>
                        {/* NAME */}
                        <div className="my-5 ml-5 w-full">
                            <p className="w-1/2 truncate">{thongTinTaiKhoan?.hoTen}</p>
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-5">
                            <div className={`${box} space-y-5`}>
                                <h4 className="heading_3">Giới thiệu</h4>
                                <div className="flex items-center gap-2">
                                    <FaUserGroup className="text-xl" />
                                    <p className={`${para}`}>
                                        Thành viên của <strong>L9 - Học lập trình để đi làm</strong> từ 2 năm trước
                                    </p>
                                </div>
                            </div>
                            <div className={`${box} space-y-5`}>
                                <h4 className="heading_3">Hoạt động gần đây</h4>
                                <div className="flex items-center gap-2">
                                    <p className={`${para}`}>Chưa có hoạt động gần đây</p>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div className={`${box}`}>
                                <h4 className="heading_3">Các khóa học đã tham gia</h4>
                                <div className="space-y-5">
                                    {thongTinTaiKhoan?.chiTietKhoaHocGhiDanh.map((chiTietKhoaHocGhiDanh) => {
                                        return (
                                            <div key={chiTietKhoaHocGhiDanh._id} className="grid grid-cols-2 gap-5">
                                                <div className={`aspect-[292/165] relative rounded-2xl overflow-hidden`}>
                                                    <img className="w-full h-full object-cover" src={chiTietKhoaHocGhiDanh.hinhAnh} alt="" />
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="heading_3 truncate">{chiTietKhoaHocGhiDanh.tenKhoaHoc}</p>
                                                    <Typography.Paragraph className={`${para}`} ellipsis={{rows: 5}}>{chiTietKhoaHocGhiDanh.moTa}</Typography.Paragraph>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default ProfilePage;
