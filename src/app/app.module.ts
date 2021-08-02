import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { sunrise, sunset, wind, smartwatch, map, droplet, clipboard, server, clock,
  heartFill,badgeAd,github,globe,calendarDay,personCheckFill, cloudSun, linkedin, search, geoAlt } from 'ngx-bootstrap-icons';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { RoundPipe } from './round.pipe';
import { HomeComponent } from './home/home.component';
import { WeatherService } from './service/weather.service';
import { MappingService } from './service/mapping.service';
import { HourlyforecastService } from './service/hourlyforecast.service';
import { MapComponent } from './map/map.component';
import { HourlyForecastComponent } from './hourly-forecast/hourly-forecast.component';

import { AgmCoreModule } from '@agm/core';




export function playerFactory() {
  return player;
}

const icons = {
  sunrise, sunset, wind, droplet, heartFill, badgeAd, globe, smartwatch, clipboard, server,
  calendarDay, personCheckFill,cloudSun, linkedin, github, search, geoAlt,map, clock
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    RoundPipe,
    HomeComponent,
    MapComponent,
    HourlyForecastComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ProgressbarModule.forRoot(),
    NgxBootstrapIconsModule.pick(icons),
    LottieModule.forRoot({ player: playerFactory }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBQpU_Qsm9p8zq-f-pAvAjgEkhaxNmwYMY'
    })

  ],
  providers: [WeatherService, MappingService, HourlyforecastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
