import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../../redux/store";
import { Button, Image, Input, InputRef, Table, Tag, Tooltip } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useState, useRef } from "react";
import { FilterConfirmProps } from "antd/es/table/interface";
import type { ColumnType, ColumnsType } from "antd/es/table";
import { DataType } from "../../../interfaces/userManagementInterface";
import Highlighter from "react-highlight-words";
import { useParams } from "react-router-dom";
import { courseApi } from "../../../api/courseApi";
import { error, success } from "../../../helpers/message";
import { setUserInfoForCourseREDU } from "../../../redux/slices/courseManagementSlice";
import { wait } from "../../../helpers/awaitHelper";
import { DELAY_LOADING_PAGE } from "../../../contants/configContants";
import SkeletonTable from "../../../components/Skeleton/SkeletonTable";
import { setIsSkeletonInfoCourseToUserREDU } from "../../../redux/slices/loadingSlice";
type DataIndex = keyof DataType;

function UnenrolledUsers() {
    const dispatch: DispatchType = useDispatch();

    const { id } = useParams();

    const { userInfoForCourse } = useSelector((state: RootState) => state.courseManagementSlice);

    const { isSkeletonInfoCourseToUser } = useSelector((state: RootState) => state.loadingSlice);

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

    const data: DataType[] | undefined = userInfoForCourse?.unenrolledUsers
        .map((user, index) => {
            return {
                key: user._id,
                ordinalNumber: index + 1,
                fullName: user.fullName,
                username: user.username,
                userType: user.userType,
                phoneNumber: user.phoneNumber,
                email: user.email,
                avatar: user.avatar,
            };
        })
        .reverse();

    const handleRegister = async (userId: string) => {
        if (id === undefined) return;

        const payload = {
            userId,
            courseId: id,
        };

        try {
            dispatch(setIsSkeletonInfoCourseToUserREDU(true));

            const { data: data1, status: status1 } = await courseApi.enrollUserForCourse(payload);

            console.log("Call Api - enrollUserForCourse", { data1, status1 });

            success("Đăng ký thành công");

            // Cập nhật lại giao diện
            const { data: data2, status: status2 } = await courseApi.getUserInformationForCourse(id);

            console.log("Call Api - getUserInformationForCourse", { data2, status2 });

            dispatch(setUserInfoForCourseREDU(data2.result.data));
        } catch (err) {
            console.log(err);
            error("Đăng ký không thành công");
        } finally {
            await wait(DELAY_LOADING_PAGE);
            dispatch(setIsSkeletonInfoCourseToUserREDU(false));
        }
    };

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
                        <Tooltip placement="top" title="Đăng ký">
                            <Button
                                shape="circle"
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => {
                                    handleRegister(userInfo.key);
                                }}
                            />
                        </Tooltip>
                    </div>
                );
            },
        },
    ];

    return (
        <>
            {isSkeletonInfoCourseToUser === true ? (
                <SkeletonTable />
            ) : (
                <Table
                    locale={{
                        triggerDesc: "sắp xếp giảm dần",
                        triggerAsc: "sắp xếp tăng dần",
                        cancelSort: "hủy sắp xếp",
                    }}
                    columns={columns}
                    dataSource={data}
                />
            )}
        </>
    );
}

export default UnenrolledUsers;
