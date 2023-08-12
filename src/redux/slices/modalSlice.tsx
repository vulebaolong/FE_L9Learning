import { createSlice } from "@reduxjs/toolkit";

interface I_initialState {
    isOpenModal: boolean;
}

const initialState: I_initialState = {
    isOpenModal: false,
};

const modalSlice = createSlice({
    name: "modalSlice",
    initialState,
    reducers: {
        setIsOpenModalREDU: (state, { payload }) => {
            state.isOpenModal = payload;
        },
    },
});

export const { setIsOpenModalREDU } = modalSlice.actions;

export default modalSlice.reducer;
