import { Subject, Observable } from 'rxjs';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { weatherAPI } from './../config/config';
import { WeatherModel } from './../models/weather.model';
@Injectable()
export class WeatherService {

  weatherModel: WeatherModel;
  constructor(private http: Http) {

  }

  getTemprature(address: any): Observable<any> {

    let url = weatherAPI.weatherUrl + `lat=${address.lat}&lon=${address.lon}` + weatherAPI.ApiKey;
    let subj = new Subject();
    this.http.get(url).subscribe((data) => {
      let temp = data.json();
      subj.next(temp);
    });
    return subj;
  };

}


