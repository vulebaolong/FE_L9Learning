import Banner from "./Banner/Banner";
import Course from "./Course/Course";


function HomePage() {
    console.log("render HomePage");
    
    return (
        <>
            <Banner />
            <Course />
        </>
    );
}
export default HomePage;
