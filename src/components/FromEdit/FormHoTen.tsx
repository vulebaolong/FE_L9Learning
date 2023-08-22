import { Form, Input } from "antd";
import Button from "../Button/Button";
import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../redux/store";
import { error, success } from "../../helpers/message";
import { I_PropsFormEdit } from "../../interfaces/I_quanLyNguoiDung";

function FormHoTen({ userLogin, api, logApi, idNguoiDung }: I_PropsFormEdit) {
    const dispatch: DispatchType = useDispatch();

    const [componentDisabled, setComponentDisabled] = useState(true);

    const [focusTarget, setFocusTarget] = useState<string | null>(null);

    const [form] = Form.useForm();

    const onFinish = async (values: { hoTen: string }) => {
        console.log(values);
        try {
            if (api !== undefined) {
                const { data, status } = await api({ ...values, idNguoiDung });

                console.log(`Call API - ${logApi}`, { data, status });

                setComponentDisabled(true);

                success("Đổi Thông tin họ tên thành công");
            }
        } catch (err) {
            error("Đổi Thông tin họ tên không thành công");
        } finally {
            if (logApi === "capNhatMotThongTinTaiKhoan") dispatch({ type: "capNhatUserLoginSaga" });
            if (logApi === "capNhatMotThongTinNguoiDung") dispatch({ type: "capNhatThongTinNguoiDungSaga", payload: idNguoiDung });
        }
    };

    const initialValues = useMemo(
        () => ({
            hoTen: userLogin?.hoTen,
        }),
        [userLogin]
    );

    useEffect(() => {
        form.resetFields();
    }, [initialValues, form]);

    const handleChinhSua = () => {
        setComponentDisabled(false);
        setFocusTarget("hoTen");
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
            <div className="space-y-3 sm:space-y-0 sm:flex justify-between items-center gap-2">
                <div className="flex-1">
                    <div className="space-y-4">
                        <h3 className="heading_3">Họ tên</h3>
                        <Form.Item
                            className="m-0 p-0"
                            name="hoTen"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập họ và tên",
                                },
                                {
                                    pattern: /^[\p{L}\s]+$/u,
                                    message: "Họ và tên chỉ bao gồm chữ, khoảng trắng",
                                },
                            ]}
                        >
                            <Input className="hoTen w-full sm:w-1/2 truncate font-semibold p-0" placeholder="Tên của bạn" bordered={false} disabled={componentDisabled} />
                        </Form.Item>
                        <hr className="dark:!border-gray-700 border-gray-200 !m-0 w-full sm:w-1/2" />
                    </div>
                    <p className="para mt-3">Tên của bạn xuất hiện trên trang cá nhân và bên cạnh các bình luận của bạn.</p>
                </div>
                {renderButton(componentDisabled)}
            </div>
        </Form>
    );
}
export default FormHoTen;
