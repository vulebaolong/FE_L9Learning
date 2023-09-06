import { I_PropsFormEdit } from "../../interfaces/userManagementInterface";
import { Form, Input } from "antd";
import { useEffect, useState, useMemo } from "react";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/store";
import { error, success } from "../../helpers/message";
import { setIsLoadingBtnREDU } from "../../redux/slices/loadingSlice";
import { LoadingOutlined } from "@ant-design/icons";

function FormUserName({ userLogin, api, logApi, userId }: I_PropsFormEdit) {
    const { isLoadingBtn } = useSelector((state: RootState) => state.loadingSlice);

    const dispatch: DispatchType = useDispatch();

    const [componentDisabled, setComponentDisabled] = useState(true);

    const [focusTarget, setFocusTarget] = useState<string | null>(null);

    const [form] = Form.useForm();

    const onFinish = async (values: { username: string }) => {
        console.log(values);
        try {
            if (api !== undefined) {
                dispatch(setIsLoadingBtnREDU(true));

                const { data, status } = await api({ ...values, userId });

                console.log(`Call API - ${logApi}`, { data, status });

                setComponentDisabled(true);

                success("Đổi Thông tin tài khoản thành công");
            }
        } catch (err) {
            error("Đổi Thông tin tài khoản không thành công");
        } finally {
            if (logApi === "updateOneAccountInfo") dispatch({ type: "updateDisplayAccountSaga" });
            if (logApi === "updateOneUserInfo") dispatch({ type: "updateDisplayUserSaga", payload: userId });
            dispatch(setIsLoadingBtnREDU(false));
        }
    };

    const initialValues = useMemo(
        () => ({
            username: userLogin?.username,
        }),
        [userLogin]
    );

    useEffect(() => {
        form.resetFields();
    }, [initialValues, form]);

    const handleEdit = () => {
        setComponentDisabled(false);
        setFocusTarget("username");
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
                    <Button disabled={isLoadingBtn} className="space-x-2" htmlFor="submit" type="transparent_2">
                        {isLoadingBtn && <LoadingOutlined />}
                        <span>Lưu</span>
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
        <Form form={form} onFinish={onFinish} initialValues={initialValues}>
            <div className="space-y-3 sm:space-y-0 sm:flex justify-between items-center">
                <div className="flex-1">
                    <div className="space-y-4">
                        <h3 className="heading_3">Tài khoản</h3>
                        <Form.Item
                            name="username"
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
                            <Input className="username w-full sm:w-1/2 truncate font-semibold p-0" placeholder="Tài khoản của bạn" bordered={false} disabled={componentDisabled} />
                        </Form.Item>
                        <hr className="dark:!border-gray-700 border-gray-200 !m-0 w-full sm:w-1/2" />
                    </div>
                    <p className="para mt-3">Tài khoản để đăng nhập.</p>
                </div>
                {renderButton(componentDisabled)}
            </div>
        </Form>
    );
}
export default FormUserName;
