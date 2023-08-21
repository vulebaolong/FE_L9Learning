import FormHoTen from "../../../components/FromEdit/FormHoTen";
import FormTaiKhoan from "../../../components/FromEdit/FormTaiKhoan";
import FormEmail from "../../../components/FromEdit/FormEmail";
import FormSoDienThoai from "../../../components/FromEdit/FormSoDienThoai";
import FormAvatar from "../../../components/FromEdit/FormAvatar";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { userApi } from "../../../api/quanLyNguoiDungApi";

function Personal() {
    const { userLogin } = useSelector((state: RootState) => state.quanLyNguoiDungSlice);

    return (
        <div>
            <h2 className="heading_2">Thông tin cá nhân</h2>

            <hr className="dark:!border-gray-700 border-gray-200 mt-3 mb-5" />

            <div className="space-y-12">
                <FormHoTen userLogin={userLogin} api={userApi.capNhatMotThongTinTaiKhoan} logApi="capNhatMotThongTinTaiKhoan" />
                <FormTaiKhoan userLogin={userLogin} api={userApi.capNhatMotThongTinTaiKhoan} logApi="capNhatMotThongTinTaiKhoan" />
                <FormEmail userLogin={userLogin} api={userApi.capNhatMotThongTinTaiKhoan} logApi="capNhatMotThongTinTaiKhoan" />
                <FormSoDienThoai userLogin={userLogin} api={userApi.capNhatMotThongTinTaiKhoan} logApi="capNhatMotThongTinTaiKhoan" />
                <FormAvatar userLogin={userLogin} apiAvatar={userApi.capNhatAvatarTaiKhoan} logApi="capNhatAvatarTaiKhoan" />
            </div>
        </div>
    );
}
export default Personal;
