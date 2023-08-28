import style from "./ModalAuth.module.css";
import { KeyOutlined, ContactsOutlined, MailOutlined, PhoneOutlined, UserOutlined, LoadingOutlined } from "@ant-design/icons";
import logoImg from "../../../assets/logo/L9_logo.png";
import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Button/Button";
import { DispatchType, RootState } from "../../../redux/store";
import { I_register } from "../../../interfaces/userManagementInterface";
import { setIsPageLoginREDU } from "../../../redux/slices/userManagementSlice";

function Register() {
    const [form] = Form.useForm();

    const { isLoadingBtn } = useSelector((state: RootState) => state.loadingSlice);

    const dispatch: DispatchType = useDispatch();

    const onFinish = (values: I_register) => {
        console.log("Success:", values);
        dispatch({
            type: "registerSaga",
            payload: values,
        });
    };

    const classInput = `bg-[#1618230f] px-[20px] py-[12px] w-full transition outline-none rounded-[44px] h-[44px] text-sm font-inter
    border dark:border-slate-700 dark:focus:border-slate-400 
    focus:border-slate-400  border-slate-200 `;

    const handleNavigateRegister = () => {
        dispatch(setIsPageLoginREDU(true));
    };
    return (
        <>
            <div className="">
                <img className="mx-auto w-[38px] h-[38px] rounded-lg" src={logoImg} alt="logo" />
                <h1 className="hidden sm:block text-[#292929] text-center mt-5 dark:text-slate-200 text-4xl font-bold">Đăng ký tài khoản L9</h1>
                <h1 className="block sm:hidden text-[#292929] text-center mt-5 dark:text-slate-200 text-4xl font-bold">Đăng ký</h1>
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
                            <span> Đăng ký</span>
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className=" mt-11">
                <p className="text-center text-base">
                    <span>Bạn đã có tài khoản? </span>
                    <span onClick={handleNavigateRegister} className="font-semibold text-primary hover:text-primary_hover active:text-primary_active cursor-pointer">
                        Đăng nhập
                    </span>
                </p>
            </div>
        </>
    );
}
export default Register;
