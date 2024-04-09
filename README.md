# Weather Dashboard Application

The Weather Dashboard Application is a React-based web application that allows users to search for current weather information by town name and view recent searches.

## Key Features

- Search for weather by town name
- Display the current weather information
- Show a list of recent searches
- Handle errors with user feedback

## Approach

The application uses the `fetchWeather` function from the `weatherForecastReq` service to request current weather data from the Weather API. The data fetched is then validated using Zod schemas before being used in the application.

### Validation with Zod

Zod schemas (`WeatherConditionSchema`, `WeatherCurrentSchema`, `WeatherLocationSchema`, `WeatherDataSchema`) are used to enforce the shape and data types of the API response. This provides a robust way of ensuring that the data conforms to the expected structure before processing.

### Error Handling

Errors are managed by catching exceptions during the fetch operation. Specific HTTP errors (such as 404 for not found resources) are checked to provide meaningful feedback to the user.

### User Interaction

Users can input a town name and initiate a search. Recent searches are clickable and will show the weather information for that specific search. An error popup component (`ErrorPopUp`) provides feedback if an error occurs during the search.

## Critical Code Sections

- `fetchWeather`: The asynchronous function that fetches weather data and handles errors.
- `WeatherDashboard`: The main React component that renders the application UI and orchestrates user interactions and data handling.
- `handleSearchClick`: The function that triggers the weather data fetch operation when the user clicks the search button or presses the Enter key.
- `handleRecentSearchClick`: The callback that is triggered when the user selects a town from the recent searches.

## Installation

To set up the project locally, you'll need to:

1. Rename `.env.example` file to `.env`.
2. Set real api key instead of `your_api_key_here`.
3. Run `npm install` to install dependencies.
4. Run `npm start` to start the development server.

## Usage

Once the application is running:

1. Enter a town name in the search box.
2. Click the search button or press Enter to view the weather.
3. Click on recent searches to quickly view weather for previously searched towns.
