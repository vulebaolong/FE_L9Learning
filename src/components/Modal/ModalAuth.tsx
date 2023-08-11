import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import { DispatchType, RootState } from "../../redux/store";
import { setIsOpenModal } from "../../redux/slices/modalSlice";
import logoImg from "../../assets/logo/L9_logo.png";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

function ModalAuth() {
    const { isOpenModal } = useSelector((state: RootState) => state.modalSlice);
    const dispatch: DispatchType = useDispatch();

    const handleCancel = () => {
        dispatch(setIsOpenModal(false));
    };

    const classInput = `bg-[#1618230f] pr-[5px] pl-[20px] py-[12px] w-full transition outline-none rounded-[44px] h-[44px] text-sm font-inter
    border dark:border-slate-700 dark:focus:border-slate-400 
    focus:border-slate-400  border-slate-200 `;
    return (
        <Modal footer={false} maskClosable={true} onCancel={handleCancel} centered open={isOpenModal}>
            <div className="py-8 px-11">
                <div className="">
                    <img className="mx-auto w-[38px] h-[38px] rounded-lg" src={logoImg} alt="logo" />
                    <h1 className="text-[#292929] text-center mt-5 dark:text-slate-200 text-4xl font-bold">Đăng nhập vào L9</h1>
                </div>
                <div className=" mt-11">
                    <input className={classInput} placeholder="Địa chỉ email" name="email" type="email" maxLength={50} />
                    <input className={`${classInput}  mt-[10px]`} placeholder="Mật khẩu" name="password" type="password" maxLength={50} />
                    <Button className="mt-[20px]" type="gradian">
                        Đăng nhập
                    </Button>
                </div>
                <div className=" mt-11">
                    <p className="text-center text-base">
                        <span>Bạn chưa có tài khoản? </span>
                        <Link to="/register" className="font-semibold text-primary hover:text-primary_hover active:text-primary_active">
                            Đăng ký
                        </Link>
                    </p>
                    <p className="text-center text-base">
                        <Link to="/register" className="font-semibold text-primary hover:text-primary_hover active:text-primary_active">
                            Quên mật khẩu
                        </Link>
                    </p>
                </div>
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
