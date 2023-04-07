import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CitiesService } from './services/cities.service';
import { delay, empty } from 'rxjs';
import { WeatherService } from './services/weather.service';
import { HourlyForecast, WeatherData } from './models/WeatherData';
import { ThemeService } from "src/app/services/theme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  myControl = new FormControl('');
  currentWeather?: WeatherData;
  forecastDaily?: WeatherData;

  daysAvaliable: number[] = [];
  numberOfDays = 5;
  hoursAvaliable: number[] = [];


  numberOfHours = 5;
  favourites: string[] = [];
  valid: boolean = false;

  hourlyForecast?: HourlyForecast[] = [];
  cities?: any;
  city: string = "";
  date: Date = new Date();
  lat: number = 0;
  lng: number = 0;

  constructor(private weatherService: WeatherService,
    private citiesService: CitiesService,
    private themeService: ThemeService) { }

  async ngOnInit() {
    this.getCities('a');
    this.getLocation();

    const locationData = await this.weatherService.getLocationData(this.lat,this.lng);
    this.city = locationData.location.name;
    this.getWeather();

    for (let index = 1; index <= 9; index++) {
      this.hoursAvaliable.push(index);
    }

    for (let index = 1; index <= 5; index++) {
      this.daysAvaliable.push(index);
    }
  }

  getWeather() {
    this.weatherService.getCurrentWeather(this.city)
      .subscribe(data => this.currentWeather = data);

    if (this.currentWeather)
      this.date = this.currentWeather.location.localtime;

    this.weatherService.getWeatherForecast(this.city, this.numberOfDays)
      .subscribe(data => this.forecastDaily = data);

    this.weatherService.getWeatherForecastHourly(this.city, this.date, this.numberOfHours).subscribe(
      (data) => {
        const startDate = new Date(`${this.date} UTC`);
        const endDate = new Date(startDate.getTime() + this.numberOfHours * 60 * 60 * 1000);
        this.hourlyForecast = data?.forecast?.forecastday[0].hour?.map((item) => ({
          ...item,
          timeAsDate: new Date(`${item.time} UTC`)
        })).filter((item) => item.timeAsDate > startDate && item.timeAsDate < endDate);
      }
    );

  }

  getCities(cityName: string) {
    this.citiesService.getCities(cityName)
      .pipe(delay(1000))
      .subscribe(response => {
        this.cities = response;
      });
  }

  toggleTheme() {
    if (this.themeService.isDarkTheme()) {
      this.themeService.setLightTheme();
    } else {
      this.themeService.setDarkTheme();
    }
  }

  addFavourite() {
    this.valid = true;
    if (this.currentWeather && this.favourites)
      this.favourites.push(this.currentWeather?.location.name);
  }

  removeFavourite() {
    if (this.currentWeather && this.favourites) {
      var index = this.favourites.indexOf(this.currentWeather?.location.name);
      if (index !== -1) {
        this.favourites.splice(index, 1);
      }
    }

    if (this.favourites.length == 0)
      this.valid = false;
  }

  onSelect(selectedCity: string) {
    if (this.currentWeather)
      this.city = selectedCity;
    this.getWeather();
  }

  checkFavourites() {
    if (this.currentWeather && this.favourites)
      if (this.favourites.includes(this.currentWeather.location.name))
        return true
      else return false

    return false
  }

  updateDays(numberofhours: number) {
    this.numberOfDays = numberofhours;
    this.weatherService.getWeatherForecast(this.city, this.numberOfDays)
      .subscribe(data => this.forecastDaily = data);
  }

  updateHours(numberofdays: number) {
    this.numberOfHours = numberofdays;
    this.weatherService.getWeatherForecastHourly(this.city, this.date, this.numberOfHours).subscribe(
      (data) => {
        const startDate = new Date(`${this.date} UTC`);
        const endDate = new Date(startDate.getTime() + this.numberOfHours * 60 * 60 * 1000);
        this.hourlyForecast = data?.forecast?.forecastday[0].hour?.map((item) => ({
          ...item,
          timeAsDate: new Date(`${item.time} UTC`)
        })).filter((item) => item.timeAsDate > startDate && item.timeAsDate < endDate);
      }
    );
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        }
      })
    }
  }
}