import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { WeatherModel } from './../models/weather.model';
import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';

@Injectable()
export class FavoritesService {

  weatherModel: WeatherModel;
  //list: Array<WeatherModel> = [];
  list: Array<any> = [];
  constructor() { }

  sharedList: any = new Subject();
  setSharedList(list: Array<any>) {

    this.list = list;

    this.sharedList = Rx.Observable.of(list);

    this.sharedList.subscribe((list) => { return list });

    this.listCounter.next(this.list.length);

  };

  setFavorite(weatherModel: WeatherModel) {

    if (this.list.length == 0) {
      this.list.push(weatherModel);
    }
    else {
      let added = this.list.find(item => item.formatted_address == weatherModel.formatted_address);
      if (!added) {
        this.list.push(weatherModel);
      }
    }

    this.listCounter.next(this.list.length);

  };

  listCounter: any = new Subject();
  listCount(): Observable<any> {
    return this.listCounter;
  };

  getListAmount(): number {
    return this.list.length;
  };


  getFavorites(): any {
    return this.list;

  };

}
