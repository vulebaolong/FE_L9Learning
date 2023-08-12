import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import NotLogged from "./NotLogged";
import Logged from "./Logged";

function UserControll() {
    const { userLogin } = useSelector((state: RootState) => state.quanLyNguoiDungSlice);

    let jsx = <NotLogged />;

    if (userLogin) jsx = <Logged userLogin={userLogin} />;

    return <div>{jsx}</div>;
}
export default UserControll;
