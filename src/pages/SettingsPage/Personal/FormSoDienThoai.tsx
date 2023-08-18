import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../../redux/store";
import { useEffect, useMemo, useState } from "react";
import { Form, Input } from "antd";
import { userApi } from "../../../api/quanLyNguoiDungApi";
import { error, success } from "../../../helpers/message";
import Button from "../../../components/Button/Button";

function FormSoDienThoai() {
    const dispatch: DispatchType = useDispatch();

    const { userLogin } = useSelector((state: RootState) => state.quanLyNguoiDungSlice);

    const [componentDisabled, setComponentDisabled] = useState(true);

    const [focusTarget, setFocusTarget] = useState<string | null>(null);

    const [form] = Form.useForm();

    const onFinish = async (values: { soDt: string }) => {
        console.log(values);
        try {
            const { data, status } = await userApi.capNhatMotThongTinNguoiDung(values);

            console.log("Call API - capNhatMotThongTinNguoiDung", { data, status });

            setComponentDisabled(true);

            success("Đổi Thông tin họ tên thành công");
        } catch (err) {
            error("Đổi Thông tin họ tên không thành công");
        } finally {
            dispatch({ type: "capNhatUserLoginSaga" });
        }
    };

    const initialValues = useMemo(
        () => ({
            soDt: userLogin?.soDt,
        }),
        [userLogin]
    );

    useEffect(() => {
        form.resetFields();
    }, [initialValues, form]);

    const handleChinhSua = () => {
        setComponentDisabled(false);
        setFocusTarget("soDt");
    };

    const handleHuy = () => {
        setComponentDisabled(true);
    };

    const renderButton = (componentDisabled: boolean) => {
        if (componentDisabled) {
            return (
                <Button onClick={handleChinhSua} htmlFor="button" type="transparent_1">
                    Chỉnh sửa
                </Button>
            );
        }
        if (!componentDisabled) {
            return (
                <div className="flex items-center gap-2">
                    <Button htmlFor="submit" type="transparent_2">
                        Lưu
                    </Button>
                    <Button onClick={handleHuy} htmlFor="button" type="transparent_1">
                        Huỷ
                    </Button>
                </div>
            );
        }
    };

    useEffect(() => {
        if (focusTarget && !componentDisabled) {
            const element = document.querySelector(`.${focusTarget}`) as HTMLElement;
            if (element) element.focus();
        }
    }, [componentDisabled, focusTarget]);

    return (
        <Form form={form} onFinish={onFinish} initialValues={initialValues}>
            <div className="flex justify-between items-center">
                <div className="flex-1">
                    <div className="space-y-4">
                        <h3 className="heading_3">Số điện thoại</h3>
                        <Form.Item
                            className="m-0 p-0"
                            name="soDt"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập số điện thoại",
                                },
                                {
                                    pattern: /^\d{10}$/,
                                    message: "Số điện thoại phải là 10 chữ số",
                                },
                            ]}
                        >
                            <Input className="soDt w-1/2 truncate font-semibold p-0" placeholder="Số điện thoại của bạn" bordered={false} disabled={componentDisabled} />
                        </Form.Item>
                        <hr className="dark:!border-gray-700 border-gray-200 !m-0 w-1/2" />
                    </div>
                    <p className="para mt-3">Điện thoại liên kết với L9.</p>
                </div>
                {renderButton(componentDisabled)}
            </div>
        </Form>
    );
}
export default FormSoDienThoai;
