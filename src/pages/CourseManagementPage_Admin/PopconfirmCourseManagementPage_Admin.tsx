import { Popconfirm } from "antd";
import Button from "../../components/Button/Button";
import { I_motKhoaHoc } from "../../interfaces/I_quanLyKhoaHoc";
import { khoaHocApi } from "../../api/quanLyKhoaHocApi";
import { error, success } from "../../helpers/message";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../redux/store";

function PopconfirmCourseManagementPage_Admin({ khoaHoc }: { khoaHoc: I_motKhoaHoc }) {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const dispatch: DispatchType = useDispatch();

    const showPopconfirm = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        console.log("Clicked cancel button");
        setOpen(false);
    };

    const confirm = async (maKhoaHoc: string) => {
        console.log(maKhoaHoc);

        try {
            setConfirmLoading(true);

            const { data, status } = await khoaHocApi.xoaKhoaHoc(maKhoaHoc);

            console.log("Call API - xoaKhoaHoc", { data, status });

            success("Xoá khoá học thành công");

            dispatch({ type: "layDanhSachKhoaHocSaga" });
        } catch (err) {
            error("Xoá khoá học không thành công");
        } finally {
            setOpen(false);

            setConfirmLoading(false);
        }
    };
    return (
        <Popconfirm
            title="Xoá khoá học"
            description="Bạn có chắc chắn xóa khoá học này không?"
            onConfirm={() => {
                confirm(khoaHoc._id);
            }}
            open={open}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={handleCancel}
            okText="Xoá"
            cancelText="Không"
        >
            <Button onClick={showPopconfirm} type="red">
                Xoá
            </Button>
        </Popconfirm>
    );
}
export default PopconfirmCourseManagementPage_Admin;
