import { useEffect } from "react";
import FormHoTen from "./FormHoTen";
import FormTaiKhoan from "./FormTaiKhoan";
import { DispatchType, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import FormEmail from "./FormEmail";
import FormSoDienThoai from "./FormSoDienThoai";
import FormThayDoiMatKhau from "../Security/FormThayDoiMatKhau";

function Personal() {
    // const dispatch: DispatchType = useDispatch();

    // useEffect(() => {
    //     dispatch({ type: "thongTinTaiKhoanSaga" });
    // }, []);

    // const { thongTinTaiKhoan } = useSelector((state: RootState) => state.quanLyNguoiDungSlice)

    return (
        <div>
            <h2 className="heading_2">Thông tin cá nhân</h2>

            <hr className="dark:!border-gray-700 border-gray-200 mt-3 mb-5" />

            <div className="space-y-12">
                <FormHoTen />
                <FormTaiKhoan />
                <FormEmail />
                <FormSoDienThoai />
            </div>
        </div>
    );
}
export default Personal;
