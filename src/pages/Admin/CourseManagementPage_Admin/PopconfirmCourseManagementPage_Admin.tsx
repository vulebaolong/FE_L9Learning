import { Popconfirm } from "antd";
import Button from "../../../components/Button/Button";
import { I_singleCourse } from "../../../interfaces/courseManagementInterface";
import { courseApi } from "../../../api/courseApi";
import { error, success } from "../../../helpers/message";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../../redux/store";

function PopconfirmCourseManagementPage_Admin({ course }: { course: I_singleCourse }) {
    const [open, setOpen] = useState(false);

    const [confirmLoading, setConfirmLoading] = useState(false);

    const dispatch: DispatchType = useDispatch();

    const showPopconfirm = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const confirm = async (courseCode: string) => {
        try {
            setConfirmLoading(true);

            const { data, status } = await courseApi.deleteCourse(courseCode);

            console.log("Call Api - deleteCourse", { data, status });

            success("Xoá khoá học thành công");

            dispatch({ type: "getCourseListSaga" });
        } catch (err) {
            error("Xoá khoá học không thành công");
        } finally {
            setOpen(false);

            setConfirmLoading(false);
        }
    };

    return (
        <Popconfirm
            title="Xoá khoá học"
            description="Bạn có chắc chắn xóa khoá học này không?"
            onConfirm={() => {
                confirm(course._id);
            }}
            open={open}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={handleCancel}
            okText="Xoá"
            cancelText="Không"
        >
            <Button onClick={showPopconfirm} type="red">
                Xoá
            </Button>
        </Popconfirm>
    );
}
export default PopconfirmCourseManagementPage_Admin;
