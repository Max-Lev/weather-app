import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { WeatherModel } from './../models/weather.model';
import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';

@Injectable()
export class FavoritesService {

  weatherModel: WeatherModel;
  list: Array<WeatherModel> = [];
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
    // = [
    //   {
    //     "clouds": "40%",
    //     "formatted_address": "Mexico",
    //     "img": "https://lh4.googleusercontent.com/-gWXXrUR5Ua4/WFxgWUGjtBI/AAAAAAAAAO4/uYfhfNXQve8OzGR2z5y4b3iQrm_Pj-vcwCLIB/w450-h450-k/",
    //     "location": "item-0",
    //     "selected": false,
    //     "temprature": "-10.86°C",
    //   },
    //   {
    //     "clouds": "76%",
    //     "formatted_address": "Cagnes-sur-Mer Alpes-Maritimes Provence-Alpes-Côte d'Azu",
    //     "img": "https://lh4.googleusercontent.com/-5Sg1KzfP9Bo/V4kudRAHeCI/AAAAAAABNj4/Rjo7nnCwpawOaCO9WhU1DtXJUAfHhBdfgCJkC/w450-h450-k/",
    //     "location": "item-1",
    //     "selected": false,
    //     "temprature": "23.09°C",
    //   },
    //   {
    //     "clouds": "64%",
    //     "formatted_address": "Québec, Canada",
    //     "img": "https://lh6.googleusercontent.com/-npDf46qBKig/V9q17NgveJI/AAAAAAAAkjQ/OraUjx6B6B8pba8Pbx0JAnWDqPVmL-r1ACLIB/w450-h450-k/",
    //     "location": "item-2",
    //     "selected": false,
    //     "temprature": "-10.86°C",
    //   },
    //   {
    //     "clouds": "76%",
    //     "formatted_address": "Cagnes-sur-Mer Alpes-Maritimes Provence-Alpes-Côte d'Azu",
    //     "img": "https://lh4.googleusercontent.com/-5Sg1KzfP9Bo/V4kudRAHeCI/AAAAAAABNj4/Rjo7nnCwpawOaCO9WhU1DtXJUAfHhBdfgCJkC/w450-h450-k/",
    //     "location": "item-3",
    //     "selected": false,
    //     "temprature": "23.09°C",
    //   },
    //   {
    //     "clouds": "64%",
    //     "formatted_address": "Québec, Canada",
    //     "img": "https://lh6.googleusercontent.com/-npDf46qBKig/V9q17NgveJI/AAAAAAAAkjQ/OraUjx6B6B8pba8Pbx0JAnWDqPVmL-r1ACLIB/w450-h450-k/",
    //     "location": "item-4",
    //     "selected": false,
    //     "temprature": "-10.86°C",
    //   }
    // ];

  };



}
