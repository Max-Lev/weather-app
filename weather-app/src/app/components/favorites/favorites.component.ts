import { Router } from '@angular/router';
import { DeleteService } from './../../services/delete.service';
import { Subscription } from 'rxjs/Subscription';
import { WeatherModel } from './../../models/weather.model';
import { FavoritesService } from './../../services/favorites.service';
import { Component, OnInit, AfterContentInit, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, AfterViewInit, OnDestroy {

  subscription: Subscription;
  favoritesList: Array<WeatherModel> = [];
  showDeleteBtn: boolean = false;
  constructor(private favoritesService: FavoritesService,
    private router: Router,
    private deleteService: DeleteService) {

  }

  ngOnInit() { };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {

    this.favoritesList = this.favoritesService.getFavorites().map((item, key) => {
      item.ID = key;
      return item;
    });
    this.subscription = this.deleteService.deleteList$.subscribe((items: Array<any>) => {
      this.showDeleteBtn = (items.length > 0) ? true : false;
    });

  };

  deleteEmitter(indexList) {

    this.formateItemID(this.favoritesList);

    indexList.filter((indxdelete, key) => {

      this.favoritesList.find((item, key) => {
        if (item.ID == indxdelete) {
          (item.ID == 0) ? this.favoritesList.splice(-indxdelete, 1) : false;

          (item.ID == this.favoritesList.length) ? this.favoritesList.splice(indxdelete - 1, 1) : false;

          (item.ID != 0) ? this.favoritesList.splice(indxdelete, 1) : false;
          return true;
        }
      });
    });

    this.showDeleteBtn = false;

    this.favoritesService.setSharedList(this.favoritesList);

    (this.favoritesList.length == 0) ? this.router.navigate(['search']) : false;

  };

  formateItemID(list): Array<any> {
    return list.map((item, key) => { item.ID = key; return item; });
  };

  imageError($event) {
    this.favoritesList['img'] = "http://www.nokiafirmware.net/img/nokia/Image-Not-Found.png";
  };



}
