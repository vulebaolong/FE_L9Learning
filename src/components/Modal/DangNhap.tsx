import style from "./ModalAuth.module.css";
import { I_PropDangNhap, I_dangNhap } from "../../interfaces/I_quanLyNguoiDung";
import logoImg from "../../assets/logo/L9_logo.png";
import Button from "../Button/Button";
import { UserOutlined, KeyOutlined, LoadingOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { DispatchType, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setAutofillREDU, setIsPageDangNhapREDU } from "../../redux/slices/quanLyNguoiDungSlice";
import { useEffect } from "react";
import { Store } from "antd/es/form/interface";

function DangNhap() {
    const { autofill } = useSelector((state: RootState) => state.quanLyNguoiDungSlice);
    const { isLoadingBtn } = useSelector((state: RootState) => state.loadingSlice);

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

    const handleNavigateDangNhap = () => {
        dispatch(setIsPageDangNhapREDU(false));
    };

    const initialValues = autofill as Store | undefined;

    useEffect(() => form.resetFields(), [autofill, form]);

    const handleKhachHang = () => {
        dispatch(setAutofillREDU({ taiKhoan: "khachhang", matKhau: "123456" }));
    };

    const handleQuanTri = () => {
        dispatch(setAutofillREDU({ taiKhoan: "quantri", matKhau: "123456" }));
    };

    return (
        <>
            <div className="">
                <img className="mx-auto w-[38px] h-[38px] rounded-lg" src={logoImg} alt="logo" />
                <h1 className="text-[#292929] text-center mt-5 dark:text-slate-200 text-4xl font-bold">Đăng nhập vào L9</h1>
            </div>
            <div className=" mt-11">
                <Form form={form} layout={"vertical"} onFinish={onFinish} initialValues={initialValues} autoComplete="off">
                    {/* TÀI KHOẢN */}
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

                    {/* MẬT KHẨU */}
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

                    {/* BUTTON */}
                    <Form.Item className="mt-[20px]">
                        <Button disabled={isLoadingBtn} className="space-x-2" type="gradian">
                            {isLoadingBtn && <LoadingOutlined />}
                            <span>Đăng nhập</span>
                        </Button>
                    </Form.Item>

                    <div className="flex items-center py-4 space-x-1">
                        <div className="flex-1 h-px sm:w-16 bg-gray-300 dark:bg-gray-700"></div>
                        <p className="px-3 text-sm dark:text-gray-400">Thử với tài khoản có sẵn</p>
                        <div className="flex-1 h-px sm:w-16 bg-gray-300 dark:bg-gray-700"></div>
                    </div>

                    <div className="flex gap-5 items-center">
                        <Button onClick={handleKhachHang} className="w-full px-0 !border-slate-500" htmlFor="button" type="bg-whiteblack">
                            Khách hàng
                        </Button>
                        <Button onClick={handleQuanTri} className="w-full px-0 !border-slate-500" htmlFor="button" type="bg-whiteblack">
                            Quản trị
                        </Button>
                    </div>
                </Form>
            </div>
            <div className=" mt-11">
                <p className="text-center text-base">
                    <span>Bạn chưa có tài khoản? </span>
                    <span onClick={handleNavigateDangNhap} className="font-semibold text-primary hover:text-primary_hover active:text-primary_active cursor-pointer">
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
