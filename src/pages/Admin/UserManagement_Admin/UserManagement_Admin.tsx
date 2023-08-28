import { useEffect, useRef, useState } from "react";
import { DispatchType, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { DataType } from "../../../interfaces/userManagementInterface";
import ButtonMe from "../../../components/Button/Button";

import { SearchOutlined, EditOutlined, InfoCircleOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import type { InputRef } from "antd";
import { Button, Image, Input, Table, Tag, Tooltip } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { FaPlus } from "react-icons/fa6";
import { setIsOpenModalAddUserREDU } from "../../../redux/slices/modalSlice";
import { navigate } from "../../../helpers/navigate";
import PopconfirmUserManagement_Admin from "./PopconfirmUserManagement_Admin";
type DataIndex = keyof DataType;

function UserManagement_Admin() {
    const dispatch: DispatchType = useDispatch();

    const { userList } = useSelector((state: RootState) => state.userManagementSlice);

    useEffect(() => {
        dispatch({
            type: "getUserListSaga",
        });
    }, []);

    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: DataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, close }) => {
            return (
                <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                    <Input
                        ref={searchInput}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        style={{ marginBottom: 8, display: "block" }}
                    />
                    <div className="flex gap-1">
                        <Button type="primary" onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)} icon={<SearchOutlined />} size="small">
                            Tìm kiếm
                        </Button>
                        <Button
                            className="w-full"
                            type="link"
                            size="small"
                            onClick={() => {
                                close();
                            }}
                        >
                            Đóng
                        </Button>
                    </div>
                </div>
            );
        },
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }} searchWords={[searchText]} autoEscape textToHighlight={text ? text.toString() : ""} />
            ) : (
                text
            ),
    });

    const data: DataType[] = userList
        .map((userInfo, index) => {
            return {
                key: userInfo._id,
                ordinalNumber: index + 1,
                fullName: userInfo.fullName,
                username: userInfo.username,
                userType: userInfo.userType,
                phoneNumber: userInfo.phoneNumber,
                email: userInfo.email,
                avatar: userInfo.avatar,
            };
        })
        .reverse();

    const columns: ColumnsType<DataType> = [
        {
            title: "STT",
            dataIndex: "ordinalNumber",
            sorter: (a, b) => a.ordinalNumber - b.ordinalNumber,
            sortDirections: ["ascend"],
            className: "hidden sm:table-cell",
        },
        {
            title: "Ảnh",
            dataIndex: "avatar",
            render: (_, userInfo) => {
                return (
                    <div className="w-14 h-14 rounded-full overflow-hidden">
                        <Image className="!w-full !h-full object-cover" src={userInfo.avatar} />
                    </div>
                );
            },
            className: "hidden xl:table-cell",
        },
        {
            title: "Tài khoản",
            ...getColumnSearchProps("username"),
            render: (_, b) => {
                if (b.userType === "Customer") {
                    return (
                        <div className="">
                            <span className="sm:hidden">{b.ordinalNumber} </span>
                            <Tag color="green">{b.username}</Tag>
                        </div>
                    );
                }
                if (b.userType === "Admin") {
                    return (
                        <div className="">
                            <span className="sm:hidden">{b.ordinalNumber} </span>
                            <Tag color="red">{b.username}</Tag>
                        </div>
                    );
                }
            },
        },
        {
            title: "Họ tên",
            dataIndex: "fullName",
            ...getColumnSearchProps("fullName"),
            className: "hidden sm:table-cell",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phoneNumber",
            ...getColumnSearchProps("phoneNumber"),
            className: "hidden md:table-cell",
        },
        {
            title: "Email",
            dataIndex: "email",
            ...getColumnSearchProps("email"),
            className: "hidden lg:table-cell",
        },
        {
            title: "Hành động",
            render: (_, userInfo) => {
                return (
                    <div className="flex gap-2">
                        <Tooltip placement="top" title="Thông tin khoá học">
                            <Button
                                type="primary"
                                icon={<InfoCircleOutlined />}
                                onClick={() => {
                                    navigate(`/usertocourse/${userInfo.key}`);
                                }}
                            />
                        </Tooltip>
                        <Tooltip placement="top" title="Chỉnh sửa">
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => {
                                    console.log("Edit");
                                    navigate(`/edituser/${userInfo.key}`);
                                }}
                            />
                        </Tooltip>

                        <PopconfirmUserManagement_Admin userInfo={userInfo} />
                    </div>
                );
            },
        },
    ];

    const handleAddUser = () => {
        dispatch(setIsOpenModalAddUserREDU(true));
    };

    return (
        <>
            <div className="flex items-center gap-5 mb-5">
                <h1 className={`heading_1 my-5`}>Quản lý người dùng</h1>
                <Tooltip title="Thêm người dùng">
                    <div className="">
                        <ButtonMe onClick={handleAddUser} type="circle_2">
                            <FaPlus />
                        </ButtonMe>
                    </div>
                </Tooltip>
            </div>
            <Table
                locale={{
                    triggerDesc: "sắp xếp giảm dần",
                    triggerAsc: "sắp xếp tăng dần",
                    cancelSort: "hủy sắp xếp",
                }}
                columns={columns}
                dataSource={data}
            />
        </>
    );
}
export default UserManagement_Admin;
