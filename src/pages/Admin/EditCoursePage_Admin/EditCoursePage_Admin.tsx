import { Button, Form, Input, InputNumber, Modal, Select, Upload, UploadProps } from "antd";
import style from "./EditCoursePage_Admin.module.css";
import TextArea from "antd/es/input/TextArea";
import { MinusCircleOutlined, PlusOutlined, CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getBase64 } from "../../../helpers/antdHelper";
import { RcFile, UploadFile } from "antd/es/upload";
import ButtonMe from "../../../components/Button/Button";
import { courseApi } from "../../../api/courseApi";
import { useParams } from "react-router-dom";
import { I_courseCategory, I_singleCourse, I_courseValues } from "../../../interfaces/courseManagementInterface";
import { DispatchType, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { setIsLoadingPageREDU } from "../../../redux/slices/loadingSlice";
import { wait } from "../../../helpers/awaitHelper";
import { DELAY_LOADING_PAGE } from "../../../contants/configContants";

function EditCoursePage_Admin() {
    const { isLoadingBtn } = useSelector((state: RootState) => state.loadingSlice);

    const { id } = useParams();

    const [form] = Form.useForm();

    const [oneCourse, setOneCourse] = useState<I_singleCourse | null>(null);

    const dispatch: DispatchType = useDispatch();

    const [chapterArray, setChapterArray] = useState([]);

    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            if (id !== undefined) {
                try {
                    dispatch(setIsLoadingPageREDU(true));

                    const { data: data1 } = await courseApi.getListCourseCategories();
                    console.log("fetch - getListCourseCategories", { data1 });
                    setCourseCategories(data1.result.data);

                    const { data: data2 } = await courseApi.getCourseById(id);
                    console.log("fetch - getCourseById", { data2 });

                    setOneCourse(data2.result.data);

                    const indexChuongHoc = data2.result.data.lessons.map((item, index) => index);

                    setChapterArray(indexChuongHoc);

                    await wait(DELAY_LOADING_PAGE);

                    dispatch(setIsLoadingPageREDU(false));
                } catch (err) {
                    console.log(err);

                    await wait(DELAY_LOADING_PAGE);

                    dispatch(setIsLoadingPageREDU(false));
                }
            }
        };
        fetch();
    }, [id]);

    const initialValues = () => {
        const willLearn = oneCourse?.willLearn.map((item) => {
            return { item };
        });

        const objTitleChapter: { [key: string]: string } = {};
        oneCourse?.lessons.forEach((item, index) => {
            objTitleChapter[`titleChuong_${index + 1}`] = item.title;
        });
        const objChapter: { [key: string]: { title_video: string; video_url: string }[] } = {};

        oneCourse?.lessons.forEach((chuong, index) => {
            objChapter[`lessons${index + 1}`] = chuong.videos.map((video) => ({
                title_video: video.title,
                video_url: video.video_url,
            }));
        });

        return {
            ...oneCourse,
            willLearn,
            ...objTitleChapter,
            ...objChapter,
            courseCategory_ID: oneCourse?.courseCategory_ID._id,
        };
    };

    useEffect(() => form.resetFields(), [oneCourse, form]);

    const onFinish = (values: I_courseValues) => {
        const copyValues = JSON.parse(JSON.stringify(values));

        if (!copyValues.willLearn) {
            values.willLearn = [];
        } else {
            values.willLearn = copyValues.willLearn.map((item: { item: string }) => item.item);
        }

        values.lessons = [];
        _.forEach(copyValues, (value, key) => {
            if (key.startsWith("titleChuong_")) {
                const chapterNumber = key.split("_")[1];
                const chapterKey = `lessons${chapterNumber}`;
                const videos = copyValues[chapterKey];

                values.lessons.push({
                    title: value,
                    videos: videos.map((video: { title_video: string; video_url: string }) => ({
                        title: video.title_video,
                        video_url: video.video_url,
                    })),
                });
            }
        });

        const image = () => {
            if (typeof values.image === "string") {
                return values.image;
            } else {
                return values.image.file.originFileObj;
            }
        };

        let courseCode: string = "";

        if (oneCourse?._id !== undefined) {
            courseCode = oneCourse?._id;
        }

        const payload = {
            courseCode,
            courseName: values.courseName,
            description: values.description,
            price: values.price,
            courseCategory_ID: values.courseCategory_ID,
            willLearn: values.willLearn,
            lessons: values.lessons,
            image: image(),
        };
        console.log(payload);

        const formData = new FormData();
        formData.append("courseCode", payload.courseCode);
        formData.append("courseName", payload.courseName);
        formData.append("description", payload.description);
        formData.append("price", payload.price.toString());
        formData.append("courseCategory_ID", payload.courseCategory_ID.toString());
        formData.append("willLearn", JSON.stringify(payload.willLearn));
        formData.append("lessons", JSON.stringify(payload.lessons));
        formData.append("image", payload.image);

        dispatch({ type: "updateCourseSaga", payload: formData });
    };

    const styleInput = `dark:!bg-gray-700/60 bg-transparent dark:!shadow-[rgba(0,0,0,0.20)_0px_5px_10px] shadow-[rgba(149,157,165,0.1)_0px_8px_24px]`;

    const isYouTubeUrl = (url: string) => {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/;
        return youtubeRegex.test(url);
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

    return (
        <section className="pb-24">
            <h1 className={`heading_1 mt-4 mb-5`}>Chỉnh sửa khoá học</h1>
            <div
                className={`${style.form} dark:!shadow-[rgba(0,0,0,0.35)_0px_5px_15px] shadow-[rgba(149,157,165,0.1)_0px_8px_24px] p-4 rounded-3xl border sm:p-6 xl:p-8 dark:bg-gray-800/50 backdrop-blur-sm dark:border-gray-700`}
            >
                <Form form={form} layout="vertical" onFinish={onFinish} initialValues={initialValues()}>
                    {/* TÊN KHOÁ HỌC */}
                    <Form.Item
                        label={<span className="text-base font-bold">Tên khoá học</span>}
                        name="courseName"
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
                        name="description"
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
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập giá khoá học",
                            },
                        ]}
                        hasFeedback
                    >
                        <InputNumber size="large" className={`INPUTNUMBER ${style.input} ${styleInput}`} autoComplete="off" />
                    </Form.Item>

                    {/* DANH MỤC KHOÁ HỌC*/}
                    <Form.Item
                        label={<span className="text-base font-bold">Danh mục khoá học</span>}
                        name="courseCategory_ID"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn danh mục khoá học",
                            },
                        ]}
                        hasFeedback
                    >
                        <Select size="large" className={`SELECT ${style.input} ${styleInput}`} placeholder="Danh mục khoá học" allowClear>
                            {courseCategories.map((category: I_courseCategory) => {
                                return (
                                    <Select.Option key={category._id} value={category._id}>
                                        {category.categoryName}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>

                    {/* SẼ HỌC ĐƯỢC */}
                    <p className="text-base font-bold mb-2">Sẽ học được gì?</p>
                    <Form.List name="willLearn">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <div key={key} className="flex items-center mb-2 gap-2 w-full">
                                        <Form.Item className="flex-1" {...restField} name={[name, "item"]}>
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
                    <p className="text-base font-bold mb-2">Chương học</p>
                    <div className="space-y-3 ">
                        {chapterArray.map((item, index) => {
                            return (
                                <div key={item} className="border-4 relative dark:border-gray-600 border-gray-200 rounded-xl p-5">
                                    <div
                                        onClick={() => {
                                            let copyArrChuong = JSON.parse(JSON.stringify(chapterArray));
                                            copyArrChuong = copyArrChuong.filter((itemChuong: number) => {
                                                return +itemChuong !== +item;
                                            });
                                            setChapterArray(copyArrChuong);
                                        }}
                                        className="cursor-pointer absolute z-10 top-2 right-2 text-white/50 hover:text-white/80 transition bg-transparent hover:bg-white/10 rounded-full w-8 h-8 flex items-center justify-center"
                                    >
                                        <CloseOutlined className="text-base" />
                                    </div>

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

                                    <Form.List
                                        name={`lessons${index + 1}`}
                                        rules={[
                                            {
                                                validator: async (_, names) => {
                                                    if (!names || names.length < 1) {
                                                        return Promise.reject(new Error("Vui lòng thêm ít nhất 1 trường"));
                                                    }
                                                },
                                            },
                                        ]}
                                    >
                                        {(fields, { add, remove }, { errors }) => (
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
                                                                rules={[
                                                                    { required: true, message: "Vui lòng nhập đường dẫn video" },
                                                                    {
                                                                        validator: (_, value) => {
                                                                            if (!value || isYouTubeUrl(value)) {
                                                                                return Promise.resolve();
                                                                            }
                                                                            return Promise.reject(new Error("Đường dẫn không hợp lệ. Vui lòng nhập đường dẫn YouTube."));
                                                                        },
                                                                    },
                                                                ]}
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
                                                    <Form.ErrorList errors={errors} />
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
                                const copyArrChuong = JSON.parse(JSON.stringify(chapterArray));
                                let resultPush = 0;
                                if (copyArrChuong.length > 0) {
                                    resultPush = copyArrChuong[copyArrChuong.length - 1] + 1;
                                }
                                copyArrChuong.push(resultPush);
                                setChapterArray(copyArrChuong);
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
                        name="image"
                        valuePropName="file"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng tải hình ảnh",
                            },
                        ]}
                    >
                        <Upload
                            listType="picture-card"
                            accept="image/png, image/jpeg"
                            maxCount={1}
                            customRequest={({ file, onSuccess }) => {
                                setTimeout(() => {
                                    if (onSuccess) {
                                        onSuccess("ok");
                                    }
                                }, 0);
                            }}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            defaultFileList={oneCourse?.image ? [{ url: oneCourse.image, uid: "1", name: "image.jpg" }] : []}
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
                        <ButtonMe disabled={isLoadingBtn} className="px-10 py-3" type="primary">
                            <div className="flex items-center gap-2">
                                {isLoadingBtn && <LoadingOutlined />}
                                <span className="text-base">Chỉnh sửa khoá học</span>
                            </div>
                        </ButtonMe>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
}
export default EditCoursePage_Admin;
