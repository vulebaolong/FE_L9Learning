import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";

import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { DispatchType, RootState } from "../../../redux/store";
import { setIsOpenModalAuthREDU } from "../../../redux/slices/modalSlice";

function ModalAuth() {
    const { isOpenModalAuth } = useSelector((state: RootState) => state.modalSlice);
    const { isPageLogin } = useSelector((state: RootState) => state.userManagementSlice);

    const dispatch: DispatchType = useDispatch();

    const handleCancel = () => {
        dispatch(setIsOpenModalAuthREDU(false));
    };

    return (
        <Modal footer={false} maskClosable={true} onCancel={handleCancel} centered open={isOpenModalAuth}>
            <div className="py-8 sm:px-11">
                {isPageLogin === true ? <Login /> : <Register />}

                <div className=" text-center text-xs text-[#666] dark:text-slate-400 mt-12">
                    <span>Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với </span>
                    <Link to="dieukhoansudung" className="underline hover:underline active:underline hover:text-primary_hover active:text-primary_active" target="_top">
                        điều khoản sử dụng
                    </Link>
                    <span> của chúng tôi.</span>
                </div>
            </div>
        </Modal>
    );
}
export default ModalAuth;
