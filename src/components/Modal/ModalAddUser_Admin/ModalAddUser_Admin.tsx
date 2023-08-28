import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../../redux/store";
import { setIsOpenModalAddUserREDU } from "../../../redux/slices/modalSlice";
import { Form, Input, Modal } from "antd";
import { I_register } from "../../../interfaces/userManagementInterface";
import style from "./ModalAddUser_Admin.module.css";
import { ContactsOutlined, UserOutlined, KeyOutlined, MailOutlined, PhoneOutlined, LoadingOutlined } from "@ant-design/icons";
import Button from "../../Button/Button";
import { useEffect } from "react";

function ModalAddUser_Admin() {
    const [form] = Form.useForm();

    const { isLoadingBtn } = useSelector((state: RootState) => state.loadingSlice);

    const { isOpenModalAddUser } = useSelector((state: RootState) => state.modalSlice);

    const dispatch: DispatchType = useDispatch();

    useEffect(() => {
        if (isOpenModalAddUser) form.resetFields();
    }, [isOpenModalAddUser, form]);

    const handleCancel = () => {
        dispatch(setIsOpenModalAddUserREDU(false));
    };

    const onFinish = (values: I_register) => {
        console.log("Success:", values);
        dispatch({
            type: "addUserSaga",
            payload: values,
        });
    };

    const classInput = `bg-[#1618230f] px-[20px] py-[12px] w-full transition outline-none rounded-[44px] h-[44px] text-sm font-inter
    border dark:border-slate-700 dark:focus:border-slate-400 
    focus:border-slate-400  border-slate-200 `;
    return (
        <Modal footer={false} maskClosable={true} onCancel={handleCancel} centered open={isOpenModalAddUser}>
            <div className="py-8 px-11">
                <div className="">
                    <h1 className="text-[#292929] text-center mt-5 dark:text-slate-200 text-4xl font-bold">Thêm người dùng</h1>
                </div>
                <div className=" mt-11">
                    <Form form={form} layout={"vertical"} onFinish={onFinish} autoComplete="off">
                        {/* HỌ TÊN */}
                        <Form.Item
                            name="fullName"
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
                            hasFeedback
                            className="mb-[10px]"
                        >
                            <Input className={`${style.inputAuth} ${classInput}`} size="large" prefix={<ContactsOutlined />} placeholder="Họ và tên" autoComplete="off" />
                        </Form.Item>

                        {/* TÀI KHOẢN */}
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
                            hasFeedback
                            className="mb-[10px]"
                        >
                            <Input className={`${style.inputAuth} ${classInput}`} size="large" prefix={<UserOutlined />} placeholder="Tài khoản" autoComplete="off" />
                        </Form.Item>

                        {/* MẬT KHẨU */}
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mật khẩu",
                                },
                                {
                                    pattern: /^\S{6,}$/,
                                    message: "Mật khẩu tối thiểu 6 ký tự",
                                },
                            ]}
                            hasFeedback
                            className="mb-[10px]"
                        >
                            <Input.Password className={`${style.inputAuth} ${classInput}`} prefix={<KeyOutlined />} size="large" placeholder="Mật khẩu" autoComplete="off" />
                        </Form.Item>

                        {/* EMAIL */}
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
                            hasFeedback
                            className="mb-[10px]"
                        >
                            <Input className={`${style.inputAuth} ${classInput}`} prefix={<MailOutlined />} size="large" placeholder="Email" autoComplete="off" />
                        </Form.Item>

                        {/* SỐ ĐIỆN THOẠI */}
                        <Form.Item
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
                            hasFeedback
                            className="mb-[10px]"
                        >
                            <Input className={`${style.inputAuth} ${classInput}`} prefix={<PhoneOutlined />} size="large" placeholder="Số điện thoại" autoComplete="off" />
                        </Form.Item>

                        {/* BUTTON */}
                        <Form.Item className="mt-[20px]">
                            <Button disabled={isLoadingBtn} className="space-x-2" type="gradian">
                                {isLoadingBtn && <LoadingOutlined />}
                                <span>Thêm người dùng</span>
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Modal>
    );
}
export default ModalAddUser_Admin;
