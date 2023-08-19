import { useSelector } from "react-redux";
import LoadingPlayer from "./LoadingPlayer";
import { RootState } from "../../redux/store";

function LoadingPage() {
    const { isLoadingPage } = useSelector((state: RootState) => state.loadingSlice);

    return <>{isLoadingPage && <LoadingPlayer />}</>;
}
export default LoadingPage;
