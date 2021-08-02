import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WEATHER_API_KEY } from 'src/api';

//Declaring the apiKey and Urls.
const apiKey = WEATHER_API_KEY; 
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?";
const currentLocationUrl = "https://api.openweathermap.org/data/2.5/weather?";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getCurrentWeather(loc: string) : Observable<any> {
    return this.http.get(baseUrl + loc +'&appid=' + apiKey + '&units=metric'); 
  }//current weather API call over city name.

  getDailyForecast(lat : string, lon : string) : Observable<any> {
    return this.http.get(forecastUrl + 'lat=' + lat + '&lon=' + lon + '&exclude=hourly,minutely&appid=' + apiKey + '&units=metric');
  }//onecall weather forecast API call over geo-coordinates

  getGeoLocationWeather(lat : string, lon : string) : Observable<any> {
    return this.http.get(currentLocationUrl + 'lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=metric');
  }//current weather Api call by geo-coordinates

}
