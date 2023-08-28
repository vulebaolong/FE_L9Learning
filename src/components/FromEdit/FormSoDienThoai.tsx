import { useDispatch } from "react-redux";
import { DispatchType } from "../../redux/store";
import { useEffect, useMemo, useState } from "react";
import { Form, Input } from "antd";
import { error, success } from "../../helpers/message";
import Button from "../Button/Button";
import { I_PropsFormEdit } from "../../interfaces/userManagementInterface";

function FormSoDienThoai({ userLogin, api, logApi, userId }: I_PropsFormEdit) {
    const dispatch: DispatchType = useDispatch();

    const [componentDisabled, setComponentDisabled] = useState(true);

    const [focusTarget, setFocusTarget] = useState<string | null>(null);

    const [form] = Form.useForm();

    const onFinish = async (values: { phoneNumber: string }) => {
        console.log(values);
        try {
            if (api !== undefined) {
                const { data, status } = await api({ ...values, userId });

                console.log(`Call API - ${logApi}`, { data, status });

                setComponentDisabled(true);

                success("Đổi Thông tin số điện thoại thành công");
            }
        } catch (err) {
            error("Đổi Thông tin số điện thoại không thành công");
        } finally {
            if (logApi === "updateOneAccountInfo") dispatch({ type: "updateDisplayAccountSaga" });
            if (logApi === "updateOneUserInfo") dispatch({ type: "updateDisplayUserSaga", payload: userId });
        }
    };

    const initialValues = useMemo(
        () => ({
            phoneNumber: userLogin?.phoneNumber,
        }),
        [userLogin]
    );

    useEffect(() => {
        form.resetFields();
    }, [initialValues, form]);

    const handleChinhSua = () => {
        setComponentDisabled(false);
        setFocusTarget("phoneNumber");
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
            <div className="space-y-3 sm:space-y-0 sm:flex justify-between items-center">
                <div className="flex-1">
                    <div className="space-y-4">
                        <h3 className="heading_3">Số điện thoại</h3>
                        <Form.Item
                            className="m-0 p-0"
                            name="phoneNumber"
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
                            <Input className="phoneNumber w-full sm:w-1/2 truncate font-semibold p-0" placeholder="Số điện thoại của bạn" bordered={false} disabled={componentDisabled} />
                        </Form.Item>
                        <hr className="dark:!border-gray-700 border-gray-200 !m-0 w-full sm:w-1/2" />
                    </div>
                    <p className="para mt-3">Điện thoại liên kết với L9.</p>
                </div>
                {renderButton(componentDisabled)}
            </div>
        </Form>
    );
}
export default FormSoDienThoai;
