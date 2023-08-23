import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.tsx";
import "./api/apiConfig.jsx";

const isProduction = import.meta.env.PROD;
if (isProduction) {
	console.log = () => {};
	console.error = () => {};
	console.debug = () => {};
}


ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);
