import { createSlice } from "@reduxjs/toolkit";

interface I_initialState {
    themeSelect: string;
}

const initialState: I_initialState = {
    themeSelect: "dark",
};

const toggleThemeSlice = createSlice({
    name: "toggleThemeSlice",
    initialState,
    reducers: {
        toggleThemeREDU: (state) => {
            const htmlElement = document.querySelector("html");
            htmlElement?.classList.toggle("dark");

            const btnLightEl = document.querySelector(".btnLight");
            btnLightEl?.classList.toggle("hidden");

            const btnNightEl = document.querySelector(".btnNight");
            btnNightEl?.classList.toggle("hidden");

            if (state.themeSelect === "dark") {
                state.themeSelect = "light";
            } else {
                state.themeSelect = "dark";
            }
        },
    },
});

export const { toggleThemeREDU } = toggleThemeSlice.actions;

export default toggleThemeSlice.reducer;
