export interface WeatherData {
  location: Location;
  current?: Current;
  forecast?: Forecast;
}

export interface Location {
  name: string;
  region: string;
  country: string;
  localtime: Date;
}

export interface Current {
  temp_c: number;
  temp_f: number;
  condition: {
    icon: string;
  };
  wind_kph: number;
  feelslike_c: number;
  humidity: number;
  pressure_in: number;
  vis_km: number;
}

export interface Forecast {
  forecastday: {
    hour: HourlyForecast[];
    date: string;
    astro: Astro;
    day: {
      maxtemp_c: number;
      mintemp_c: number;
      avgtemp_c: number;
      totalprecip_in: number;
      condition: {
        text: string;
        icon: string;
      };
    }
    hourly: HourlyForecast[]
  }[];
}

export interface Astro {
  sunrise: string;
  sunset: string;
}

export interface HourlyForecast {
  time: string;
  temp_c: number;
  condition: {
    text: string;
    icon: string;
  };
}