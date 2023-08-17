import { Form, Input } from "antd";
import Button from "../../components/Button/Button";
import { useState, useEffect, useMemo, MouseEvent } from "react";
import { I_componentDisabled, I_thongTinTaiKhoan } from "../../interfaces/I_quanLyNguoiDung";
import { userApi } from "../../api/quanLyNguoiDungApi";

function Personal() {
    const [thongTinTaiKhoan, setThongTinTaiKhoan] = useState<I_thongTinTaiKhoan>();
    const [componentDisabled, setComponentDisabled] = useState<I_componentDisabled>({
        hoTen: true,
        email: true,
    });
    const [focusTarget, setFocusTarget] = useState<string | null>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetch = async () => {
            const { data, status } = await userApi.layThongTinTaiKhoan();
            console.log("Call API - layThongTinTaiKhoan", { data, status });
            // setDanhMucKhoaHoc(data.result.data);
            setThongTinTaiKhoan(data.result.data);
        };
        fetch();
    }, []);
    const onFinish = (values: string) => {
        console.log(values);
    };
    const initialValues = useMemo(
        () => ({
            hoTen: thongTinTaiKhoan?.hoTen,
            email: thongTinTaiKhoan?.email,
        }),
        [thongTinTaiKhoan]
    );

    useEffect(() => {
        form.resetFields();
    }, [initialValues, form]);

    const handleChinhSua = (e: MouseEvent<HTMLButtonElement>) => {
        const name = (e.target as HTMLButtonElement).name;
        const copyComponentDisabled = JSON.parse(JSON.stringify(componentDisabled));
        setComponentDisabled({
            ...copyComponentDisabled,
            [name]: false,
        });
        setFocusTarget(name);
    };

    useEffect(() => {
        if (focusTarget) {
            const element = document.querySelector(`.${focusTarget}`) as HTMLElement;
            if (element) {
                element.focus();
            }
        }
    }, [focusTarget]);

    return (
        <div>
            <h2 className="heading_2">Thông tin cá nhân</h2>
            <hr className="dark:!border-gray-700 border-gray-200 mt-3 mb-5" />
            <Form form={form} onFinish={onFinish} initialValues={initialValues}>
                <div className="space-y-10">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="space-y-3">
                                <h3 className="heading_3">Họ tên</h3>
                                <Form.Item name="hoTen">
                                    <Input className="hoTen font-semibold p-0" placeholder="Tên của bạn" bordered={false} disabled={componentDisabled?.hoTen} />
                                </Form.Item>
                            </div>
                            <p className="para">Tên của bạn xuất hiện trên trang cá nhân và bên cạnh các bình luận của bạn.</p>
                        </div>
                        <Button name="hoTen" onClick={handleChinhSua} htmlFor="button" type="transparent_1">
                            Chỉnh sửa
                        </Button>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="space-y-3">
                                <h3 className="heading_3">Email</h3>
                                <Form.Item name="email">
                                    <Input className="email font-semibold p-0" placeholder="Email của bạn" bordered={false} disabled={componentDisabled?.email} />
                                </Form.Item>
                            </div>
                        </div>
                        <Button name="email" onClick={handleChinhSua} htmlFor="button" type="transparent_1">
                            Chỉnh sửa
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    );
}
export default Personal;
