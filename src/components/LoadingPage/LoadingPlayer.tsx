import { Player } from "@lottiefiles/react-lottie-player";
import loadingPage3 from "../../assets/loading/loading_page3.json";
import { useState, useEffect } from "react";

function LoadingPlayer() {
    const [isServer, setIsServer] = useState(false);
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsServer(true);
		}, 5000);
		return () => {
			clearTimeout(timer);
		};
	}, []);
    return (
        <div className="fixed z-[1002] w-screen h-screen top-0 left-0 !bg-white dark:!bg-slate-900  flex items-center justify-center">
            <div className="">
                <Player autoplay speed={1} loop src={loadingPage3} style={{ height: "300px", width: "300px" }}>
                    {/* <Controls visible={true} buttons={["play", "repeat", "frame", "debug"]} /> */}
                </Player>
                {isServer && (
                    <div className="container text-center space-y-5">
                        <p className="heading_1">Server đang mở lại, bạn đợi xíu nhé.</p>
                        <p className="heading_2">Vì server có tính năng sẽ tự động tắt nếu như không có tương tác</p>
                    </div>
                )}
            </div>
        </div>
    );
}
export default LoadingPlayer;
