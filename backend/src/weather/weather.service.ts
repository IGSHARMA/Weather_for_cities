import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Controller, Get } from '@nestjs/common';

// Controller handling the root route
@Controller()
export class AppController {
    @Get()
    getRootRoute(): string {
        return 'API is working!';
    }
}

// Service that handles weather-related logic
@Injectable()
export class WeatherService {
    constructor(private httpService: HttpService) { }

    // Private method to get geographic coordinates for a given city name
    private async getCoordinatesForCity(city: string): Promise<{ lat: number; lon: number; }> {
        const geolocationResponse = await firstValueFrom(
            this.httpService.get(`https://nominatim.openstreetmap.org/search?city=${city}&format=json`)
        );
        // Assuming the first entry in the response data is the city's geolocation
        const geolocationData = geolocationResponse.data[0];
        return { lat: geolocationData.lat, lon: geolocationData.lon };
    }

    // Private method to get weather data for specific geographic coordinates
    private async getWeatherForCoordinates(lat: number, lon: number): Promise<number> {
        // Fetching weather data from the National Weather Service API
        const weatherResponse = await firstValueFrom(
            this.httpService.get(`https://api.weather.gov/points/${lat},${lon}`)
        );
        const forecastUrl = weatherResponse.data.properties.forecast;
        const forecastResponse = await firstValueFrom(this.httpService.get(forecastUrl));
        const currentTemperature = forecastResponse.data.properties.periods[0].temperature;
        return currentTemperature;
    }

    // Public method to get weather data for a list of cities
    async getWeatherForCities(cities: string[]): Promise<any[]> {
        // Creating a promise for each city to fetch its weather data
        const weatherPromises = cities.map(async (city) => {
            try {
                const { lat, lon } = await this.getCoordinatesForCity(city);
                const temperature = await this.getWeatherForCoordinates(lat, lon);
                return { city, temperature };
            } catch (error) {
                // Logging and returning 'Unavailable' if fetching weather data fails
                console.error(`Failed to get weather for city ${city}:`, error);
                return { city, temperature: 'Unavailable' };
            }
        });
        // Resolving all the promises to get the weather data for all the cities
        return Promise.all(weatherPromises);
    }
}
