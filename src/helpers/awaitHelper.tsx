export const wait = function (milisecond:number) {
    return new Promise(function (resolve) {
        setTimeout(resolve, milisecond);
    });
};