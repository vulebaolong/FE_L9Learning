import Button from "../Button/Button";
import imgCta from "../../assets/cta.png";
import { I_PropsCta } from "../../interfaces/courseManagementInterface";

function Cta({ title, desc, textBtn }: I_PropsCta) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div className="flex items-center ">
                <div className="w-[400px] self-center">
                    <h2 className="heading_2 my-5">{title}</h2>
                    <p className="my-[14px]">{desc}</p>
                    <Button type="bg-whiteblack">{textBtn}</Button>
                </div>
            </div>
            <div className="flex justify-center mt-10 lg:mt-0">
                <div className="w-[400px] lg:ml-auto">
                    <img className="w-full h-full object-cover dark:drop-shadow-primary " src={imgCta} alt="" />
                </div>
            </div>
        </div>
    );
}
export default Cta;
