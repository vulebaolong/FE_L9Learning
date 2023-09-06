import { FaFacebookF, FaGoogle, FaPhone } from "react-icons/fa6";
import Button from "../../../components/Button/Button";
import FormChangePasswork from "./FormChangePasswork";

function Security() {
    return (
        <div className="space-y-12">
            <div>
                <h2 className="heading_2">Mật khẩu</h2>
                <hr className="dark:!border-gray-700 border-gray-200 mt-3 mb-5" />
                <div className="space-y-10">
                    <FormChangePasswork />
                </div>
            </div>
            <div>
                <h2 className="heading_2">Liên kết tài khoản đăng nhập</h2>
                <hr className="dark:!border-gray-700 border-gray-200 mt-3 mb-5" />
                <div className="space-y-10">
                    <div className="sm:flex space-y-5 sm:space-y-0 justify-between items-center">
                        <div className="space-y-3">
                            <h3 className="heading_3">Liên kết Google</h3>
                            <p className="para">Chưa liên kết tài khoản Google</p>
                        </div>
                        <Button type="transparent_1">
                            <div className="flex items-center gap-2">
                                <FaGoogle />
                                <span>Liên kết google</span>
                            </div>
                        </Button>
                    </div>

                    <div className="sm:flex space-y-5 sm:space-y-0 justify-between items-center">
                        <div className="space-y-3">
                            <h3 className="heading_3">Liên kết Facebook</h3>
                            <p className="para">Chưa liên kết tài khoản Facebook</p>
                        </div>
                        <Button type="transparent_1">
                            <div className="flex items-center gap-2">
                                <FaFacebookF />
                                <span>Liên kết Facebook</span>
                            </div>
                        </Button>
                    </div>

                    <div className="sm:flex space-y-5 sm:space-y-0 justify-between items-center">
                        <div className="space-y-3">
                            <h3 className="heading_3">Liên kết số điện thoại</h3>
                            <p className="para">Chưa liên kết số điện thoại nào</p>
                        </div>
                        <Button type="transparent_1">
                            <div className="flex items-center gap-2">
                                <FaPhone />
                                <span>Liên kết số điện thoại</span>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="heading_2">Mạng xã hội</h2>
                <hr className="dark:!border-gray-700 border-gray-200 mt-3 mb-5" />
                <div className="space-y-10">
                    <div className="sm:flex space-y-5 sm:space-y-0 justify-between items-center">
                        <div className="space-y-3">
                            <h3 className="heading_3">Facebook</h3>
                            <p className="para">Chưa liên kết tài khoản Facebook</p>
                        </div>
                        <Button type="transparent_1">Chỉnh sửa</Button>
                    </div>
                    <div className="sm:flex space-y-5 sm:space-y-0 justify-between items-center">
                        <div className="space-y-3">
                            <h3 className="heading_3">Youtube</h3>
                            <p className="para">Chưa liên kết tài khoản Youtube</p>
                        </div>
                        <Button type="transparent_1">Chỉnh sửa</Button>
                    </div>
                    <div className="sm:flex space-y-5 sm:space-y-0 justify-between items-center">
                        <div className="space-y-3">
                            <h3 className="heading_3">Linkedin</h3>
                            <p className="para">Chưa liên kết tài khoản Linkedin</p>
                        </div>
                        <Button type="transparent_1">Chỉnh sửa</Button>
                    </div>
                    <div className="sm:flex space-y-5 sm:space-y-0 justify-between items-center">
                        <div className="space-y-3">
                            <h3 className="heading_3">Instagram</h3>
                            <p className="para">Chưa liên kết tài khoản Instagram</p>
                        </div>
                        <Button type="transparent_1">Chỉnh sửa</Button>
                    </div>
                    <div className="sm:flex space-y-5 sm:space-y-0 justify-between items-center">
                        <div className="space-y-3">
                            <h3 className="heading_3">Twitter</h3>
                            <p className="para">Chưa liên kết tài khoản Twitter</p>
                        </div>
                        <Button type="transparent_1">Chỉnh sửa</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Security;
