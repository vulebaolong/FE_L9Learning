import logoImg from "../../assets/logo/L9_logo.png";
import { navigate } from "../../helpers/navigate";

function Logo() {
    return (
        <a href="/" className="w-fit">
            <img
                onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                }}
                className="w-[38px] h-[38px] rounded-lg"
                src={logoImg}
                alt="logo"
            />
        </a>
    );
}
export default Logo;
