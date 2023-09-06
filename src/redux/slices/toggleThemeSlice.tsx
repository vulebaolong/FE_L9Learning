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

            const btnLightElDt = document.querySelector(".btnLightDt");
            const btnLightElMb = document.querySelector(".btnLightMb");
            btnLightElDt?.classList.toggle("hidden");
            btnLightElMb?.classList.toggle("hidden");

            const btnNightElDt = document.querySelector(".btnNightDt");
            const btnNightElMb = document.querySelector(".btnNightMb");
            btnNightElDt?.classList.toggle("hidden");
            btnNightElMb?.classList.toggle("hidden");

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

            const btnLightElDt = document.querySelector(".btnLightDt");
            const btnLightElMb = document.querySelector(".btnLightMb");
            btnLightElDt?.classList.remove("hidden");
            btnLightElMb?.classList.remove("hidden");

            const btnNightElDt = document.querySelector(".btnNightDt");
            const btnNightElMb = document.querySelector(".btnNightMb");
            btnNightElDt?.classList.add("hidden");
            btnNightElMb?.classList.add("hidden");

            state.themeSelect = "dark";
        },
        lightThemeREDU: (state) => {
            const htmlElement = document.querySelector("html");
            htmlElement?.classList.remove("dark");

            const btnLightElDt = document.querySelector(".btnLightDt");
            const btnLightElMb = document.querySelector(".btnLightMb");
            btnLightElDt?.classList.add("hidden");
            btnLightElMb?.classList.add("hidden");

            const btnNightElDt = document.querySelector(".btnNightDt");
            const btnNightElMb = document.querySelector(".btnNightMb");
            btnNightElDt?.classList.remove("hidden");
            btnNightElMb?.classList.remove("hidden");

            state.themeSelect = "light";
        }
    },
});

export const { toggleThemeREDU, lightThemeREDU, darkThemeREDU } = toggleThemeSlice.actions;

export default toggleThemeSlice.reducer;
