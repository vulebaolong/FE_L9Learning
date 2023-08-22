import { Skeleton } from "antd";
function SkeletonWarpCourses() {
    return (
        <div>
            <h2 className="heading_2">
                <Skeleton.Input size="small" active />
            </h2>
            <div className="collumnCourse">
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
            </div>
        </div>
    );
}
export default SkeletonWarpCourses;
