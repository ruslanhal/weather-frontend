import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { WeatherDashboard } from "../../components/weatherDashboard/WeatherDashboard";
import { ReactElement } from "react";

const queryClient = new QueryClient();

beforeAll(() => {
  global.fetch = jest.fn();
});

beforeEach(() => {
  jest.clearAllMocks();
});

const renderWithProviders = (component: ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  );
};

describe("WeatherDashboard", () => {
  it("fetches and displays weather data successfully", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          location: {
            name: "Denver",
            region: "Colorado",
            country: "USA",
          },
          current: {
            temp_c: 20,
            humidity: 50,
            condition: {
              text: "Sunny",
              icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
            },
          },
        }),
    });

    renderWithProviders(<WeatherDashboard />);

    fireEvent.change(screen.getByPlaceholderText("Town"), {
      target: { value: "Denver" },
    });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("Denver")
      );
    });

    expect(await screen.findByText("Sunny")).toBeInTheDocument();
  });
});
