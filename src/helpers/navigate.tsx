import { NavigateFunction } from "react-router-dom";

export let navigate: NavigateFunction;

export const setNavigate = (navigateSet: NavigateFunction) => {
    navigate = navigateSet;
};