import { Router } from '@angular/router';
import { DeleteService } from './../../services/delete.service';
import { Subscription } from 'rxjs/Subscription';
import { WeatherModel } from './../../models/weather.model';
import { FavoritesService } from './../../services/favorites.service';
import { Component, OnInit, AfterContentInit, AfterViewInit, OnDestroy } from '@angular/core';
import { list } from './fav';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, AfterViewInit, OnDestroy {

  subscription: Subscription;
  favoritesList: any = [];
  showDeleteBtn: boolean = false;
  constructor(private favoritesService: FavoritesService,
    private router: Router,
    private deleteService: DeleteService) {

  }

  ngOnInit() {

  };

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
    this.showDeleteBtn = true;
  };

  //deleteEmitter: from btn delete-component
  //confirms delete action
  deleteEmitter(indexList) {

    let placesList = this.formateItemID(this.favoritesList);
    let selectedList = [];

    placesList.map((items, keys) => {
      indexList.map((selected, selectedKeys) => {
        if (selected === items.ID) {
          selectedList.push(placesList[keys]);
          return;
        }
      });
    });

    //copy favoritesList
    let temporaryList = this.favoritesList.slice(0);

    selectedList.filter((data, index) => {
      temporaryList.map((items, keys) => {
        if (items == data) {
          temporaryList[keys] = ''
        }
      });
      temporaryList = temporaryList.filter((items) => {
        return items !== '';
      });
    });
    this.updateView(temporaryList);
    // indexList.filter((indxdelete, key) => {
    //   debugger;
    //   this.favoritesList.find((item, key) => {
    //     debugger;
    //     if (item.ID == indxdelete) {
    //       var a = (item.ID == 0) ? this.favoritesList.splice(-indxdelete, 1) : false;

    //       var b = (item.ID == this.favoritesList.length) ? this.favoritesList.splice(indxdelete - 1, 1) : false;

    //       var c = (item.ID != 0) ? this.favoritesList.splice(indxdelete, 1) : false;

    //       return true;
    //     }
    //   });
    // });

  };

  updateView(list: any) {

    this.favoritesList = list;

    this.showDeleteBtn = false;

    this.favoritesService.setSharedList(this.favoritesList);

    (this.favoritesList.length == 0) ? this.router.navigate(['search']) : false;
  }

  formateItemID(list): Array<any> {
    return list.map((item, key) => { item.ID = key; return item; });
  };

  imageError($event) {
    this.favoritesList['img'] = "http://www.nokiafirmware.net/img/nokia/Image-Not-Found.png";
  };



}
