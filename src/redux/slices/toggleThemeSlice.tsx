import { createSlice } from "@reduxjs/toolkit";
import { lcStorage } from "../../helpers/localStorage";
import { THEME } from "../../contants/configContants";

interface I_initialState {
    themeSelect: string;
}

const initialState: I_initialState = {
    themeSelect: "light",
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
                lcStorage.set(THEME, "light")
            } else {
                state.themeSelect = "dark";
                lcStorage.set(THEME, "dark")
            }
        },
        darkThemeREDU: (state) => {
            const htmlElement = document.querySelector("html");
            htmlElement?.classList.add("dark");

            const btnLightEl = document.querySelector(".btnLight");
            btnLightEl?.classList.remove("hidden");

            const btnNightEl = document.querySelector(".btnNight");
            btnNightEl?.classList.add("hidden");

            state.themeSelect = "dark";
        },
        lightThemeREDU: (state) => {
            const htmlElement = document.querySelector("html");
            htmlElement?.classList.remove("dark");

            const btnLightEl = document.querySelector(".btnLight");
            btnLightEl?.classList.add("hidden");

            const btnNightEl = document.querySelector(".btnNight");
            btnNightEl?.classList.remove("hidden");

            state.themeSelect = "light";
        }
    },
});

export const { toggleThemeREDU, lightThemeREDU, darkThemeREDU } = toggleThemeSlice.actions;

export default toggleThemeSlice.reducer;
