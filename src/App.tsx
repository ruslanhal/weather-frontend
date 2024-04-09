import { WeatherDashboard } from "./components/weatherDashboard/WeatherDashboard";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <WeatherDashboard />
    </QueryClientProvider>
  );
}

export default App;
