import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage/HomePage";
import { ConfigProvider, message, theme } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { setMessageApi } from "./helpers/message";
import { setNavigate } from "./helpers/navigate";
import DetailCoursePage from "./pages/DetailCoursePage/DetailCoursePage";
import AddCoursePage_Admin from "./pages/AddCoursePage_Admin/AddCoursePage_Admin";
import ListCoursePage_Admin from "./pages/ListCoursePage_Admin/ListCoursePage_Admin";
import EditCoursePage_Admin from "./pages/EditCoursePage_Admin/EditCoursePage_Admin";
import CoursesPage from "./pages/CoursesPage/CoursesPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import BacsicLayout from "./layouts/BacsicLayout";
import Personal from "./pages/SettingsPage/Personal";
import Security from "./pages/SettingsPage/Security";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import Notifications from "./pages/SettingsPage/Notifications";

function App() {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

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
                {contextHolder}
                <Routes>
                    {/* HOME LAYOUT */}
                    <Route element={<MainLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="detailcourse/:id" element={<DetailCoursePage />} />
                        <Route path="courses" element={<CoursesPage />} />
                        <Route path="addcourse" element={<AddCoursePage_Admin />} />
                        <Route path="listcourse" element={<ListCoursePage_Admin />} />
                        <Route path="editcourse/:id" element={<EditCoursePage_Admin />} />
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
