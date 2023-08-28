import { Popconfirm } from "antd";
import Button from "../../components/Button/Button";
import { I_enrolledCourseDetails } from "../../interfaces/userManagementInterface";
import { courseApi } from "../../api/courseApi";
import { error, success } from "../../helpers/message";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../redux/store";
import { useState } from "react";

function PopconfirmProfile({ course }: { course: I_enrolledCourseDetails }) {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const dispatch: DispatchType = useDispatch();

    const showPopconfirm = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        console.log("Clicked cancel button");
        setOpen(false);
    };

    const confirm = async (courseCode: string) => {
        console.log(courseCode);

        try {
            setConfirmLoading(true);

            const { data, status } = await courseApi.cancelEnrollment({ courseCode });

            console.log("Call API - cancelEnrollment", { data, status });

            success("Huỷ đăng ký khoá học thành công");

            dispatch({ type: "updateDisplayAccountSaga" });
        } catch (err) {
            error("Huỷ đăng ký khoá học không thành công");
        } finally {
            setOpen(false);

            setConfirmLoading(false);
        }
    };
    return (
        <Popconfirm
            title="Huỷ đăng ký"
            description="Bạn có chắc chắn huỷ khoá học này không?"
            onConfirm={() => {
                confirm(course._id);
            }}
            open={open}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={handleCancel}
            okText="Huỷ"
            cancelText="Không"
        >
            <Button onClick={showPopconfirm} type="red">
                Huỷ đăng ký
            </Button>
        </Popconfirm>
    );
}
export default PopconfirmProfile;
