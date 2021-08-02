import { Injectable } from '@angular/core';
import { WEATHER_API_KEY } from 'src/api';
import { HttpClient, HttpParams } from '@angular/common/http';


const apiKey = WEATHER_API_KEY;
const url = "https://api.openweathermap.org/data/2.5/weather?";

@Injectable({
  providedIn: 'root'
})
export class MappingService {

  
  constructor(private http: HttpClient) { }

  getGeoLocationWeather(lat: string, lon: string){
    let params =new HttpParams()
    .set('lat', lat)
    .set('lon', lon)
    .set('units', 'metric')
    .set('appid', apiKey)

    return this.http.get(url, { params });
  }

  getWeatherDataByCityName(city: string){
    let params = new HttpParams()
    .set('q', city)
    .set('units', 'metric')
    .set('appid', apiKey)

    return this.http.get(url, { params });
  }

}
