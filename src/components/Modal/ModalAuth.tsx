import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import { DispatchType, RootState } from "../../redux/store";
import { setIsOpenModalREDU } from "../../redux/slices/modalSlice";
import { useState } from "react";

import { Link } from "react-router-dom";
import DangNhap from "./DangNhap";
import DangKy from "./DangKy";

function ModalAuth() {
    const [isPageDangNhap, setIsPageDangNhap] = useState(true);

    const { isOpenModal } = useSelector((state: RootState) => state.modalSlice);
    
    const dispatch: DispatchType = useDispatch();

    const handleCancel = () => {
        dispatch(setIsOpenModalREDU(false));
    };

    const handleNavigateDangKy = () => {
        setIsPageDangNhap(false);
    };
    const handleNavigateDangNhap = () => {
        setIsPageDangNhap(true);
    };

    return (
        <Modal footer={false} maskClosable={true} onCancel={handleCancel} centered open={isOpenModal}>
            <div className="py-8 px-11">
                {isPageDangNhap === true ? <DangNhap handleNavigateDangKy={handleNavigateDangKy} /> : <DangKy handleNavigateDangNhap={handleNavigateDangNhap} />}

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
