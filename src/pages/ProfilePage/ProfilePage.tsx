import { MouseEvent, useEffect, useState } from "react";
import { userApi } from "../../api/quanLyNguoiDungApi";
import { I_thongTinTaiKhoan } from "../../interfaces/I_quanLyNguoiDung";
import { FaUserGroup } from "react-icons/fa6";
import { Popconfirm, Typography } from "antd";
import Button from "../../components/Button/Button";
import style from "./ProfilePage.module.css";
import { navigate } from "../../helpers/navigate";
import { khoaHocApi } from "../../api/quanLyKhoaHocApi";
import { DispatchType } from "../../redux/store";
import { useDispatch } from "react-redux";
import { error, success } from "../../helpers/message";

function ProfilePage() {
    const dispatch: DispatchType = useDispatch();

    const [thongTinTaiKhoan, setThongTinTaiKhoan] = useState<I_thongTinTaiKhoan>();

    console.log(thongTinTaiKhoan);

    useEffect(() => {
        const fetch = async () => {
            const { data, status } = await userApi.layThongTinTaiKhoan();
            console.log("Call API - layThongTinTaiKhoan", { data, status });
            setThongTinTaiKhoan(data.result.data);
        };
        fetch();
    }, []);

    const renderDaDangKyKhoaHoc = () => {
        const length = thongTinTaiKhoan?.chiTietKhoaHocGhiDanh.length;
        console.log(length);

        if (length === undefined) return;
        if (length > 0)
            return (
                <>
                    Đã đăng ký <strong>{length}</strong> khoá học
                </>
            );
        if (length === 0) return `Chưa đăng ký khoá học`;
    };

    const box = `px-[18px] py-[14px] shadow-[0_0_5px_0_rgba(0,0,0,.1),0_0_1px_0_rgba(0,0,0,.1)] dark:shadow-[0_0_5px_0_rgba(255,255,255,.1),0_0_1px_0_rgba(255,255,255,.1)] rounded-lg space-y-5`;

    const handleTiepTucHoc = (khoaHocId: string) => {
        navigate(`/detailcourse/${khoaHocId}`);
    };

    const confirm = async (maKhoaHoc: string) => {
        console.log(maKhoaHoc);

        try {
            const { data, status } = await khoaHocApi.huyDangKyKhoaHoc({ maKhoaHoc });

            console.log("Call API - huyDangKyKhoaHoc", { data, status });

            success("Huỷ đăng ký khoá học thành công");

            dispatch({ type: "capNhatUserLoginSaga" });
        } catch (err) {
            error("Huỷ đăng ký khoá học không thành công");
        }
    };

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
                            <img className="w-full h-full object-cover" src={thongTinTaiKhoan?.avatar} alt="" />
                        </div>
                        <div className="w-44 flex-shrink-0"></div>

                        {/* CHI TIẾT */}
                        <div className="my-5 ml-5 w-full">
                            <p className="font-extrabold text-2xl w-1/2 truncate">{thongTinTaiKhoan?.hoTen}</p>
                            <p className="w-1/2 truncate">{renderDaDangKyKhoaHoc()}</p>
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="grid grid-cols-2 gap-5">
                        {/* HOẠT ĐỘNG */}
                        <div className="space-y-5">
                            <div className={`${box} space-y-5`}>
                                <h4 className="heading_3">Giới thiệu</h4>
                                <div className="flex items-center gap-2">
                                    <FaUserGroup className="text-xl" />
                                    <p className={`para`}>
                                        Thành viên của <strong>L9 - Học lập trình để đi làm</strong> từ 2 năm trước
                                    </p>
                                </div>
                            </div>
                            <div className={`${box} space-y-5`}>
                                <h4 className="heading_3">Hoạt động gần đây</h4>
                                <div className="flex items-center gap-2">
                                    <p className={`para`}>Chưa có hoạt động gần đây</p>
                                </div>
                            </div>
                        </div>

                        {/* CÁC KHOÁ HỌC ĐÃ THAM GIA */}
                        <div className="">
                            <div className={`${box}`}>
                                <h4 className="heading_3">Các khóa học đã tham gia</h4>
                                <div className="space-y-5">
                                    {thongTinTaiKhoan?.chiTietKhoaHocGhiDanh.length === 0 && "Chưa đăng ký khoá học"}
                                    {thongTinTaiKhoan?.chiTietKhoaHocGhiDanh.map((khoaHoc) => {
                                        return (
                                            <div key={khoaHoc._id} className="grid grid-cols-2 gap-5">
                                                {/* HÌNH ẢNH */}
                                                <div className={`${style.overlay} aspect-[292/165] relative rounded-2xl overflow-hidden`}>
                                                    <div className={`${style.actionButton} flex flex-col gap-2 items-center`}>
                                                        <Button
                                                            onClick={() => {
                                                                handleTiepTucHoc(khoaHoc._id);
                                                            }}
                                                            type="white"
                                                        >
                                                            Tiếp tục học
                                                        </Button>
                                                        <Popconfirm
                                                            title="Huỷ đăng ký"
                                                            description="Bạn có chắc chắn huỷ khoá học này không?"
                                                            onConfirm={(e) => {
                                                                confirm(khoaHoc._id, e);
                                                            }}
                                                            okText="Huỷ"
                                                            cancelText="Không"
                                                        >
                                                            <Button type="red">Huỷ đăng ký</Button>
                                                        </Popconfirm>
                                                    </div>
                                                    <img className="w-full h-full object-cover" src={khoaHoc.hinhAnh} alt="" />
                                                </div>

                                                {/* MÔ TẢ */}
                                                <div className="space-y-2">
                                                    <p className="heading_3 truncate">{khoaHoc.tenKhoaHoc}</p>
                                                    <Typography.Paragraph className={`para`} ellipsis={{ rows: 5 }}>
                                                        {khoaHoc.moTa}
                                                    </Typography.Paragraph>
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
