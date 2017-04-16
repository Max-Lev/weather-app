import { DeleteService } from './services/delete.service';
import { FavoritesService } from './services/favorites.service';
import { WeatherService } from './services/weather.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

import { RoutesModule } from './modules/routes/routes.module';
import { SearchComponent } from './components/search/search.component';

import { MdlIconModule } from 'angular2-mdl/components/icon/mdl-icon.component';
import { MdlButtonModule } from 'angular2-mdl/components/button/mdl-button.component';
import { PlacesComponent } from './components/places/places.component';
import { MapsService } from './services/maps.service';
import { MarkerTitleComponent } from './components/marker-title/marker-title.component';
import { BackComponent } from './components/back/back.component';
import { DeleteComponent } from './components/delete/delete.component';
import { CardComponent } from './components/card/card.component';


@NgModule({
  declarations: [
    AppComponent,
    FavoritesComponent,
    SearchComponent,
    PlacesComponent,
    MarkerTitleComponent,
    BackComponent,
    DeleteComponent,
    CardComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutesModule,
    MdlIconModule,
    MdlButtonModule
  ],
  providers: [MapsService, WeatherService, FavoritesService,DeleteService],
  bootstrap: [AppComponent]
})
export class AppModule { }


