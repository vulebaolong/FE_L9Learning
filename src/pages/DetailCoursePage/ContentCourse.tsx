import { I_PropContentCourse } from "../../interfaces/courseManagementInterface";
import { useState } from "react";
import { Collapse, CollapseProps } from "antd";
import { FaCirclePlay } from "react-icons/fa6";
import { handleDuration } from "../../helpers/durationHelper";

function ContentCourse({ khoaHoc, totalDuration }: I_PropContentCourse) {
    const [expandedKeys, setExpandedKeys] = useState<string | string[]>([]);

    let lesson = 0;

    khoaHoc?.chuongHoc.forEach((item) => {
        lesson += item.videos.length;
    });

    const handleToggleOpenClose = () => {
        if (khoaHoc?.chuongHoc.length !== expandedKeys.length) {
            const allKeys = khoaHoc?.chuongHoc.map((chuong, index) => index.toString());
            if (allKeys !== undefined) {
                setExpandedKeys(allKeys);
            }
        }
        if (khoaHoc?.chuongHoc.length === expandedKeys.length) {
            setExpandedKeys([]);
        }
    };

    const handleOnChange = (key: string | string[]) => {
        console.log(key);

        setExpandedKeys(key);
    };

    const items: CollapseProps["items"] = khoaHoc?.chuongHoc.map((chuong, index) => {
        return {
            key: `${index}`,
            label: (
                <div className="flex items-baseline justify-between gap-2">
                    <strong className="chuongHoc truncate text-[#333] font-semibold dark:text-slate-300">{`${chuong.title}`}</strong>
                    <span className={`para mr-4 flex-shrink-0`}>{chuong.videos.length} bài học</span>
                </div>
            ),
            children: (
                <div className="divide-y dark:divide-slate-800 divide-slate-100">
                    {chuong.videos.map((video, index) => {
                        return (
                            <div key={index} className="flex items-center gap-3 px-10 py-4">
                                <div className="text-primary">
                                    <FaCirclePlay />
                                </div>
                                <span className={`para`}>{video.title}</span>
                                <span className={`para ml-auto`}>{video.duration}</span>
                            </div>
                        );
                    })}
                </div>
            ),
        };
    });
    return (
        <>
            <h2 className={`heading_2`}>Nội dung khóa học</h2>
            <div className="sm:flex items-baseline justify-between">
                <div className="">
                    <span className={`para`}>
                        <strong>{khoaHoc?.chuongHoc.length} </strong> chương
                    </span>
                    <span> • </span>
                    <span className={`para`}>
                        <strong>{lesson} </strong> bài học
                    </span>
                    <span> • </span>
                    <span className={`para`}>
                        Thời lượng <strong>{totalDuration}</strong>
                    </span>
                </div>
                <span onClick={handleToggleOpenClose} className={`para font-semibold cursor-pointer !text-primary hover:!text-primary_hover active:!text-primary_active`}>
                    {khoaHoc?.chuongHoc.length === expandedKeys.length ? "Thu nhỏ tất cả" : "Mở rộng tất cả"}
                </span>
            </div>
            <Collapse onChange={handleOnChange} activeKey={expandedKeys} size="large" items={items} />
        </>
    );
}
export default ContentCourse;
