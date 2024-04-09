import { WeatherData } from "../types/weatherTypes";

interface Props {
  weather: WeatherData;
}

export const WeatherCard = ({ weather }: Props) => {
  return (
    <div className="mt-5 p-4 border rounded shadow-lg">
      <h2 className="text-2xl font-bold">
        {weather.location.name}, {weather.location.region}
      </h2>
      <p>{weather.location.country}</p>
      <div className="flex justify-between">
        <div>
          <p>
            <strong>Temperature:</strong> {weather.current.temp_c}°C
          </p>
          <p>
            <strong>Humidity:</strong> {weather.current.humidity}%
          </p>
          <p>
            <strong>Condition:</strong> {weather.current.condition.text}
          </p>
        </div>
        <div>
          <img src={weather.current.condition.icon} alt="Weather Icon" />
        </div>
      </div>
    </div>
  );
};
