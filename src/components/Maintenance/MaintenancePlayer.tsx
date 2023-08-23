import { Player } from "@lottiefiles/react-lottie-player";
import imgMaintence from "../../assets/maintenance/maintence.json";

function MaintenancePlayer() {
    return (
        <>
            <Player autoplay speed={1} loop src={imgMaintence}>
                {/* <Controls visible={true} buttons={["play", "repeat", "frame", "debug"]} /> */}
            </Player>
            {/* {isServer && (
                    <div className="container text-center">
                        <p className="heading-1">Server đang mở lại, bạn đợi xíu nhé.</p>
                        <p className="para-1">Vì server có tính năng sẽ tự động tắt nếu như không có tương tác</p>
                    </div>
                )} */}
        </>
    );
}
export default MaintenancePlayer;
