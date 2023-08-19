import { Popconfirm } from "antd";
import Button from "../../components/Button/Button";
import { I_chiTietKhoaHocGhiDanh } from "../../interfaces/I_quanLyNguoiDung";
import { khoaHocApi } from "../../api/quanLyKhoaHocApi";
import { error, success } from "../../helpers/message";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../redux/store";
import { useState } from "react";

function PopconfirmProfile({ khoaHoc }: { khoaHoc: I_chiTietKhoaHocGhiDanh }) {
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

            const { data, status } = await khoaHocApi.huyDangKyKhoaHoc({ maKhoaHoc });

            console.log("Call API - huyDangKyKhoaHoc", { data, status });

            success("Huỷ đăng ký khoá học thành công");

            setOpen(false);

            setConfirmLoading(false);

            dispatch({ type: "capNhatUserLoginSaga" });
        } catch (err) {
            error("Huỷ đăng ký khoá học không thành công");
        }
    };
    return (
        <Popconfirm
            title="Huỷ đăng ký"
            description="Bạn có chắc chắn huỷ khoá học này không?"
            onConfirm={() => {
                confirm(khoaHoc._id);
            }}
            open={open}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={handleCancel}
            okText="Huỷ"
            cancelText="Không"
        >
            <Button onClick={showPopconfirm} type="red">
                Huỷ đăng ký
            </Button>
        </Popconfirm>
    );
}
export default PopconfirmProfile;
