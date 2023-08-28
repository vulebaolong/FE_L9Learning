import { I_lesson, I_video } from "../interfaces/courseManagementInterface";

const parseDuration = (duration: string): number => {
    const parts = duration.split(":").map(Number);
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
}

export const handleDuration = (lessons: I_lesson[]) => {
    const totalDurationInSeconds: number = lessons.reduce((total: number, chuong: I_lesson) => {
        const chuongDuration: number = chuong.videos.reduce((chuongTotal: number, video: I_video) => {
            return chuongTotal + parseDuration(video.duration);
        }, 0);
        return total + chuongDuration;
    }, 0);
    const totalHours: number = Math.floor(totalDurationInSeconds / 3600);
    const totalMinutes: number = Math.floor((totalDurationInSeconds % 3600) / 60);
    const totalSeconds: number = totalDurationInSeconds % 60;
    return `${totalHours}:${totalMinutes}:${totalSeconds}`;
};


