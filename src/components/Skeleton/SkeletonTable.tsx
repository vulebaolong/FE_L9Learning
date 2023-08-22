import { Skeleton } from "antd";

function SkeletonTable() {
    return (
        <div className="w-full">
            <Skeleton title={false} paragraph={{ width: "100%", rows: 4 }} round active />
        </div>
    );
}
export default SkeletonTable;
