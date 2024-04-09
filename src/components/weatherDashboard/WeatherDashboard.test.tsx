import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { WeatherDashboard } from "./WeatherDashboard";
import { fetchWeather } from "../../services/weatherFetching/weatherForecastReq";
import { WeatherData } from "../../types/weatherTypes";

jest.mock("../../services/weatherFetching/weatherForecastReq", () => ({
  fetchWeather: jest.fn(),
}));

const mockFetchWeather = fetchWeather as jest.MockedFunction<
  typeof fetchWeather
>;

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe("WeatherDashboard", () => {
  it("renders correctly", () => {
    renderWithProviders(<WeatherDashboard />);
    expect(screen.getByText(/Weather Dashboard/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Town/i)).toBeInTheDocument();
  });

  it("allows input to be entered", () => {
    renderWithProviders(<WeatherDashboard />);
    const input = screen.getByPlaceholderText(/Town/i);
    userEvent.type(input, "London");
    expect(input).toHaveValue("London");
  });

  it("submits the search and shows weather data on success", async () => {
    const fakeWeatherData: WeatherData = {
      location: {
        name: "London",
        region: "Greater London",
        country: "United Kingdom",
      },
      current: {
        temp_c: 14,
        humidity: 77,
        condition: {
          text: "Partly cloudy",
          icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
        },
      },
    };
    mockFetchWeather.mockResolvedValue(fakeWeatherData);

    renderWithProviders(<WeatherDashboard />);

    const input = screen.getByPlaceholderText(/Town/i);
    userEvent.type(input, "London");
    userEvent.click(screen.getByRole("button", { name: /Search/i }));

    await waitFor(() => {
      expect(mockFetchWeather).toHaveBeenCalledWith("London");
    });

    await waitFor(() => {
      expect(screen.getByText(/Partly cloudy/i)).toBeInTheDocument();
    });
  });

  it("shows an error message when the fetch fails", async () => {
    const errorMessage = "Network error";
    mockFetchWeather.mockRejectedValueOnce(new Error(errorMessage));

    renderWithProviders(<WeatherDashboard />);

    const input = screen.getByPlaceholderText(/Town/i);
    userEvent.type(input, "London");
    userEvent.click(screen.getByRole("button", { name: /Search/i }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
