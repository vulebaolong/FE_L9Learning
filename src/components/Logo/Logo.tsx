import { useDispatch } from "react-redux";
import logoImg from "../../assets/logo/L9_logo.png";
import { navigate } from "../../helpers/navigate";
import { setIsDraweREDU } from "../../redux/slices/drawerSlice";
import { DispatchType } from "../../redux/store";

function Logo() {
    const dispatch: DispatchType = useDispatch();
    return (
        <a href="/" className="w-fit">
            <img
                onClick={(e) => {
                    e.preventDefault();
                    dispatch(setIsDraweREDU(false));
                    navigate("/");
                }}
                className="w-[38px] h-[38px]"
                src={logoImg}
                alt="logo"
            />
        </a>
    );
}
export default Logo;
