// src/components/weatherIcons.tsx
const weatherIcons: { [key: number]: string } = {
    // Thunderstorm
    200: 'bi bi-cloud-lightning-rain', // thunderstorm with light rain
    201: 'bi bi-cloud-lightning-rain', // thunderstorm with rain
    202: 'bi bi-cloud-lightning-rain', // thunderstorm with heavy rain
    210: 'bi bi-cloud-lightning', // light thunderstorm
    211: 'bi bi-cloud-lightning', // thunderstorm
    212: 'bi bi-cloud-lightning', // heavy thunderstorm
    221: 'bi bi-cloud-lightning', // ragged thunderstorm
    230: 'bi bi-cloud-lightning-rain', // thunderstorm with light drizzle
    231: 'bi bi-cloud-lightning-rain', // thunderstorm with drizzle
    232: 'bi bi-cloud-lightning-rain', // thunderstorm with heavy drizzle
    // Drizzle
    300: 'bi bi-cloud-drizzle', // light intensity drizzle
    301: 'bi bi-cloud-drizzle', // drizzle
    302: 'bi bi-cloud-drizzle', // heavy intensity drizzle
    310: 'bi bi-cloud-drizzle', // light intensity drizzle rain
    311: 'bi bi-cloud-drizzle', // drizzle rain
    312: 'bi bi-cloud-drizzle', // heavy intensity drizzle rain
    313: 'bi bi-cloud-drizzle', // shower rain and drizzle
    314: 'bi bi-cloud-drizzle', // heavy shower rain and drizzle
    321: 'bi bi-cloud-drizzle', // shower drizzle
    // Rain
    500: 'bi bi-cloud-rain', // light rain
    501: 'bi bi-cloud-rain', // moderate rain
    502: 'bi bi-cloud-rain-heavy', // heavy intensity rain
    503: 'bi bi-cloud-rain-heavy', // very heavy rain
    504: 'bi bi-cloud-rain-heavy', // extreme rain
    511: 'bi bi-cloud-sleet', // freezing rain
    520: 'bi bi-cloud-rain', // light intensity shower rain
    521: 'bi bi-cloud-rain', // shower rain
    522: 'bi bi-cloud-rain-heavy', // heavy intensity shower rain
    531: 'bi bi-cloud-rain-heavy', // ragged shower rain
    // Snow
    600: 'bi bi-cloud-snow', // light snow
    601: 'bi bi-cloud-snow', // snow
    602: 'bi bi-cloud-snow', // heavy snow
    611: 'bi bi-cloud-sleet', // sleet
    612: 'bi bi-cloud-sleet', // light shower sleet
    613: 'bi bi-cloud-sleet', // shower sleet
    615: 'bi bi-cloud-sleet', // light rain and snow
    616: 'bi bi-cloud-sleet', // rain and snow
    620: 'bi bi-cloud-snow', // light shower snow
    621: 'bi bi-cloud-snow', // shower snow
    622: 'bi bi-cloud-snow', // heavy shower snow
    // Atmosphere
    701: 'bi bi-cloud-fog', // mist
    711: 'bi bi-cloud-fog', // smoke
    721: 'bi bi-cloud-fog', // haze
    731: 'bi bi-cloud-fog', // sand/dust whirls
    741: 'bi bi-cloud-fog', // fog
    751: 'bi bi-cloud-fog', // sand
    761: 'bi bi-cloud-fog', // dust
    762: 'bi bi-cloud-fog', // volcanic ash
    771: 'bi bi-cloud-fog', // squalls
    781: 'bi bi-cloud-fog', // tornado
    // Clear
    800: 'bi bi-sun', // clear sky
    // Clouds
    801: 'bi bi-cloud-sun', // few clouds
    802: 'bi bi-cloud', // scattered clouds
    803: 'bi bi-cloud', // broken clouds
    804: 'bi bi-cloud', // overcast clouds
};

export default weatherIcons;
