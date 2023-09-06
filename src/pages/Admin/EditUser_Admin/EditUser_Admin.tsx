import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../../redux/store";
import FormFullName from "../../../components/FromEdit/FormFullName";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { userApi } from "../../../api/userApi";
import FormUserName from "../../../components/FromEdit/FormUserName";
import FormEmail from "../../../components/FromEdit/FormEmail";
import FormPhoneNumber from "../../../components/FromEdit/FormPhoneNumber";
import FormAvatar from "../../../components/FromEdit/FormAvatar";

function EditUser_Admin() {
    const { id } = useParams();

    const dispatch: DispatchType = useDispatch();

    const { userInfo } = useSelector((state: RootState) => state.userManagementSlice);

    useEffect(() => {
        dispatch({ type: "GetUserInfoSaga", payload: id });
    }, [id]);

    const api = userApi.updateOneUserInfo;

    const logApi = "updateOneUserInfo";

    const renderListForm = () => {
        if (userInfo === null) return;
        return (
            <>
                <FormFullName userId={id} userLogin={userInfo} api={api} logApi={logApi} />
                <FormUserName userId={id} userLogin={userInfo} api={api} logApi={logApi} />
                <FormEmail userId={id} userLogin={userInfo} api={api} logApi={logApi} />
                <FormPhoneNumber userId={id} userLogin={userInfo} api={api} logApi={logApi} />
                <FormAvatar userId={id} userLogin={userInfo} apiAvatar={userApi.updateUserAvatar} logApi="updateUserAvatar" />
            </>
        );
    };

    return (
        <div className="container">
            <h1 className="heading_1 pt-5">Thông tin cá nhân</h1>
            
            <p className="w-full sm:w-1/2 truncate text-2xl font-black text-[#292929]/70 dark:text-slate-400 mt-5">{userInfo?.fullName}</p>

            <hr className="dark:!border-gray-700 border-gray-200 mt-3 mb-5" />

            <div className="space-y-12">{renderListForm()}</div>
        </div>
    );
}
export default EditUser_Admin;
