import { SearchComponent } from './../../components/search/search.component';
import { FavoritesComponent } from './../../components/favorites/favorites.component';

import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'search', component: SearchComponent
  },
  {
    path: 'favorites', component: FavoritesComponent
  },
  {
    path: '', redirectTo: 'search', pathMatch: 'full'
  },
  {
    path: '**', component: SearchComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    // RouterModule.forRoot(routes)
    RouterModule.forRoot(routes,{ useHash: true })
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutesModule { }
