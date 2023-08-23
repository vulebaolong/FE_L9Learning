import { Button, Popconfirm } from "antd";
import { DataType } from "../../../interfaces/I_quanLyNguoiDung";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../../redux/store";
import { DeleteOutlined } from "@ant-design/icons";
import { userApi } from "../../../api/quanLyNguoiDungApi";
import { error, success } from "../../../helpers/message";
import { setDanhSachNguoiDungREDU } from "../../../redux/slices/quanLyNguoiDungSlice";

function PopconfirmUserManagement_Admin({ nguoiDung }: { nguoiDung: DataType }) {
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

    const confirm = async (idNguoiDung: string) => {
        console.log(idNguoiDung);

        try {
            setConfirmLoading(true);

            // Xoá người dùng
            const { data: data1, status: status1 }= await userApi.xoaNguoiDung(idNguoiDung);

            console.log("Call API - xoaNguoiDung", { data1, status1 });

            // Cập nhật lại danh sách người dùng
            const { data: data2, status: status2 } = await userApi.layDanhSachNguoiDung();

            console.log("Call API - layDanhSachNguoiDung", { data2, status2 });

            dispatch(setDanhSachNguoiDungREDU(data2.result.data))

            success("Xoá người dùng thành công");
        } catch (err) {
            error("Xoá người dùng không thành công");
        } finally {
            setOpen(false);

            setConfirmLoading(false);
        }
    };
    return (
        <Popconfirm
            title="Xoá người dùng"
            description="Bạn có chắc muốn xoá người dùng này?"
            onConfirm={() => confirm(nguoiDung.key)}
            open={open}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={handleCancel}
            okText="Xoá"
            cancelText="Không"
        >
            <Button onClick={showPopconfirm} type="primary" danger icon={<DeleteOutlined />} />
        </Popconfirm>
    );
}
export default PopconfirmUserManagement_Admin;
