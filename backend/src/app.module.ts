// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module'; // Import the WeatherModule

@Module({
  imports: [WeatherModule], // Include WeatherModule here
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
