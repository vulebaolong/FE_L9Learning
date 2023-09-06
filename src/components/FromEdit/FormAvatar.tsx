import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { Form, Modal, Upload, UploadFile } from "antd";
import { error, success } from "../../helpers/message";
import Button from "../Button/Button";
import { getBase64 } from "../../helpers/antdHelper";
import { RcFile, UploadProps } from "antd/es/upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { file } from "../../interfaces/courseManagementInterface";
import { I_PropsFormEdit } from "../../interfaces/userManagementInterface";
import { setIsLoadingBtnREDU } from "../../redux/slices/loadingSlice";

function FormAvatar({ userLogin, apiAvatar, logApi, userId }: I_PropsFormEdit) {
    const { isLoadingBtn } = useSelector((state: RootState) => state.loadingSlice);

    const dispatch: DispatchType = useDispatch();

    const [componentDisabled, setComponentDisabled] = useState(true);

    const [focusTarget, setFocusTarget] = useState<string | null>(null);

    const [form] = Form.useForm();

    const onFinish = async (values: { avatar: file }) => {
        console.log(values);
        try {
            const avatar = () => {
                if (typeof values.avatar === "string") {
                    return values.avatar;
                } else {
                    return values.avatar.file.originFileObj;
                }
            };

            const formData = new FormData();

            formData.append("avatar", avatar());
            formData.append("userId", `${userId}`);

            if (apiAvatar !== undefined) {
                dispatch(setIsLoadingBtnREDU(true));

                const { data, status } = await apiAvatar(formData);

                console.log(`Call API - ${logApi}`, { data, status });

                setComponentDisabled(true);

                success("Đổi avatar thành công");
            }
        } catch (err) {
            error("Đổi avatar không thành công");
        } finally {
            if (logApi === "updateAccountAvatar") dispatch({ type: "updateDisplayAccountSaga" });
            if (logApi === "updateUserAvatar") dispatch({ type: "updateDisplayUserSaga", payload: userId });
            dispatch(setIsLoadingBtnREDU(false));
        }
    };

    const initialValues = () => {
        return {
            avatar: userLogin.avatar,
        };
    };

    useEffect(() => {
        form.resetFields();
    }, [userLogin, form]);

    const handleEdit = () => {
        setComponentDisabled(false);
        setFocusTarget("phoneNumber");
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
    const handleCancelImg = () => setPreviewOpen(false);

    return (
        <Form form={form} onFinish={onFinish} initialValues={initialValues()}>
            <div className="space-y-3 sm:space-y-0 sm:flex justify-between items-center">
                <div className="flex-1">
                    <div className="space-y-4">
                        <h3 className="heading_3">Hình đại diện</h3>
                        <Form.Item
                            className="m-0 p-0"
                            name="avatar"
                            valuePropName="file"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng tải hình ảnh",
                                },
                            ]}
                        >
                            <Upload
                                disabled={componentDisabled}
                                listType="picture-card"
                                accept="image/png, image/jpeg"
                                maxCount={1}
                                customRequest={({ onSuccess }) => {
                                    setTimeout(() => {
                                        if (onSuccess) {
                                            onSuccess("ok");
                                        }
                                    }, 0);
                                }}
                                onPreview={handlePreview}
                                onChange={handleChange}
                                defaultFileList={userLogin?.avatar ? [{ url: userLogin.avatar, uid: "1", name: "image.jpg" }] : []}
                            >
                                <div className="UPLOAD">
                                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>
                        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancelImg}>
                            <img
                                alt="example"
                                style={{
                                    width: "100%",
                                }}
                                src={previewImage}
                            />
                        </Modal>
                    </div>
                </div>
                {renderButton(componentDisabled)}
            </div>
        </Form>
    );
}
export default FormAvatar;
