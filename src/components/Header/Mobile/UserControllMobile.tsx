import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import LogedMobile from "./LogedMobile";
import NotLoggedMobile from "./NotLoggedMobile";

function UserControllMobile() {
    const { userLogin } = useSelector((state: RootState) => state.quanLyNguoiDungSlice);

    let jsx = <NotLoggedMobile />;

    if (userLogin)
        jsx = <LogedMobile />

    return <div>{jsx}</div>;
}
export default UserControllMobile;
