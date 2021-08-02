import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { HourlyForecastComponent } from './hourly-forecast/hourly-forecast.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'Hourly-Forecast', component: HourlyForecastComponent},
  { path: 'Geo-Maps', component: MapComponent },
  { path: 'App Services', component: AboutComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }