import style from "./ModalAuth.module.css";
import { I_PropDangNhap, I_dangNhap } from "../../interfaces/I_quanLyNguoiDung";
import logoImg from "../../assets/logo/L9_logo.png";
import Button from "../Button/Button";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { DispatchType } from "../../redux/store";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function DangNhap(props: I_PropDangNhap) {
    const { handleNavigateDangKy } = props;

    const [form] = Form.useForm();

    const dispatch: DispatchType = useDispatch();

    const onFinish = (values: I_dangNhap) => {
        console.log("Success:", values);
        dispatch({
            type: "dangNhapSaga",
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
                <h1 className="text-[#292929] text-center mt-5 dark:text-slate-200 text-4xl font-bold">Đăng nhập vào L9</h1>
            </div>
            <div className=" mt-11">
                <Form form={form} layout={"vertical"} onFinish={onFinish} autoComplete="off">
                    <Form.Item
                        name="taiKhoan"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tài khoản",
                            },
                        ]}
                        hasFeedback
                        className="mb-[10px]"
                    >
                        <Input className={`${style.inputAuth} ${classInput}`} size="large" prefix={<UserOutlined />} placeholder="Tài khoản" autoComplete="taiKhoan" />
                    </Form.Item>

                    <Form.Item
                        name="matKhau"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu",
                            },
                        ]}
                        hasFeedback
                        className="m-0"
                    >
                        <Input.Password
                            className={`${style.inputAuth} ${classInput}`}
                            prefix={<KeyOutlined />}
                            id="warning"
                            size="large"
                            placeholder="Mật khẩu"
                            autoComplete="current-password"
                        />
                    </Form.Item>

                    <Form.Item className="mt-[20px]">
                        <Button className="" type="gradian">
                            Đăng nhập
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
                    <span>Bạn chưa có tài khoản? </span>
                    <span onClick={handleNavigateDangKy} className="font-semibold text-primary hover:text-primary_hover active:text-primary_active cursor-pointer">
                        Đăng ký
                    </span>
                </p>
                <p className="text-center text-base">
                    <Link to="/register" className="font-semibold text-primary hover:text-primary_hover active:text-primary_active">
                        Quên mật khẩu
                    </Link>
                </p>
            </div>
        </>
    );
}
export default DangNhap;
