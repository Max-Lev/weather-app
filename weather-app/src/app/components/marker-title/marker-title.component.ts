import { WeatherModel } from './../../models/weather.model';
import { Component, OnInit, Input, OnChanges, DoCheck } from '@angular/core';

@Component({
  selector: 'app-marker-title',
  templateUrl: './marker-title.component.html',
  styleUrls: ['./marker-title.component.css']
})
export class MarkerTitleComponent implements OnInit, OnChanges {


  // @Input() clouds?: any = [];
   tempreture?: string = '';
   clouds?: string = '';
  @Input() Weather: WeatherModel;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(address: any): void {
    this.displayTemprature();
  };

  displayTemprature() {
    if (this.Weather != undefined && this.Weather != null) {
      this.clouds = this.Weather['clouds'];
      this.tempreture = this.Weather['temprature'];
    }
  };


}
