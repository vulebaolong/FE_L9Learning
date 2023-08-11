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
        setIsOpenModal: (state, { payload }) => {
            state.isOpenModal = payload;
        },
    },
});

export const { setIsOpenModal } = modalSlice.actions;

export default modalSlice.reducer;
