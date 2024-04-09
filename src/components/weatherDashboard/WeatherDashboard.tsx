import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import searchIcon from "../../assets/icons/search.svg";
import { fetchWeather } from "../../services/weatherFetching/weatherForecastReq";
import { RecentSearchTown } from "../RecentSearchTown";
import { WeatherData } from "../../types/weatherTypes";
import { WeatherCard } from "../WeatherCard";
import { ErrorPopUp } from "../ErrorPopUp";

export const WeatherDashboard = () => {
  const [town, setTown] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [recentSearches, setRecentSearches] = useState<WeatherData[]>(() => {
    try {
      const items = localStorage.getItem("recentSearches");
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.error("Could not parse recent searches from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    } catch (error) {
      console.error("Could not store recent searches to localStorage", error);
    }
  }, [recentSearches]);

  const {
    mutate: fetchWeatherData,
    isError,
    error,
    reset,
  } = useMutation(fetchWeather, {
    onSuccess: (data) => {
      setWeather(data);
      setRecentSearches((prevSearches) => {
        const isExisting = prevSearches.some(
          (search) => search.location.name.toLowerCase() === town.toLowerCase()
        );
        return isExisting ? prevSearches : [data, ...prevSearches.slice(0, 4)];
      });
    },
  });

  const handleCloseError = () => {
    reset();
  };

  const handleSearchClick = () => {
    if (town) {
      fetchWeatherData(town);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTown(event.target.value);
  };

  const handleRecentSearchClick = (townName: string) => {
    setTown(townName);
    fetchWeatherData(townName);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className="w-full h-full flex items-center flex-col">
      <h1 className="text-4xl font-bold mt-10">Weather Dashboard</h1>
      <div className="mt-5 flex items-center">
        <input
          type="text"
          className="h-10 px-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500 shadow-sm"
          placeholder="Town"
          value={town}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button className="pl-2" onClick={handleSearchClick}>
          <img src={searchIcon} alt="Search" />
        </button>
      </div>
      {isError && (
        <ErrorPopUp
          error={
            error instanceof Error ? error.message : "An unknown error occurred"
          }
          handleCloseError={handleCloseError}
        />
      )}
      {weather && <WeatherCard weather={weather} />}
      <div className="w-4/5 mt-5">
        <h3 className="text-2xl font-bold">Recent Searches</h3>
        <ul>
          {recentSearches
            .filter((search) => !!search)
            .map((search, index) => (
              <RecentSearchTown
                key={index}
                search={search}
                onClick={() => handleRecentSearchClick(search.location.name)}
                isDisabled={weather?.location?.name === search?.location?.name}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};
