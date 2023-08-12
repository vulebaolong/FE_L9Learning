import style from "./ModalAuth.module.css";
import { KeyOutlined, ContactsOutlined, MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { I_PropDangKy, I_dangKy } from "../../interfaces/I_quanLyNguoiDung";
import logoImg from "../../assets/logo/L9_logo.png";
import Button from "../Button/Button";
import { Form, Input } from "antd";
import { DispatchType } from "../../redux/store";
import { useDispatch } from "react-redux";

function DangKy(props: I_PropDangKy) {
    const { handleNavigateDangNhap } = props;

    const [form] = Form.useForm();

    const dispatch: DispatchType = useDispatch();

    const onFinish = (values: I_dangKy) => {
        console.log("Success:", values);
        dispatch({
            type: "dangKySaga",
            payload: values,
        });
    };

    const classInput = `bg-[#1618230f] px-[20px] py-[12px] w-full transition outline-none rounded-[44px] h-[44px] text-sm font-inter
    border dark:border-slate-700 dark:focus:border-slate-400 
    focus:border-slate-400  border-slate-200 `;
    return (
        <>
            <div className="">
                <img className="mx-auto w-[38px] h-[38px] rounded-lg" src={logoImg} alt="logo" />
                <h1 className="text-[#292929] text-center mt-5 dark:text-slate-200 text-4xl font-bold">Đăng ký tài khoản L9</h1>
            </div>
            <div className=" mt-11">
                <Form form={form} layout={"vertical"} onFinish={onFinish} autoComplete="off">
                    {/* HỌ TÊN */}
                    <Form.Item
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
                        hasFeedback
                        className="mb-[10px]"
                    >
                        <Input className={`${style.inputAuth} ${classInput}`} size="large" prefix={<ContactsOutlined />} placeholder="Họ và tên" autoComplete="off" />
                    </Form.Item>

                    {/* TÀI KHOẢN */}
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
                        hasFeedback
                        className="mb-[10px]"
                    >
                        <Input className={`${style.inputAuth} ${classInput}`} size="large" prefix={<UserOutlined />} placeholder="Tài khoản" autoComplete="off" />
                    </Form.Item>

                    {/* MẬT KHẨU */}
                    <Form.Item
                        name="matKhau"
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
                        hasFeedback
                        className="mb-[10px]"
                    >
                        <Input className={`${style.inputAuth} ${classInput}`} prefix={<PhoneOutlined />} size="large" placeholder="Số điện thoại" autoComplete="off" />
                    </Form.Item>

                    <Form.Item className="mt-[20px]">
                        <Button className="" type="gradian">
                            Đăng ký
                        </Button>
                    </Form.Item>

                    {/* <div className="flex items-center py-4 space-x-1">
                            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
                            <p className="px-3 text-sm dark:text-gray-400">Thử với tài khoản có sẵn</p>
                            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
                        </div> */}
                </Form>
            </div>
            <div className=" mt-11">
                <p className="text-center text-base">
                    <span>Bạn đã có tài khoản? </span>
                    <span onClick={handleNavigateDangNhap} className="font-semibold text-primary hover:text-primary_hover active:text-primary_active cursor-pointer">
                        Đăng nhập
                    </span>
                </p>
            </div>
        </>
    );
}
export default DangKy;
