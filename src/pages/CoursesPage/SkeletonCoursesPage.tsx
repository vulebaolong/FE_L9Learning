import { Skeleton } from "antd";

function SkeletonCoursesPage() {
    return (
        <div>
            <h2 className="heading_2">
                <Skeleton.Input size="small" active />
            </h2>
            <div className="grid grid-cols-4 gap-7 mt-5">
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
export default SkeletonCoursesPage;
