import Cta from "../../components/Cta/Cta";
import imgFe from "../../assets/roadmap/FE.png";
import imgBe from "../../assets/roadmap/BE.png";
import img1 from "../../assets/roadmap/1.png";
import img2 from "../../assets/roadmap/2.png";
import img3 from "../../assets/roadmap/3.png";
import img4 from "../../assets/roadmap/4.png";
import img5 from "../../assets/roadmap/5.png";
import img6 from "../../assets/roadmap/6.png";
import img7 from "../../assets/roadmap/7.png";
import Button from "../../components/Button/Button";

function Roadmap() {
    return (
        <section className="pb-24 space-y-20">
            <div>
                <h1 className={`heading_1 mt-4 mb-5`}>Lộ trình học</h1>
                <p>
                    Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình học. Ví dụ: Để đi làm với vị trí "Lập trình viên Front-end" bạn nên tập trung vào lộ trình
                    "Front-end".
                </p>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                {/* BOX */}
                <div className="w-[500px] flex flex-col border-2 border-[#e8e8e8] dark:border-[rgba(232,232,232,0.2)] rounded-2xl p-6">
                    <div className="flex items-start flex-col lg:flex-row gap-2 flex-1">
                        <div className="space-y-2">
                            <h2 className="heading_2">Lộ trình học Front-end</h2>
                            <p className="">
                                Lập trình viên Front-end là người xây dựng ra giao diện websites. Trong phần này F8 sẽ chia sẻ cho bạn lộ trình để trở thành lập trình viên
                                Front-end nhé.
                            </p>
                        </div>
                        <div className="w-[122px] h-[122px] flex-shrink-0 rounded-full border-[5px] border-primary overflow-hidden">
                            <img className="w-full h-full object-cover" src={imgFe} alt="" />
                        </div>
                    </div>
                    <div className="mt-[20px] mb-[28px] flex flex-wrap items-center gap-2">
                        <div className="w-[40px] h-[40px] p-2 overflow-hidden rounded-full border-[2px] border-primary">
                            <img className="w-full h-full object-cover" src={img1} alt="" />
                        </div>
                        <div className="w-[40px] h-[40px] p-2 overflow-hidden rounded-full border-[2px] border-primary">
                            <img className="w-full h-full object-cover" src={img2} alt="" />
                        </div>
                        <div className="w-[40px] h-[40px] p-2 overflow-hidden rounded-full border-[2px] border-primary">
                            <img className="w-full h-full object-cover" src={img3} alt="" />
                        </div>
                        <div className="w-[40px] h-[40px] p-2 overflow-hidden rounded-full border-[2px] border-primary">
                            <img className="w-full h-full object-cover" src={img4} alt="" />
                        </div>
                        <div className="w-[40px] h-[40px] p-2 overflow-hidden rounded-full border-[2px] border-primary">
                            <img className="w-full h-full object-cover" src={img5} alt="" />
                        </div>
                    </div>
                    <div className="">
                        <Button type="primary">Xem chi tiết</Button>
                    </div>
                </div>

                {/* BOX */}
                <div className="w-[500px] flex flex-col border-2 border-[#e8e8e8] dark:border-[rgba(232,232,232,0.2)] rounded-2xl p-6">
                    <div className="flex items-start flex-col lg:flex-row gap-2 flex-1">
                        <div className="space-y-2">
                            <h2 className="heading_2">Lộ trình học Back-end</h2>
                            <p className="">
                                Trái với Front-end thì lập trình viên Back-end là người làm việc với dữ liệu, công việc thường nặng tính logic hơn. Chúng ta sẽ cùng tìm hiểu thêm
                                về lộ trình học Back-end nhé.
                            </p>
                        </div>
                        <div className="w-[122px] h-[122px] flex-shrink-0 rounded-full border-[5px] border-primary overflow-hidden">
                            <img className="w-full h-full object-cover" src={imgBe} alt="" />
                        </div>
                    </div>
                    <div className="mt-[20px] mb-[28px] flex flex-wrap items-center gap-2">
                        <div className="w-[40px] h-[40px] p-2 overflow-hidden rounded-full border-[2px] border-primary">
                            <img className="w-full h-full object-cover" src={img1} alt="" />
                        </div>
                        <div className="w-[40px] h-[40px] p-2 overflow-hidden rounded-full border-[2px] border-primary">
                            <img className="w-full h-full object-cover" src={img2} alt="" />
                        </div>
                        <div className="w-[40px] h-[40px] p-2 overflow-hidden rounded-full border-[2px] border-primary">
                            <img className="w-full h-full object-cover" src={img3} alt="" />
                        </div>
                        <div className="w-[40px] h-[40px] p-2 overflow-hidden rounded-full border-[2px] border-primary">
                            <img className="w-full h-full object-cover" src={img4} alt="" />
                        </div>
                        <div className="w-[40px] h-[40px] p-2 overflow-hidden rounded-full border-[2px] border-primary">
                            <img className="w-full h-full object-cover" src={img5} alt="" />
                        </div>
                        <div className="w-[40px] h-[40px] p-2 overflow-hidden rounded-full border-[2px] border-primary">
                            <img className="w-full h-full object-cover" src={img6} alt="" />
                        </div>
                        <div className="w-[40px] h-[40px] p-2 overflow-hidden rounded-full border-[2px] border-primary">
                            <img className="w-full h-full object-cover" src={img7} alt="" />
                        </div>
                    </div>
                    <div className="">
                        <Button type="primary">Xem chi tiết</Button>
                    </div>
                </div>
            </div>
            <Cta
                title="Tham gia cộng đồng học viên L8 trên Facebook"
                desc="Hàng nghìn người khác đang học lộ trình giống như bạn. Hãy tham gia hỏi đáp, chia sẻ và hỗ trợ nhau trong quá trình học nhé."
                textBtn="Tham gia nhóm"
            />
        </section>
    );
}
export default Roadmap;
