import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import NotLogged from "./NotLogged";
import Logged from "./Logged";

function UserControll() {
    const { userLogin } = useSelector((state: RootState) => state.userManagementSlice);

    let jsx = <NotLogged />;

    if (userLogin)
        jsx = (
            <div className="hidden lg:block">
                <Logged userLogin={userLogin} />
            </div>
        );

    return <div>{jsx}</div>;
}
export default UserControll;
