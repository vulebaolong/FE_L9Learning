export const formatCurrency = (amount: number | undefined) => {
    if (amount !== undefined) {
        const formatter = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        });
        return formatter.format(amount);
    }
};
