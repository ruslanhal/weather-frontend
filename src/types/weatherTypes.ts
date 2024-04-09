export interface WeatherCondition {
  text: string;
  icon: string;
}

export interface WeatherCurrent {
  temp_c: number;
  humidity: number;
  condition: WeatherCondition;
}

export interface WeatherLocation {
  name: string;
  region: string;
  country: string;
}

export interface WeatherData {
  location: WeatherLocation;
  current: WeatherCurrent;
}
