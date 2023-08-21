import { I_PropsFormEdit } from "../../interfaces/I_quanLyNguoiDung";
import { Form, Input } from "antd";
import { useEffect, useState, useMemo } from "react";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../redux/store";
import { error, success } from "../../helpers/message";

function FormTaiKhoan({ userLogin, api, logApi, idNguoiDung }: I_PropsFormEdit) {
    const dispatch: DispatchType = useDispatch();

    const [componentDisabled, setComponentDisabled] = useState(true);

    const [focusTarget, setFocusTarget] = useState<string | null>(null);

    const [form] = Form.useForm();

    const onFinish = async (values: { taiKhoan: string }) => {
        console.log(values);
        try {
            if (api !== undefined) {
                const { data, status } = await api({ ...values, idNguoiDung });

                console.log(`Call API - ${logApi}`, { data, status });

                setComponentDisabled(true);

                success("Đổi Thông tin tài khoản thành công");
            }
        } catch (err) {
            error("Đổi Thông tin tài khoản không thành công");
        } finally {
            if (logApi === "capNhatMotThongTinTaiKhoan") dispatch({ type: "capNhatUserLoginSaga" });
            if (logApi === "capNhatMotThongTinNguoiDung") dispatch({ type: "capNhatThongTinNguoiDungSaga", payload: idNguoiDung });
        }
    };

    const initialValues = useMemo(
        () => ({
            taiKhoan: userLogin?.taiKhoan,
        }),
        [userLogin]
    );

    useEffect(() => {
        form.resetFields();
    }, [initialValues, form]);

    const handleChinhSua = () => {
        setComponentDisabled(false);
        setFocusTarget("taiKhoan");
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
                        <h3 className="heading_3">Tài khoản</h3>
                        <Form.Item
                            name="taiKhoan"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tài khoản",
                                },
                                {
                                    pattern: /^\S+$/,
                                    message: "Không chứa khoảng trắng",
                                },
                                {
                                    pattern: /^[a-zA-Z0-9\s]+$/,
                                    message: "Chỉ gồm chữ hoặc số",
                                },
                            ]}
                        >
                            <Input className="taiKhoan w-1/2 truncate font-semibold p-0" placeholder="Tài khoản của bạn" bordered={false} disabled={componentDisabled} />
                        </Form.Item>
                        <hr className="dark:!border-gray-700 border-gray-200 !m-0 w-1/2" />
                    </div>
                    <p className="para mt-3">Tài khoản để đăng nhập.</p>
                </div>
                {renderButton(componentDisabled)}
            </div>
        </Form>
    );
}
export default FormTaiKhoan;
