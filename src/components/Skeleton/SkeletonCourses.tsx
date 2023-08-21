import { Skeleton } from "antd";
function SkeletonCourses() {
    return (
        <>
            <div className="">
                <Skeleton title={false} paragraph={{ width: "100%", rows: 4 }} round active />
                <div className="mt-3">
                    <Skeleton title={false} paragraph={{ width: "50%", rows: 1 }} round active />
                </div>
            </div>
            <div className="">
                <Skeleton title={false} paragraph={{ width: "100%", rows: 4 }} round active />
                <div className="mt-3">
                    <Skeleton title={false} paragraph={{ width: "50%", rows: 1 }} round active />
                </div>
            </div>
            <div className="">
                <Skeleton title={false} paragraph={{ width: "100%", rows: 4 }} round active />
                <div className="mt-3">
                    <Skeleton title={false} paragraph={{ width: "50%", rows: 1 }} round active />
                </div>
            </div>
            <div className="">
                <Skeleton title={false} paragraph={{ width: "100%", rows: 4 }} round active />
                <div className="mt-3">
                    <Skeleton title={false} paragraph={{ width: "50%", rows: 1 }} round active />
                </div>
            </div>
        </>
    );
}
export default SkeletonCourses;
