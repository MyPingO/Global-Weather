export const convertTemperature = (temp: number, isMetric: boolean) => {
    return isMetric ? temp : (temp * 9 / 5) + 32;
};

export const convertWindSpeed = (speed: number, isMetric: boolean) => {
    return isMetric ? speed : speed * 2.237;
}
