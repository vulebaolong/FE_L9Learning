import { useDispatch } from "react-redux";
import { DispatchType } from "../../redux/store";
import Button from "../Button/Button";
import { setIsOpenModalREDU } from "../../redux/slices/modalSlice";

function NotLogged() {
    const dispatch: DispatchType = useDispatch();
    
    const handleClick = () => {
        dispatch(setIsOpenModalREDU(true));
    };
    return (
        <Button onClick={handleClick} type="primary">
            Đăng nhập
        </Button>
    );
}
export default NotLogged;
