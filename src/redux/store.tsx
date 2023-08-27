// store.ts

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";
import modalSlice from "./slices/modalSlice";
import toggleThemeSlice from "./slices/toggleThemeSlice";
import userManagementSlice from "./slices/userManagementSlice";
import courseManagementSlice from "./slices/courseManagementSlice";
import loadingSlice from "./slices/loadingSlice";
import drawerSlice from "./slices/drawerSlice";
const isProduction = import.meta.env.PROD;

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        modalSlice,
        toggleThemeSlice,
        userManagementSlice,
        courseManagementSlice,
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
