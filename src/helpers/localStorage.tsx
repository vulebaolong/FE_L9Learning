export const lcStorage = {
    set: (key: string, value: object | [] | string) => localStorage.setItem(key, JSON.stringify(value)),

    get: (key: string) => {
        const dataString: string | null = localStorage.getItem(key);
        let data = null;
        if (dataString !== null) data = JSON.parse(dataString);
        return data;
    },

    remove: (key: string) => localStorage.removeItem(key),
};
