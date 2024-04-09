import { WeatherData } from "../types/weatherTypes";

interface Props {
  search: WeatherData;
  onClick: () => void;
  isDisabled: boolean;
}

export const RecentSearchTown = ({ search, onClick, isDisabled }: Props) => {
  return (
    <div className="card my-2 p-4 rounded-lg shadow-md bg-white">
      <li className="flex justify-between items-center">
        <span>
          {search.location.name}, {search.location.region}:{" "}
          {search.current.temp_c}°C
        </span>
        <button
          className={`py-2 px-4 ml-4 text-white rounded transition duration-300 ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed hover:bg-gray-500"
              : "bg-blue-500 hover:bg-blue-700"
          }`}
          onClick={onClick}
          disabled={isDisabled}
        >
          Show
        </button>
      </li>
    </div>
  );
};
