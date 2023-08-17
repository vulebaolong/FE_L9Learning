import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/store";
import style from "./ListCoursePage_Admin.module.css";
import Button from "../../components/Button/Button";
import { navigate } from "../../helpers/navigate";
import { MouseEvent, useEffect } from "react";
import { Popconfirm } from "antd";

function ListCoursePage_Admin() {
    const dispatch: DispatchType = useDispatch();
    useEffect(() => {
        dispatch({ type: "layDanhSachKhoaHocSaga" });
    }, []);
    const { danhSachKhoaHoc } = useSelector((state: RootState) => state.quanLyKhoaHocSlice);
    const handleChinhSuaKhoaHoc = (idKhoaHoc: string) => {
        navigate(`/editcourse/${idKhoaHoc}`);
    };

    const confirm = (idKhoaHoc: string, e?: MouseEvent<HTMLElement>) => {
        console.log(e);
        dispatch({ type: "xoaKhoaHocSaga", payload: idKhoaHoc });
    };
    return (
        <section className="pb-24">
            <h2 className="heading_1">Danh sách khoá học</h2>

            <div className="grid grid-cols-4 gap-7 mt-5">
                {danhSachKhoaHoc.map((khoaHoc) => {
                    return (
                        <div key={khoaHoc._id} className="">
                            <div className={`${style.overlay} aspect-[292/165] relative rounded-2xl overflow-hidden`}>
                                <div className={`${style.actionButton} flex flex-col gap-2`}>
                                    <Button
                                        onClick={() => {
                                            handleChinhSuaKhoaHoc(khoaHoc._id);
                                        }}
                                        type="white"
                                    >
                                        Chỉnh sửa
                                    </Button>
                                    <Popconfirm
                                        title="Xoá khoá học"
                                        description="Bạn có chắc chắn xóa khoá học này không?"
                                        onConfirm={(e) => {
                                            confirm(khoaHoc._id, e);
                                        }}
                                        okText="Xoá"
                                        cancelText="Không"
                                    >
                                        <Button type="red">Xoá</Button>
                                    </Popconfirm>
                                </div>
                                <img className="w-full h-full object-cover" src={khoaHoc.hinhAnh} alt="" />
                            </div>
                            <p className="heading_3 mt-3">{khoaHoc.tenKhoaHoc}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
export default ListCoursePage_Admin;
