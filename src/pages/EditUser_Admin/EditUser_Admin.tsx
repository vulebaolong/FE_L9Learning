import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/store";
import FormHoTen from "../../components/FromEdit/FormHoTen";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { userApi } from "../../api/quanLyNguoiDungApi";
import { I_userLogin } from "../../interfaces/I_quanLyNguoiDung";
import FormTaiKhoan from "../../components/FromEdit/FormTaiKhoan";
import FormEmail from "../../components/FromEdit/FormEmail";
import FormSoDienThoai from "../../components/FromEdit/FormSoDienThoai";
import FormAvatar from "../../components/FromEdit/FormAvatar";

function EditUser_Admin() {
    const { id } = useParams();
    console.log(id);

    const dispatch: DispatchType = useDispatch();

    const { thongTinNguoiDung } = useSelector((state: RootState) => state.quanLyNguoiDungSlice);

    useEffect(() => {
        dispatch({ type: "layThongTinNguoiDungSaga", payload: id });
    }, [id]);

    const api = userApi.capNhatMotThongTinNguoiDung;

    const logApi = "capNhatMotThongTinNguoiDung";

    const renderListForm = () => {
        if (thongTinNguoiDung === null) return;
        return (
            <>
                <FormHoTen idNguoiDung={id} userLogin={thongTinNguoiDung} api={api} logApi={logApi} />
                <FormTaiKhoan idNguoiDung={id} userLogin={thongTinNguoiDung} api={api} logApi={logApi} />
                <FormEmail idNguoiDung={id} userLogin={thongTinNguoiDung} api={api} logApi={logApi} />
                <FormSoDienThoai idNguoiDung={id} userLogin={thongTinNguoiDung} api={api} logApi={logApi} />
                <FormAvatar idNguoiDung={id} userLogin={thongTinNguoiDung} apiAvatar={userApi.capNhatAvatarNguoiDung} logApi="capNhatAvatarNguoiDung" />
            </>
        );
    };

    return (
        <div className="container">
            <h2 className="heading_2 pt-5">Thông tin cá nhân</h2>

            <hr className="dark:!border-gray-700 border-gray-200 mt-3 mb-5" />

            <div className="space-y-12">
                {renderListForm()}
                {/* <FormTaiKhoan />
              <FormEmail />
              <FormSoDienThoai />
              <FormAvatar /> */}
            </div>
        </div>
    );
}
export default EditUser_Admin;
