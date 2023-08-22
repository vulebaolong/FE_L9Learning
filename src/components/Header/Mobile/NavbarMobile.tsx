import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { useState } from "react";
import UserControllMobile from "./UserControllMobile";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../../redux/store";
import { setIsDraweREDU } from "../../../redux/slices/drawerSlice";

function NavbarMobile() {
    const dispatch: DispatchType = useDispatch();

    const { isDrawer } = useSelector((state: RootState) => state.drawerSlice);

    const showDrawer = () => {
        dispatch(setIsDraweREDU(true))
    };

    const onClose = () => {
        dispatch(setIsDraweREDU(false))
    };
    return (
        <>
            <div onClick={showDrawer} className="px-1 text-2xl cursor-pointer">
                <MenuOutlined />
            </div>
            <Drawer maskClosable={true} placement="left" closeIcon={false} onClose={onClose} open={isDrawer}>
                <div className="px-2 md:px-5">
                    <UserControllMobile />
                </div>
            </Drawer>
        </>
    );
}
export default NavbarMobile;
