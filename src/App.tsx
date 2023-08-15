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
                        <Route path="lotrinh" element={<HomePage />} />
                        <Route path="hoc" element={<HomePage />} />
                        <Route path="blog" element={<HomePage />} />
                        <Route path="detailcourse/:id" element={<DetailCoursePage />} />
                        <Route path="addcourse" element={<AddCoursePage_Admin />} />
                        <Route path="listcourse" element={<ListCoursePage_Admin />} />
                    </Route>

                    {/* OTHER */}
                    <Route path="*" element={<Navigate to={"/"} />} />
                </Routes>
            </ConfigProvider>
        </>
    );
}

export default App;
