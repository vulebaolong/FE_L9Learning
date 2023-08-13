// store.ts

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga"; // Import saga root file
import modalSlice from "./slices/modalSlice"; // Import saga root file
import toggleThemeSlice from "./slices/toggleThemeSlice"; // Import saga root file
import quanLyNguoiDungSlice from "./slices/quanLyNguoiDungSlice"; // Import saga root file
import quanLyKhoaHocSlice from "./slices/quanLyKhoaHocSlice"; // Import saga root file

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        modalSlice,
        toggleThemeSlice,
        quanLyNguoiDungSlice,
        quanLyKhoaHocSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;
