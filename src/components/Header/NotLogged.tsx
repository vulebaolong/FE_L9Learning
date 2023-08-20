import { useDispatch } from "react-redux";
import { DispatchType } from "../../redux/store";
import Button from "../Button/Button";
import { setIsOpenModalAuthREDU } from "../../redux/slices/modalSlice";

function NotLogged() {
    const dispatch: DispatchType = useDispatch();
    
    const handleClick = () => {
        dispatch(setIsOpenModalAuthREDU(true));
    };
    return (
        <Button onClick={handleClick} type="primary">
            Đăng nhập
        </Button>
    );
}
export default NotLogged;
