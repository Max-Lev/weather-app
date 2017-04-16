import { Observable } from 'rxjs';
import { FavoritesService } from './../../services/favorites.service';
import { WeatherService } from './../../services/weather.service';
import {
  ChangeDetectorRef, Component, OnInit, AfterViewInit,
  AfterContentInit, OnDestroy, ChangeDetectionStrategy
} from '@angular/core';
import { weatherAPI } from './../../config/config';
import { Subscription } from "rxjs/Subscription";
import { MapsService } from './../../services/maps.service';
import { Router, ActivatedRoute } from "@angular/router";
import { NavigationStart } from "@angular/router";
import { WeatherModel } from './../../models/weather.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss', './fav-btn-container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WeatherService, MapsService]
})

export class SearchComponent implements OnInit,
  AfterViewInit, OnDestroy, AfterContentInit {

  WeatherModel: WeatherModel;
  isIdle: boolean = false;
  subscription: Subscription;
  favoritesAmount: any;
  dispayNav:any = new Observable();

  constructor(private ref: ChangeDetectorRef, private router: Router,
    private weatherService: WeatherService, private favoritesService: FavoritesService,
    private activatedRoute: ActivatedRoute, private mapsService: MapsService) {

  }

  ngOnInit() {
    this.mapsService.mapInit();
    this.favoritesAmount = this.favoritesService.getListAmount();
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };

  ngAfterViewInit() {

    this.subscription = this.mapsService.cityLocation$.subscribe((address) => {
      this.getWaeherByCityName(address);
      return name;
    });

    this.subscription = this.mapsService.isLoaded$.subscribe((state) => {
      this.isIdle = state;
      this.ref.detectChanges();
      return state;
    });

  };

  ngAfterContentInit() {

    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationStart) {
        this.isIdle = false;
      }
    });

    this.subscription = this.favoritesService.listCount().subscribe((amount) => {
      this.favoritesAmount = amount;
      return amount;
    });
      
  };

  getWaeherByCityName(address?: any) {

    
    this.subscription = this.weatherService.getTemprature(address).subscribe((weather) => {

      this.WeatherModel = new WeatherModel(address, weather);
      this.ref.detectChanges();
      return weather;

    });

  };

  add() {
    if (this.WeatherModel == undefined) return;
    this.favoritesService.setFavorite(this.WeatherModel);
  }

}
