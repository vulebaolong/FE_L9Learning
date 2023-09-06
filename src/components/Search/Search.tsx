import { Empty, Input, Popover } from "antd";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { courseApi } from "../../api/courseApi";
import { I_resultSearch } from "../../interfaces/courseManagementInterface";
import { navigate } from "../../helpers/navigate";
import { DEBOUNCE_TIMEOUT } from "../../contants/courseManagementContants";
function Search() {
    const [resultSearch, setResultSearch] = useState<I_resultSearch>([]);
    const [isOpenPopupUser, setIsOpenPopupUser] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleOpenChange = (newOpen: boolean) => {
        setIsOpenPopupUser(newOpen);
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        const timerId = setTimeout(async () => {
            if (isLoading) return;

            if (inputValue === "") return setIsOpenPopupUser(false);

            console.log(inputValue);

            setIsLoading(true);

            try {
                const courseName = encodeURIComponent(inputValue);

                const { data, status } = await courseApi.searchCourseByName(courseName);

                console.log("Call API - searchCourseByName", { data, status });

                setResultSearch(data.result.data);

                setIsOpenPopupUser(true);
            } finally {
                setIsLoading(false);
            }
        }, DEBOUNCE_TIMEOUT);

        return () => {
            clearTimeout(timerId);
        };
    }, [inputValue]);

    const handleClickResultSearch = (courseCode: string) => {
        setIsOpenPopupUser(false);
        setInputValue("");
        navigate(`/detailcourse/${courseCode}`);
    };

    const handleLoadMore = () => {
        setIsOpenPopupUser(false);
        setInputValue("");
        navigate("/courses");
    };

    const content = () => {
        if (resultSearch.length > 0) {
            return (
                <div className="w-[395px] px-3">
                    <div className=" flex justify-between items-baseline ">
                        <p className="text-sm font-semibold">KHOÁ HỌC</p>
                        <p onClick={handleLoadMore} className="text-sm dark:text-white/50 text-black/50 cursor-pointer">
                            Xem thêm
                        </p>
                    </div>
                    <hr className="dark:!border-gray-700 border-gray-200 my-2" />
                    <div className="space-y-3">
                        {resultSearch?.map((course) => {
                            return (
                                <div
                                    onClick={() => {
                                        handleClickResultSearch(course._id);
                                    }}
                                    key={course._id}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <div className="w-10 h-10 rounded-full overflow-hidden">
                                        <img className="w-full h-full object-cover" src={course.image} alt="" />
                                    </div>
                                    <p>{course.courseName}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
        if (resultSearch.length === 0) {
            return (
                <div className="w-[395px] px-3">
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"Không tìm thấy khoá học"} />
                </div>
            );
        }
    };

    const prefix = () => {
        if (isLoading) return <LoadingOutlined className="mr-2 font-bold" />;
        if (!isLoading) return <SearchOutlined className="mr-2 font-bold" />;
    };

    const onClick = (e: MouseEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value.trim();
        if (value !== "") setIsOpenPopupUser(true);
    };

    return (
        <Popover onOpenChange={handleOpenChange} open={isOpenPopupUser} placement="topLeft" content={content} trigger="contextMenu" arrow={false} className="w-[420px]">
            <div className="rounded-full border-2 dark:border-slate-600 border-slate-300 px-1 w-[420px]">
                <Input value={inputValue} onClick={onClick} onChange={onChange} bordered={false} size="large" placeholder="Tìm kiếm khoá học" prefix={prefix()} />
            </div>
        </Popover>
    );
}
export default Search;
