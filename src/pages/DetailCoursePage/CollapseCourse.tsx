import { Collapse, CollapseProps } from "antd";
import { useEffect, useState } from "react";
import { I_PropCollapseCourse } from "../../interfaces/I_quanLyKhoaHoc";
import { FaCirclePlay } from "react-icons/fa6";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

function CollapseCourse({ khoaHoc }: I_PropCollapseCourse) {
    const [expandedKeys, setExpandedKeys] = useState<string | string[]>([]);

    const { isOpenCollapseCourse } = useSelector((state: RootState) => state.quanLyKhoaHocSlice);

    const handleOnChange = (key: string | string[]) => {
        setExpandedKeys(key);
    };

    useEffect(() => {
        const allKeys = khoaHoc?.chuongHoc.map((chuong, index) => index.toString());
        if (allKeys !== undefined) {
            isOpenCollapseCourse  ?   setExpandedKeys(allKeys) : setExpandedKeys([]);
        }
    }, [isOpenCollapseCourse]);

    const para = `text-black/80 text-sm dark:text-slate-400`;

    const items: CollapseProps["items"] = khoaHoc?.chuongHoc.map((chuong, index) => {
        return {
            key: `${index}`,
            label: <strong className="chuongHoc text-[#333] font-semibold dark:text-slate-300">{`${index + 1}. ${chuong.title}`}</strong>,
            children: (
                <div className="divide-y dark:divide-slate-800 divide-slate-100">
                    {chuong.videos.map((video, index) => {
                        return (
                            <div key={index} className="flex items-center gap-3 px-10 py-4">
                                <div className="text-primary">
                                    <FaCirclePlay />
                                </div>
                                <span className={`${para}`}>{video.title}</span>
                                <span className={`${para} ml-auto`}>{video.duration}</span>
                            </div>
                        );
                    })}
                </div>
            ),
        };
    });
    
    return <Collapse onChange={handleOnChange} activeKey={expandedKeys} size="large" items={items} defaultActiveKey={["1"]} />;
}
export default CollapseCourse;
