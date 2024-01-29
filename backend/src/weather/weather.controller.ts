import { Controller, Post, Body, Get } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) { }

    @Post()
    async getWeather(@Body('cities') cities: string[]): Promise<any[]> {
        return this.weatherService.getWeatherForCities(cities);
    }
}
