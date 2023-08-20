import { createSlice } from "@reduxjs/toolkit";

interface I_initialState {
    isOpenModalAuth: boolean;
    isOpenModalAddUser: boolean;
}

const initialState: I_initialState = {
    isOpenModalAuth: false,
    isOpenModalAddUser: false,
};

const modalSlice = createSlice({
    name: "modalSlice",
    initialState,
    reducers: {
        setIsOpenModalAuthREDU: (state, { payload }) => {
            state.isOpenModalAuth = payload;
        },
        setIsOpenModalAddUserREDU: (state, { payload }) => {
            state.isOpenModalAddUser = payload;
        },
    },
});

export const { setIsOpenModalAuthREDU, setIsOpenModalAddUserREDU } = modalSlice.actions;

export default modalSlice.reducer;
