import { Component, Input } from '@angular/core';
import { HourlyForecast } from '../models/WeatherData';

@Component({
  selector: 'app-weather-chip',
  templateUrl: './weather-chip.component.html',
  styleUrls: ['./weather-chip.component.scss']
})
export class WeatherChipComponent {

  @Input() hour: HourlyForecast | undefined;
}
