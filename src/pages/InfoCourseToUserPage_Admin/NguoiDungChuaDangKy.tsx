import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/store";
import { Button, Image, Input, InputRef, Table, Tag, Tooltip } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { navigate } from "../../helpers/navigate";
import { useState, useRef } from "react";
import { FilterConfirmProps } from "antd/es/table/interface";
import type { ColumnType, ColumnsType } from "antd/es/table";
import { DataType } from "../../interfaces/I_quanLyNguoiDung";
import Highlighter from "react-highlight-words";
import { useParams } from "react-router-dom";
import { khoaHocApi } from "../../api/quanLyKhoaHocApi";
import { error, success } from "../../helpers/message";
import { setThongTinNguoiDungChoKhoaHocREDU } from "../../redux/slices/quanLyKhoaHocSlice";
import { wait } from "../../helpers/awaitHelper";
import { DELAY_LOADING_PAGE } from "../../contants/configContants";
import SkeletonTable from "../../components/Skeleton/SkeletonTable";
import { setIsSkeletonInfoCourseToUserREDU } from "../../redux/slices/loadingSlice";
type DataIndex = keyof DataType;

function NguoiDungChuaDangKy() {
    const dispatch: DispatchType = useDispatch();

    const { id } = useParams();

    const { thongTinNguoiDungChoKhoaHoc } = useSelector((state: RootState) => state.quanLyKhoaHocSlice);

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
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => {
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

    const data: DataType[] | undefined = thongTinNguoiDungChoKhoaHoc?.nguoiDungChuaDangKy
        .map((nguoiDung, index) => {
            return {
                key: nguoiDung._id,
                soThuTu: index + 1,
                hoTen: nguoiDung.hoTen,
                taiKhoan: nguoiDung.taiKhoan,
                maLoaiNguoiDung: nguoiDung.maLoaiNguoiDung,
                soDt: nguoiDung.soDt,
                email: nguoiDung.email,
                avatar: nguoiDung.avatar,
            };
        })
        .reverse();

    const handleDangKy = async (idNguoiDung: string) => {
        if (id === undefined) return;

        const payload = {
            idNguoiDung,
            idKhoaHoc: id,
        };

        try {
            dispatch(setIsSkeletonInfoCourseToUserREDU(true));

            const { data: data1, status: status1 } = await khoaHocApi.dangKyNguoiDungChoKhoaHoc(payload);

            console.log("Call Api - dangKyNguoiDungChoKhoaHoc", { data1, status1 });

            success("Đăng ký thành công");

            // Cập nhật lại giao diện
            const { data: data2, status: status2 } = await khoaHocApi.layThongTinNguoiDungChoKhoaHoc(id);

            console.log("Call Api - layThongTinNguoiDungChoKhoaHoc", { data2, status2 });

            dispatch(setThongTinNguoiDungChoKhoaHocREDU(data2.result.data));
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
            dataIndex: "soThuTu",
            sorter: (a, b) => a.soThuTu - b.soThuTu,
            sortDirections: ["ascend"],
            className: "hidden sm:table-cell",
        },
        {
            title: "Ảnh",
            dataIndex: "avatar",
            render: (_, nguoiDung) => {
                return (
                    <div className="w-14 h-14 rounded-full overflow-hidden">
                        <Image className="!w-full !h-full object-cover" src={nguoiDung.avatar} />
                    </div>
                );
            },
            className: "hidden xl:table-cell",
        },
        {
            title: "Tài khoản",
            ...getColumnSearchProps("taiKhoan"),
            render: (_, b) => {
                if (b.maLoaiNguoiDung === "KhachHang") {
                    return (
                        <div className="">
                            <span className="sm:hidden">{b.soThuTu} </span>
                            <Tag color="green">{b.taiKhoan}</Tag>
                        </div>
                    );
                }
                if (b.maLoaiNguoiDung === "QuanTri") {
                    return (
                        <div className="">
                            <span className="sm:hidden">{b.soThuTu} </span>
                            <Tag color="red">{b.taiKhoan}</Tag>
                        </div>
                    );
                }
            },
        },
        {
            title: "Họ tên",
            dataIndex: "hoTen",
            ...getColumnSearchProps("hoTen"),
            className: "hidden sm:table-cell",
        },
        {
            title: "Số điện thoại",
            dataIndex: "soDt",
            ...getColumnSearchProps("soDt"),
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
            render: (_, nguoiDung) => {
                return (
                    <div className="flex gap-2">
                        <Tooltip placement="top" title="Đăng ký">
                            <Button
                                shape="circle"
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => {
                                    handleDangKy(nguoiDung.key);
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

export default NguoiDungChuaDangKy;
