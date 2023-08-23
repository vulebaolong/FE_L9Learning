// store.ts

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";
import modalSlice from "./slices/modalSlice";
import toggleThemeSlice from "./slices/toggleThemeSlice";
import quanLyNguoiDungSlice from "./slices/quanLyNguoiDungSlice";
import quanLyKhoaHocSlice from "./slices/quanLyKhoaHocSlice";
import loadingSlice from "./slices/loadingSlice";
import drawerSlice from "./slices/drawerSlice";
const isProduction = import.meta.env.PROD;

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        modalSlice,
        toggleThemeSlice,
        quanLyNguoiDungSlice,
        quanLyKhoaHocSlice,
        loadingSlice,
        drawerSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Tắt kiểm tra serializability
        }).concat(sagaMiddleware),
    devTools: !isProduction,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;
