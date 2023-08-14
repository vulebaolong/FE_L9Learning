import { Button, Form, Input, InputNumber, Modal, Space, Upload, UploadFile } from "antd";
import TextArea from "antd/es/input/TextArea";
import style from "./AddCoursePage_Admin.module.css";
import { useState } from "react";
import { LoadingOutlined, PlusOutlined, MinusCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ButtonMe from "../../components/Button/Button";
import { getBase64 } from "../../helpers/antdHelper";
import { RcFile, UploadProps } from "antd/es/upload";
import { I_motKhoaHoc } from "../../interfaces/I_quanLyKhoaHoc";

function AddCoursePage_Admin() {
    const [arrChuong, setArrChuong] = useState([]);
    console.log(arrChuong);

    const [form] = Form.useForm();
    const onFinish = (values: I_motKhoaHoc) => {
        const copyValues = JSON.parse(JSON.stringify(values));
        values.seHocDuoc = copyValues.seHocDuoc.map((item: { item: string }) => item.item);
        console.log("values", values);

        // values.ngayKhoiChieu = moment(values.ngayKhoiChieu.$d).format("DD/MM/YYYY");
        // if (typeof values.hinhAnh === "object") {
        //     values.hinhAnh = values.hinhAnh.file.originFileObj;
        // }

        // if (values.dangChieu === undefined) values.dangChieu = false;
        // if (values.hot === undefined) values.hot = false;
        // if (values.sapChieu === undefined) values.sapChieu = false;

        // console.log("values", values);

        // const formData = new FormData();
        // formData.append("tenPhim", values.tenPhim);
        // formData.append("trailer", values.trailer);
        // formData.append("moTa", values.moTa);
        // formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
        // formData.append("dangChieu", values.dangChieu);
        // formData.append("sapChieu", values.sapChieu);
        // formData.append("hot", values.hot);
        // formData.append("danhGia", values.danhGia);
        // formData.append("maNhom", values.maNhom);
        // if (typeof values.hinhAnh === "string") {
        //     formData.append("hinhAnh", null);
        // }
        // if (typeof values.hinhAnh === "object") {
        //     formData.append("hinhAnh", values.hinhAnh, values.hinhAnh.name);
        // }
        // console.log(formData.get("hinhAnh"));
        // console.log(formData.get("ngayKhoiChieu"));
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
            file.preview = (await getBase64(file.originFileObj as RcFile)) as string;
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
    };
    const handleChange: UploadProps["onChange"] = (info) => {
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

                    {/* SẼ HỌC ĐƯỢC */}
                    <p className="text-base font-bold mb-2">Sẽ học được gì?</p>
                    <Form.List name="seHocDuoc">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <div key={key} className="flex items-center mb-2 gap-2 w-full">
                                        <Form.Item className="flex-1" {...restField} name={[name, "item"]} rules={[{ required: true, message: "Vui lòng nhập sẽ học được gì" }]}>
                                            <Input size="large" className={`${style.input} ${styleInput} `} placeholder="Sẽ học được" autoComplete="off" />
                                        </Form.Item>
                                        <MinusCircleOutlined className="mb-6 text-lg" onClick={() => remove(name)} />
                                    </div>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Thêm trường
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    {/* CHƯƠNG HỌC */}
                    <p className="text-base font-bold mb-2">
                        <span className="text-red-700">* </span> Chương học
                    </p>
                    <div className="space-y-3 ">
                        {arrChuong.map((item, index) => {
                            return (
                                <div key={item} className="border-4 relative border-gray-600 rounded-xl p-5">
                                    <MinusCircleOutlined
                                        className="absolute top-2 right-2 text-2xl"
                                        onClick={() => {
                                            let copyArrChuong = JSON.parse(JSON.stringify(arrChuong));
                                            copyArrChuong = copyArrChuong.filter((itemChuong: number) => {
                                                return +itemChuong !== +item;
                                            });
                                            console.log(copyArrChuong);

                                            setArrChuong(copyArrChuong);
                                        }}
                                    />
                                    <Form.Item
                                        label={<span className="text-base font-bold mr-auto">{`Tiêu đề chương ${item + 1}`}</span>}
                                        name={`titleChuong_${item + 1}`}
                                        rules={[
                                            {
                                                required: true,
                                                message: `Vui lòng nhập tiêu đề chương ${item + 1}`,
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input size="large" className={`${style.input} ${styleInput}`} placeholder={`Tiêu đề chương ${index + 1}`} autoComplete="off" />
                                    </Form.Item>

                                    <hr className="dark:!border-gray-700 border-gray-200 my-5" />

                                    <Form.List name={`chuongHoc${index + 1}`}>
                                        {(fields, { add, remove }) => (
                                            <>
                                                {fields.map(({ key, name, ...restField }) => (
                                                    <div key={key} className="flex items-center mb-2 gap-2 w-full">
                                                        <div className="flex gap-2 items-center flex-1">
                                                            <Form.Item
                                                                className="basis-1/2"
                                                                {...restField}
                                                                name={[name, "title_video"]}
                                                                rules={[{ required: true, message: "Vui lòng nhập tiêu đề video" }]}
                                                            >
                                                                <Input size="large" className={`${style.input} ${styleInput} `} placeholder="Tiêu đề video" autoComplete="off" />
                                                            </Form.Item>
                                                            <Form.Item
                                                                className="basis-1/2"
                                                                {...restField}
                                                                name={[name, "video_url"]}
                                                                rules={[{ required: true, message: "Vui lòng nhập đường dẫn video" }]}
                                                            >
                                                                <Input size="large" className={`${style.input} ${styleInput} `} placeholder="Đường dẫn video" autoComplete="off" />
                                                            </Form.Item>
                                                        </div>
                                                        <MinusCircleOutlined className="mb-6 text-lg" onClick={() => remove(name)} />
                                                    </div>
                                                ))}
                                                <Form.Item className="m-0">
                                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                        Thêm trường
                                                    </Button>
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                </div>
                            );
                        })}
                    </div>
                    <Form.Item className="mt-5">
                        <Button
                            type="dashed"
                            onClick={() => {
                                const copyArrChuong = JSON.parse(JSON.stringify(arrChuong));
                                let resultPush = 0;
                                if (copyArrChuong.length > 0) {
                                    resultPush = copyArrChuong[copyArrChuong.length - 1] + 1;
                                }
                                copyArrChuong.push(resultPush);
                                setArrChuong(copyArrChuong);
                            }}
                            block
                            icon={<PlusOutlined />}
                        >
                            Thêm Chương
                        </Button>
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
                        <ButtonMe className="px-10 py-3" type="primary">
                            <span className="text-base">Thêm khoá học</span>
                        </ButtonMe>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
export default AddCoursePage_Admin;
