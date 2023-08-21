import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage/HomePage";
import { ConfigProvider, message, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "./redux/store";
import { setMessageApi } from "./helpers/message";
import { setNavigate } from "./helpers/navigate";
import DetailCoursePage from "./pages/DetailCoursePage/DetailCoursePage";
import AddCoursePage_Admin from "./pages/AddCoursePage_Admin/AddCoursePage_Admin";
import ListCoursePage_Admin from "./pages/ListCoursePage_Admin/ListCoursePage_Admin";
import EditCoursePage_Admin from "./pages/EditCoursePage_Admin/EditCoursePage_Admin";
import CoursesPage from "./pages/CoursesPage/CoursesPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import BacsicLayout from "./layouts/BacsicLayout";
import Personal from "./pages/SettingsPage/Personal/Personal";
import Security from "./pages/SettingsPage/Security/Security";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import Notifications from "./pages/SettingsPage/Notifications/Notifications";
import Roadmap from "./pages/Roadmap/Roadmap";
import Blog from "./pages/Blog/Blog";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import { lcStorage } from "./helpers/localStorage";
import { THEME } from "./contants/configContants";
import { darkThemeREDU, lightThemeREDU } from "./redux/slices/toggleThemeSlice";
import UserManagement_Admin from "./pages/UserManagement_Admin/UserManagement_Admin";
import Modal from "./components/Modal/Modal";
import EditUser_Admin from "./pages/EditUser_Admin/EditUser_Admin";
import InfoUserToCoursePage_Admin from "./pages/InfoUserToCoursePage_Admin/InfoUserToCoursePage_Admin";

function App() {
    const navigate = useNavigate();

    const dispatch: DispatchType = useDispatch();

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        const theme = lcStorage.get(THEME);
        console.log(theme);
        if (theme === "light") dispatch(lightThemeREDU());
        if (theme === "dark") dispatch(darkThemeREDU());
    }, []);

    useEffect(() => {
        setMessageApi(messageApi);
    }, [messageApi]);

    useEffect(() => {
        setNavigate(navigate);
    }, [navigate]);

    const { themeSelect } = useSelector((state: RootState) => state.toggleThemeSlice);

    const themeAlgorithm = themeSelect === "dark" ? theme.darkAlgorithm : undefined;

    return (
        <>
            <ConfigProvider
                theme={{
                    algorithm: themeAlgorithm,
                }}
            >
                <LoadingPage />
                {contextHolder}
                <Modal />
                <Routes>
                    {/* HOME LAYOUT */}
                    <Route element={<MainLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="detailcourse/:id" element={<DetailCoursePage />} />
                        <Route path="courses" element={<CoursesPage />} />
                        <Route path="roadmap" element={<Roadmap />} />
                        <Route path="blog" element={<Blog />} />
                        <Route path="addcourse" element={<AddCoursePage_Admin />} />
                        <Route path="listcourse" element={<ListCoursePage_Admin />} />
                        <Route path="editcourse/:id" element={<EditCoursePage_Admin />} />
                        <Route path="usermanagement" element={<UserManagement_Admin />} />
                        <Route path="edituser/:id" element={<EditUser_Admin />} />
                        <Route path="usertocourse/:id" element={<InfoUserToCoursePage_Admin />} />
                    </Route>

                    {/* PROFILE LAYOUT */}
                    <Route element={<BacsicLayout />}>
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="settings" element={<SettingsPage />}>
                            <Route path="personal" element={<Personal />} />
                            <Route path="security" element={<Security />} />
                            <Route path="notifications" element={<Notifications />} />
                        </Route>
                    </Route>

                    {/* OTHER */}
                    {/* <Route path="*" element={<Navigate to={"/"} />} /> */}
                </Routes>
            </ConfigProvider>
        </>
    );
}

export default App;
