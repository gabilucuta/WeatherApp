import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CitiesService } from './services/cities.service';
import { delay } from 'rxjs';
import { WeatherService } from './services/weather.service';
import { HourlyForecast, WeatherData } from './models/WeatherData';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  myControl = new FormControl('');
  date: Date = new Date();

  currentWeather?: WeatherData;
  forecastDaily?: WeatherData;

  daysAvaliable: number[] = [];
  hoursAvaliable: number[] = [];
  favourites: string[] = [];
  hourlyForecast?: HourlyForecast[] = [];

  numberOfDays = 5;
  numberOfHours = 5;
  valid: boolean = false;
  cities?: any;
  city: string = "";
  errorMessage = ""

  constructor(private weatherService: WeatherService,
    private citiesService: CitiesService,
    private themeService: ThemeService) { }

  ngOnInit(): void {
    this.getCities('EU');

    this.getLocation();
    this.getArrays();
  }

  getWeather(cityName: string) {
    this.weatherService.getCurrentWeather(cityName)
      .subscribe(data => this.currentWeather = data,
        error => alert('Error getting current weather, choose another city !'));

    if (this.currentWeather)
      this.date = this.currentWeather.location.localtime;

    this.weatherService.getWeatherForecast(cityName, this.numberOfDays)
      .subscribe(data => this.forecastDaily = data);

    this.weatherService.getWeatherForecastHourly(cityName, this.date, this.numberOfHours).subscribe(
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
    this.getWeather(this.city);
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
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const apiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`;
          fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
              this.city = data.city;
              this.getWeather(this.city);
            });
        },
        error => {
          this.city = 'Oradea';
          this.getWeather(this.city)
        }
      );
    }
  }

  getArrays() {
    for (let index = 1; index <= 8; index++) {
      this.hoursAvaliable.push(index);
    }

    for (let index = 1; index <= 5; index++) {
      this.daysAvaliable.push(index);
    }
  }
}