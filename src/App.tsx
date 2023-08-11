import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage/HomePage";
import { ConfigProvider, theme } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

function App() {
    
    const { themeSelect } = useSelector((state: RootState) => state.toggleThemeSlice);
    const themeAlgorithm = themeSelect === 'dark' ? theme.darkAlgorithm : undefined;
    
    return (
        <ConfigProvider
            theme={{
                algorithm: themeAlgorithm,
            }}
        >
            <Routes>
                {/* HOME LAYOUT */}
                <Route element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="lotrinh" element={<HomePage />} />
                    <Route path="hoc" element={<HomePage />} />
                    <Route path="blog" element={<HomePage />} />
                </Route>

                {/* USER LAYOUT */}
                {/* <Route element={<UserLayout />}>
        <Route path='login' element={<Login />} />
        <Route path='signin' element={<SignIn />} />
    </Route> */}

                {/* OTHER */}
                <Route path="*" element={<Navigate to={"/"} />} />
            </Routes>
        </ConfigProvider>
    );
}

export default App;
