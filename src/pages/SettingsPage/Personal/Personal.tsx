import FormFullName from "../../../components/FromEdit/FormFullName";
import FormUserName from "../../../components/FromEdit/FormUserName";
import FormEmail from "../../../components/FromEdit/FormEmail";
import FormPhoneNumber from "../../../components/FromEdit/FormPhoneNumber";
import FormAvatar from "../../../components/FromEdit/FormAvatar";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { userApi } from "../../../api/userApi";

function Personal() {
    const { userLogin } = useSelector((state: RootState) => state.userManagementSlice);

    return (
        <div>
            <h2 className="heading_2">Thông tin cá nhân</h2>

            <hr className="dark:!border-gray-700 border-gray-200 mt-3 mb-5" />

            <div className="space-y-12">
                <FormFullName userLogin={userLogin} api={userApi.updateOneAccountInfo} logApi="updateOneAccountInfo" />
                <FormUserName userLogin={userLogin} api={userApi.updateOneAccountInfo} logApi="updateOneAccountInfo" />
                <FormEmail userLogin={userLogin} api={userApi.updateOneAccountInfo} logApi="updateOneAccountInfo" />
                <FormPhoneNumber userLogin={userLogin} api={userApi.updateOneAccountInfo} logApi="updateOneAccountInfo" />
                <FormAvatar userLogin={userLogin} apiAvatar={userApi.updateAccountAvatar} logApi="updateAccountAvatar" />
            </div>
        </div>
    );
}
export default Personal;
