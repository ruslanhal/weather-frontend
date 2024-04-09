import { z } from "zod";

const WeatherConditionSchema = z.object({
  text: z.string(),
  icon: z.string(),
});

const WeatherCurrentSchema = z.object({
  temp_c: z.number(),
  humidity: z.number(),
  condition: WeatherConditionSchema,
});

const WeatherLocationSchema = z.object({
  name: z.string(),
  region: z.string(),
  country: z.string(),
});

const WeatherDataSchema = z.object({
  location: WeatherLocationSchema,
  current: WeatherCurrentSchema,
});

export type WeatherDataFromSchema = z.infer<typeof WeatherDataSchema>;

export const fetchWeather = async (
  city: string
): Promise<WeatherDataFromSchema> => {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  if (!apiKey) {
    throw new Error(
      "API key is not defined. Make sure REACT_APP_WEATHER_API_KEY is set."
    );
  }

  const baseURL = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    const response = await fetch(baseURL);
    if (response.status === 404) {
      throw new Error("404: The requested resource was not found.");
    }
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();

    const parsedData = WeatherDataSchema.parse(data);
    console.log(parsedData, "validated data");

    return parsedData;
  } catch (error) {
    console.error("There was a problem with the fetch operation: ", error);
    throw error;
  }
};
