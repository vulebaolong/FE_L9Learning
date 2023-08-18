import { Form, Input } from "antd";
import { DispatchType, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userApi } from "../../../api/quanLyNguoiDungApi";
import { error, success } from "../../../helpers/message";
import Button from "../../../components/Button/Button";

function FormEmail() {
    const dispatch: DispatchType = useDispatch();

    const { userLogin } = useSelector((state: RootState) => state.quanLyNguoiDungSlice);

    const [componentDisabled, setComponentDisabled] = useState(true);

    const [focusTarget, setFocusTarget] = useState<string | null>(null);

    const [form] = Form.useForm();

    const onFinish = async (values: { email: string }) => {
        console.log(values);
        try {
            const { data, status } = await userApi.capNhatMotThongTinNguoiDung(values);

            console.log("Call API - capNhatMotThongTinNguoiDung", { data, status });

            setComponentDisabled(true);

            success("Đổi Thông tin email thành công");
        } catch (err) {
            error("Đổi Thông tin email không thành công");
        } finally {
            dispatch({ type: "capNhatUserLoginSaga" });
        }
    };

    const initialValues = useMemo(
        () => ({
            email: userLogin?.email,
        }),
        [userLogin]
    );

    useEffect(() => {
        form.resetFields();
    }, [initialValues, form]);

    const handleChinhSua = () => {
        setComponentDisabled(false);
        setFocusTarget("email");
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
                        <h3 className="heading_3">Email</h3>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập email",
                                },
                                {
                                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Email phải đúng định dạng",
                                },
                            ]}
                        >
                            <Input className="email w-1/2 truncate font-semibold p-0" placeholder="Email của bạn" bordered={false} disabled={componentDisabled} />
                        </Form.Item>
                        <hr className="dark:!border-gray-700 border-gray-200 !m-0 w-1/2" />
                    </div>
                    <p className="para mt-3">Nhận thông tin quan trọng từ L9</p>
                </div>
                {renderButton(componentDisabled)}
            </div>
        </Form>
    );
}
export default FormEmail;
