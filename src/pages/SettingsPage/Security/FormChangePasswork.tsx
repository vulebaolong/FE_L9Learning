import { useState, useEffect } from "react";
import { userApi } from "../../../api/userApi";
import { Form, Input } from "antd";
import { error, success } from "../../../helpers/message";
import Button from "../../../components/Button/Button";

function FormChangePasswork() {
    const [componentDisabled, setComponentDisabled] = useState(true);

    const [focusTarget, setFocusTarget] = useState<string | null>(null);

    const [form] = Form.useForm();

    const onFinish = async (values: { currentPassword: string; newPassword: string }) => {
        console.log(values);
        try {
            const { data, status } = await userApi.updatePassword(values);

            console.log("Call API - updatePassword", { data, status });

            setComponentDisabled(true);

            success("Đổi mật khẩu thành công");

            form.resetFields()
        } catch (err) {
            error("Đổi mật khẩu không thành công");
        }
    };

    const handleEdit = () => {
        setComponentDisabled(false);
        setFocusTarget("currentPassword");
    };

    const handleCancel = () => {
        setComponentDisabled(true);
    };

    const renderButton = (componentDisabled: boolean) => {
        if (componentDisabled) {
            return (
                <Button onClick={handleEdit} htmlFor="button" type="transparent_1">
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
                    <Button onClick={handleCancel} htmlFor="button" type="transparent_1">
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
        <Form form={form} onFinish={onFinish}>
            <div className="space-y-3 sm:space-y-0 sm:flex justify-between items-center">
                <div className="flex-1">
                    <div className="space-y-4">
                        <h3 className="heading_3">Thay đổi mật khẩu</h3>
                        <Form.Item
                            className="m-0 p-0"
                            name="currentPassword"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mật khẩu hiện tại",
                                },
                                {
                                    pattern: /^\S{6,}$/,
                                    message: "Mật khẩu tối thiểu 6 ký tự",
                                },
                            ]}
                        >
                            <Input className="currentPassword w-full sm:w-1/2 truncate font-semibold p-0" placeholder="Mật khẩu hiện tại của bạn" bordered={false} disabled={componentDisabled} />
                        </Form.Item>
                        <hr className="dark:!border-gray-700 border-gray-200 !m-0 w-full sm:w-1/2" />
                        <Form.Item
                            className="m-0 p-0"
                            name="newPassword"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mật khẩu mới",
                                },
                                {
                                    pattern: /^\S{6,}$/,
                                    message: "Mật khẩu tối thiểu 6 ký tự",
                                },
                            ]}
                        >
                            <Input className="w-full sm:w-1/2 truncate font-semibold p-0" placeholder="Mật khẩu mới của bạn" bordered={false} disabled={componentDisabled} />
                        </Form.Item>
                        <hr className="dark:!border-gray-700 border-gray-200 !m-0 w-full sm:w-1/2" />
                    </div>
                </div>
                {renderButton(componentDisabled)}
            </div>
        </Form>
    );
}
export default FormChangePasswork;
