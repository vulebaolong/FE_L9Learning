import { DatePicker, Form, Input, InputNumber, Modal, Rate, Switch, Upload, UploadFile } from "antd";
import TextArea from "antd/es/input/TextArea";
import style from "./AddCoursePage_Admin.module.css";
import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import Button from "../../components/Button/Button";
import { getBase64 } from "../../helpers/antdHelper";
import { RcFile, UploadProps } from "antd/es/upload";

function AddCoursePage_Admin() {
    const [form] = Form.useForm();
    const onFinish = (values: object) => {
        values.ngayKhoiChieu = moment(values.ngayKhoiChieu.$d).format("DD/MM/YYYY");
        if (typeof values.hinhAnh === "object") {
            values.hinhAnh = values.hinhAnh.file.originFileObj;
        }

        if (values.dangChieu === undefined) values.dangChieu = false;
        if (values.hot === undefined) values.hot = false;
        if (values.sapChieu === undefined) values.sapChieu = false;

        console.log("values", values);

        const formData = new FormData();
        formData.append("tenPhim", values.tenPhim);
        formData.append("trailer", values.trailer);
        formData.append("moTa", values.moTa);
        formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
        formData.append("dangChieu", values.dangChieu);
        formData.append("sapChieu", values.sapChieu);
        formData.append("hot", values.hot);
        formData.append("danhGia", values.danhGia);
        formData.append("maNhom", values.maNhom);
        if (typeof values.hinhAnh === "string") {
            formData.append("hinhAnh", null);
        }
        if (typeof values.hinhAnh === "object") {
            formData.append("hinhAnh", values.hinhAnh, values.hinhAnh.name);
        }
        console.log(formData.get("hinhAnh"));
        console.log(formData.get("ngayKhoiChieu"));
        // dispatch(addMovieMID(formData)).then((result) => {
        //   if (result?.mes) result?.type(result?.mes);
        //   if (result?.mes === "Thêm phim thành công") navigate("/list-movie");
        // });
    };

    const [loading, setLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile) as string;
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
    };
    const handleChange: UploadProps['onChange'] =  (info) => {
        if (info.file.status === "uploading") setLoading(true);

        if (info.file.status === "done") setLoading(false);

        if (info.file.status === "error") setLoading(false);
    };
    const handleCancel = () => setPreviewOpen(false);

    const styleInput = `dark:!bg-gray-700/60 bg-transparent dark:!shadow-[rgba(0,0,0,0.20)_0px_5px_10px] shadow-[rgba(149,157,165,0.1)_0px_8px_24px]`;

    return (
        <div>
            <h1 className="mt-4 font-bold text-3xl dark:text-slate-200 mb-5">Thêm khoá học</h1>
            <div
                className={`${style.form} dark:!shadow-[rgba(0,0,0,0.35)_0px_5px_15px] shadow-[rgba(149,157,165,0.1)_0px_8px_24px] p-4 rounded-3xl border sm:p-6 xl:p-8 dark:bg-gray-800/50 backdrop-blur-sm dark:border-gray-700`}
            >
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    {/* TÊN KHOÁ HỌC */}
                    <Form.Item
                        label={<span className="text-base font-bold">Tên khoá học</span>}
                        name="tenKhoaHoc"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên khoá học",
                            },
                        ]}
                        hasFeedback
                    >
                        <Input size="large" className={`${style.input} ${styleInput}`} placeholder="Tên khoá học" autoComplete="off" />
                    </Form.Item>

                    {/* MÔ TẢ */}
                    <Form.Item
                        label={<span className="text-base font-bold">Mô tả</span>}
                        name="moTa"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mô tả",
                            },
                        ]}
                        hasFeedback
                    >
                        <TextArea rows={4} size="large" className={`${style.input} ${styleInput}`} placeholder="Mô tả" autoComplete="off" />
                    </Form.Item>

                    {/* GIÁ KHOA HOC*/}
                    <Form.Item
                        label={<span className="text-base font-bold">Giá khoá học</span>}
                        name="giaTien"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập giá khoá học",
                            },
                        ]}
                        hasFeedback
                    >
                        <InputNumber size="large" className={`INPUTNUMBER ${style.input} ${styleInput}`} min={75000} max={150000} autoComplete="off" />
                    </Form.Item>

                    {/* HÌNH ẢNH */}
                    <Form.Item
                        label={<span className="text-base font-bold">Hình ảnh</span>}
                        name="hinhAnh"
                        valuePropName="file"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng tải hình ảnh",
                            },
                        ]}
                        hasFeedback
                    >
                        <Upload
                            listType="picture-card"
                            accept="image/png, image/jpeg"
                            maxCount={1}
                            customRequest={({ file, onSuccess }) => {
                                setTimeout(() => {
                                    if (onSuccess) {
                                        // Kiểm tra xem onSuccess tồn tại trước khi gọi
                                        onSuccess("ok");
                                    }
                                }, 0);
                            }}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            
                        >
                            <div className="UPLOAD">
                                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img
                            alt="example"
                            style={{
                                width: "100%",
                            }}
                            src={previewImage}
                        />
                    </Modal>

                    {/* BUTTON */}
                    <Form.Item>
                        <Button className="px-10 py-3" type="primary">
                            <span className="text-base">Thêm khoá học</span>
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
export default AddCoursePage_Admin;
