import React, { useState } from 'react';
import './WeatherApp.css';

function WeatherApp() {
    // State hooks for user input, temperature data, unit selection, and loading status
    const [input, setInput] = useState('');
    const [temperatures, setTemperatures] = useState([]);
    const [isCelsius, setIsCelsius] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Event handler for form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            // Fetch weather data from backend
            const response = await fetch('http://localhost:4000/weather', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cities: input.split(',') }) // Split input by commas for multiple cities
            });
            const data = await response.json(); // Parse JSON response
            handleSetTemperatures(data); // Handle setting the temperatures
        } catch (error) {
            console.error('Error fetching weather data:', error); // Log any errors
        }

        setIsLoading(false);
        setInput('');
    };

    // Process and set temperature data in state
    const handleSetTemperatures = (data) => {
        // Alert if 'Unavailable' temperature is present
        const unavailableCities = data.filter(item => item.temperature === 'Unavailable');
        if (unavailableCities.length > 0) {
            window.alert('Some city temperatures could not be found. Please check the city names and try again.');
        }

        // Map data to parse temperatures or set as 'Unavailable'
        const tempsWithNumbers = data.map(item => ({
            ...item,
            temperature: item.temperature !== 'Unavailable' ? parseFloat(item.temperature) : 'Unavailable'
        }));

        setTemperatures(tempsWithNumbers); // Update state with processed temperatures
    };

    // Toggle unit between Celsius and Fahrenheit
    const toggleTemperatureUnit = () => {
        setIsCelsius(!isCelsius);
    };

    // Convert Fahrenheit to Celsius
    const convertToCelsius = (fahrenheit) => (((fahrenheit - 32) * 5) / 9).toFixed(1);

    // Determine the background class based on temperatures
    function getBackgroundClass(temperatures) {
        // Default background if no temperatures or any 'Unavailable'
        if (temperatures.length === 0 || temperatures.some(item => item.temperature === 'Unavailable')) {
            return 'default-background';
        }
        const validTemperature = temperatures.find(item => item.temperature !== 'Unavailable');
        if (!validTemperature) {
            return 'default-background';
        }
        return determineTemperatureClass(validTemperature.temperature);
    }

    // Return appropriate class for temperature range
    function determineTemperatureClass(temperature) {
        if (temperature <= 40) return 'cold';
        if (temperature <= 50) return 'cool';
        if (temperature <= 70) return 'mild';
        if (temperature <= 85) return 'warm';
        return 'hot';
    }

    // Display temperature with appropriate unit
    const displayTemperature = (temperature) => {
        return temperature === 'Unavailable' ? temperature : isCelsius ? convertToCelsius(parseFloat(temperature)) : parseFloat(temperature).toFixed(1);
    };

    // Current background class based on temperatures
    const backgroundClass = getBackgroundClass(temperatures);

    //Render componenent
    return (
        <div className={`screen ${backgroundClass}`}>
            <header className="app-header">
                <img src={`${process.env.PUBLIC_URL}/weather_logo.png`} alt="ClearSky Forecast Logo" className="app-logo" />
                <h1 className="app-title">ClearSky Forecast</h1>
            </header>
            <div className={`weather-container`}>
                {isLoading ? (
                    <div className="loading-spinner"></div> // Show only the loading spinner when loading
                ) : (
                    <>
                        <form onSubmit={handleSubmit} className='weather-form'>
                            <input
                                type="text"
                                id="city-input"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder='Enter city name(s)'
                                className='weather-input'
                            />
                            <button type="submit" className='weather-button'>Get temperatures</button>
                        </form>
                        <label className="switch">
                            <input type="checkbox" checked={isCelsius} onChange={toggleTemperatureUnit} />
                            <span className="slider round"></span>
                        </label>
                        <ul>
                            {temperatures.map((item, index) => (
                                <li key={index}>
                                    {item.city}: {displayTemperature(item.temperature)}°{item.temperature !== 'Unavailable' ? isCelsius ? 'C' : 'F' : ''}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
}

export default WeatherApp;
