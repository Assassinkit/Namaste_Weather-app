import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { HourlyforecastService } from '../service/hourlyforecast.service';

@Component({
  selector: 'app-hourly-forecast',
  templateUrl: './hourly-forecast.component.html',
  styleUrls: ['./hourly-forecast.component.css']
})
export class HourlyForecastComponent implements OnInit {

  title = 'Namaste Weather';
  currentWeather;
  forecastWeather;
  airpollutionindex;
  latitude;
  longitude;
  sunrise;
  sunset;
  currentDay;
  inputLocation;
  aqiindex: string[]=[];
  currentWeatherIcon: string;
  currentBackground: string;
  forecastWeatherIcons: string[] = [];
  forecastDays: string[] = [];
  bottomWidth;
  displayWeather: boolean;
  geoLatitude;
  geoLongitude;
  geoCity;
  o3level;
  currentTime = new Date();
  options: AnimationOptions = {
    path: '/assets/Hourly_weather.json',
  };
  constructor(private hourlyforecastService: HourlyforecastService) { }

  ngOnInit() {
    // Handle Footer design
    this.displayWeather = true;
    if (this.displayWeather) {
      this.bottomWidth = "280px";
    }
  }

  // Get geo location
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.geoLatitude = position.coords.latitude;
        this.geoLongitude = position.coords.longitude;
        this.hourlyforecastService.getGeoLocationWeather(this.geoLatitude, this.geoLongitude).subscribe(data => {
          if (data) {
            this.geoCity = data.name;
            this.showWeather(this.geoCity); // Call show weather and pass city
          }
        });
      },
        error => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("User denied the request for Geolocation."); //if this happens and you still want the weather forecast than refresh the page and Allow the location service.
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
      this.showWeather(event.target.value);
    }
  }

  // Get current and forecast weather
  showWeather(location: string) {
    this.hourlyforecastService.getCurrentWeather(location).subscribe(data => {

      if (data) {
        this.displayWeather = false;
        this.bottomWidth = "8px"
      }

      // Get current weather data
      this.currentWeather = Array.of(data);
      console.log("Current weather : ", data); // Log current weather data

      // Get current Weather animation icon
      this.currentWeatherIcon = this.getAnimatedIcon(data.weather[0].description, this.getCurrentHour());

      // Get current Background
      this.currentBackground = this.getBackgroundImage(data.weather[0].description, this.getCurrentHour());

      // Get sunrise and sunset
      this.sunrise = this.sunTimeConverter(data.sys.sunrise);
      this.sunset = this.sunTimeConverter(data.sys.sunset);

      // Get current day and weekday
      this.currentDay = this.getDay(data.dt);

      //Get AirPollution Index
      this.latitude = data.coord.lat;
      this.longitude = data.coord.lon;
      this.hourlyforecastService.getairpollution(this.latitude, this.longitude).subscribe(data => {
        this.airpollutionindex= Array.of(data);
        this.o3level = data.list[0].components.o3;
        console.log("AQI : ", data); //log AQI data
        
        

      })


      // Get forecast weather data
      this.latitude = data.coord.lat;
      this.longitude = data.coord.lon;
      this.hourlyforecastService.getDailyForecast(this.latitude, this.longitude).subscribe(data => {
        this.forecastWeather = Array.of(data);
        console.log("Forecast Data : ", data); // Log forecast weather data

        // Get forecast Icons
        for (let i = 0; i < 6; i++) {
          this.forecastWeatherIcons[i] = this.getAnimatedIcon(data.hourly[i].weather[0].description, this.getCurrentHour());
        }

        // Get forecast Days
        for (let i = 0; i < 6; i++) {
          this.forecastDays[i] = this.getForecastDay(data.hourly[i].dt);
        }


      })
      //  Handle errors
    }, err => {
      if (err.error && err.error.message) {
        alert(err.error.message);
        return;
      }
      alert('Failed to get weather.');
    }, () => {
    });
  }



  // For getting sunrise and sunset time
  sunTimeConverter(unixTimestamp) {
    var date = new Date(unixTimestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var formattedTime = hours + ':' + minutes.substr(-2);
    return formattedTime;
  }

  // Get date and weekday
  getDay(unixTimestamp) {
    const dateObject = new Date(unixTimestamp * 1000);
    return dateObject.toLocaleString("en-IN", { day: "2-digit", month: "2-digit", weekday: "long" }) //in the Format: day, dd/mm
  }

  // Get forecast days 
  getForecastDay(unixTimestamp) {
    const dateObject = new Date(unixTimestamp * 1000);
    return dateObject.toLocaleString("en-IN", { weekday: "long" }) //in the Format: day
  }

  // Get current hour
  getCurrentHour() {
    var current = new Date();
    return current.getHours();
  }

  // Get animated icon 
  getAnimatedIcon(description, time) {
    if (time < 18) {
      if (description.match("clear sky")) {
        return "assets/animation-ready/clear-day.svg";
      }
      else if (description.match("few clouds")) {
        return "assets/animation-ready/partly-cloudy-day.svg";
      }
      else if (description.includes("clouds")) {
        return "assets/animation-ready/cloudy.svg";
      }
      else if (description.match("shower rain")) {
        return "assets/animation-ready/partly-cloudy-day-hail.svg";
      }
      else if (description.includes("rain")) {
        return "assets/animation-ready/partly-cloudy-day-rain.svg";
      }
      else if (description.includes("thunderstorm")) {
        return "assets/animation-ready/thunderstorms.svg";
      }
      else if (description.includes("snow")) {
        return "assets/animation-ready/partly-cloudy-day-snow.svg";
      }
      else if (description.includes("drizzle")) {
        return "assets/animation-ready/partly-cloudy-day-drizzle.svg";
      }
      else if (description.includes("mist")) {
        return "assets/animation-ready/mist.svg";
      }
      else if (description.includes("smoke")) {
        return "assets/animation-ready/mist.svg";
      }
      else if (description.includes("haze")) {
        return "assets/animation-ready/mist.svg";
      }
      else if (description.includes("sand/ dust whirls")) {
        return "assets/animation-ready/wind.svg";
      }
      else if (description.includes("dust")) {
        return "assets/animation-ready/wind.svg";
      }
      else if (description.includes("sand")) {
        return "assets/animation-ready/wind.svg";
      }
      else if (description.includes("fog")) {
        return "assets/animation-ready/mist.svg";
      }
      else if (description.includes("volcanic ash")) {
        return "assets/animation-ready/mist.svg";
      }
      else if (description.includes("squalls")) {
        return "assets/animation-ready/mist.svg";
      }
      else if (description.includes("tornado")) {
        return "assets/animation-ready/tornado.svg";
      }
    }
    else {
      if (description.match("clear sky")) {
        return "assets/animation-ready/clear-night.svg";
      }
      else if (description.match("few clouds")) {
        return "assets/animation-ready/partly-cloudy-night.svg";
      }
      else if (description.includes("clouds")) {
        return "assets/animation-ready/cloudy.svg";
      }
      else if (description.match("shower rain")) {
        return "assets/animation-ready/partly-cloudy-night-hail.svg";
      }
      else if (description.includes("rain")) {
        return "assets/animation-ready/partly-cloudy-night-rain.svg";
      }
      else if (description.includes("thunderstorm")) {
        return "assets/animation-ready/thunderstorms.svg";
      }
      else if (description.includes("snow")) {
        return "assets/animation-ready/partly-cloudy-night-snow.svg";
      }
      else if (description.includes("drizzle")) {
        return "assets/animation-ready/partly-cloudy-night-drizzle.svg";
      }
      else if (description.includes("mist")) {
        return "assets/animation-ready/mist.svg";
      }
      else if (description.includes("smoke")) {
        return "assets/animation-ready/mist.svg";
      }
      else if (description.includes("haze")) {
        return "assets/animation-ready/mist.svg";
      }
      else if (description.includes("sand/ dust whirls")) {
        return "assets/animation-ready/wind.svg";
      }
      else if (description.includes("dust")) {
        return "assets/animation-ready/wind.svg";
      }
      else if (description.includes("sand")) {
        return "assets/animation-ready/wind.svg";
      }
      else if (description.includes("fog")) {
        return "assets/animation-ready/mist.svg";
      }
      else if (description.includes("volcanic ash")) {
        return "assets/animation-ready/mist.svg";
      }
      else if (description.includes("squalls")) {
        return "assets/animation-ready/mist.svg";
      }
      else if (description.includes("tornado")) {
        return "assets/animation-ready/tornado.svg";
      }
    }
  }

  //Get Background Image
  getBackgroundImage(description, time) {
    if (time < 18) {
      if (description.match("clear sky")) {
        return "background: #ffffff url('assets/background/Clear-sky_day.jpg')";
      }
      else if (description.match("few clouds")) {
        return "background: #ffffff url('assets/background/fewclouds-day.jpg')";
      }
      else if (description.includes("clouds")) {
        return "background: #ffffff url('assets/background/clouds-day.jpg')";
      }
      else if (description.match("shower rain")) {
        return "background: #ffffff url('assets/background/shower_rain-day.jpg')";
      }
      else if (description.includes("rain")) {
        return "background: #ffffff url('assets/background/rain-day.jpg')";
      }
      else if (description.includes("thunderstorm")) {
        return "background: #ffffff url('assets/background/thunderstorm-day.jpg')";
      }
      else if (description.includes("snow")) {
        return "background: #ffffff url('assets/background/snow-day.jpg')";
      }
      else if (description.includes("drizzle")) {
        return "background: #ffffff url('assets/background/drizzle-day.jpg')";
      }
      else if (description.includes("mist")) {
        return "background: #ffffff url('assets/background/mist-day.jpg')";
      }
      else if (description.includes("smoke")) {
        return "background: #ffffff url('assets/background/smoke-day.jpg')";
      }
      else if (description.includes("haze")) {
        return "background: #ffffff url('assets/background/haze-day.jpg')";
      }
      else if (description.includes("sand/ dust whirls")) {
        return "background: #ffffff url('assets/background/dust_whirl-day.jpg')";
      }
      else if (description.includes("dust")) {
        return "background: #ffffff url('assets/background/dust_whirl-day.jpg')";
      }
      else if (description.includes("sand")) {
        return "background: #ffffff url('assets/background/dust_whirl-day.jpg')";
      }
      else if (description.includes("fog")) {
        return "background: #ffffff url('assets/background/fog-day.jpg')";
      }
      else if (description.includes("volcanic ash")) {
        return "background: #ffffff url('assets/background/volcanic_ash-day.jpg')";
      }
      else if (description.includes("squalls")) {
        return "background: #ffffff url('assets/background/squall-day.jpg')";
      }
      else if (description.includes("tornado")) {
        return "background: #ffffff url('assets/background/tornado-day.jpg')";
      }
    }
    else {
      if (description.match("clear sky")) {
        return "background: #ffffff url('assets/background/Clear-sky_night.jpg')";
      }
      else if (description.match("few clouds")) {
        return "background: #ffffff url('assets/background/fewclouds-night.jpg')";
      }
      else if (description.includes("clouds")) {
        return "background: #ffffff url('assets/background/clouds-night.jpg')";
      }
      else if (description.match("shower rain")) {
        return "background: #ffffff url('assets/background/shower_rain-night.jpg')";
      }
      else if (description.includes("rain")) {
        return "background: #ffffff url('assets/background/rain-night.jpg')";
      }
      else if (description.includes("thunderstorm")) {
        return "background: #ffffff url('assets/background/thunderstorm-night.jpg')";
      }
      else if (description.includes("snow")) {
        return "background: #ffffff url('assets/background/snow-night.jpg')";
      }
      else if (description.includes("drizzle")) {
        return "background: #ffffff url('assets/background/drizzle-night.jpg')";
      }
      else if (description.includes("mist")) {
        return "background: #ffffff url('assets/background/shower_rain-night.jpg')";
      }
      else if (description.includes("smoke")) {
        return "background: #ffffff url('assets/background/smoke-night.jpg')";
      }
      else if (description.includes("haze")) {
        return "background: #ffffff url('assets/background/haze-night.jpg')";
      }
      else if (description.includes("sand/ dust whirls")) {
        return "background: #ffffff url('assets/background/dust_whirl-night.jpg')";
      }
      else if (description.includes("dust")) {
        return "background: #ffffff url('assets/background/dust_whirl-night.jpg')";
      }
      else if (description.includes("sand")) {
        return "background: #ffffff url('assets/background/dust_whirl-night.jpg')";
      }
      else if (description.includes("fog")) {
        return "background: #ffffff url('assets/background/fog-night.jpg')";
      }
      else if (description.includes("volcanic ash")) {
        return "background: #ffffff url('assets/background/volcanic_ash-night.jpg')";
      }
      else if (description.includes("squalls")) {
        return "background: #ffffff url('assets/background/squall-night.jpg')";
      }
      else if (description.includes("tornado")) {
        return "background: #ffffff url('assets/background/tornado-night.jpg')";
      }
    }
  }

}

