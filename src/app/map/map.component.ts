import { Component, OnInit } from '@angular/core';
import { MappingService } from '../service/mapping.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  
  lat;
  lon;
  weather;
  displayWeather: boolean;
  bottomWidth;
  currentTime = new Date();
  locationDenied: boolean = true;
  locationDeniedEnableCity: boolean= false;
  latitude:number=24.231; 
  longitude:number=82.4681;

  constructor(private mappingservice: MappingService) {}
   
  ngOnInit() {
    
    this.getLocation();
  }

  //For getting weather by geo-location service by lat & lon co-ordinates
  getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;

        this.mappingservice.getGeoLocationWeather(this.lat, this.lon).subscribe(data => {
          this.weather = data;
        });
      },
      error => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation."); 
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
          default:
            alert("An unknown error occurred.");
            break;
        }
      });    
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }


  // Call showWeather on Enter 
  searchWeather(event) {
    if (event.keyCode == 13) {
      this.getCity(event.target.value);
    }
  }

  //Get current weather on Search by city 
  getCity(city: string) {
    this.mappingservice.getWeatherDataByCityName(city).subscribe((data: any) => {
      this.weather = data;
      this.lat = data.coord.lat;
      this.lon = data.coord.lon;
      console.log(data);
      
    }, err => {
      if (err.error && err.error.message){
        alert(err.error.message);
        return;
      }
      alert('Failed to get weather.');
    }, ()=>{
    });
  }
}
