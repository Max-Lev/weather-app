import { WeatherModel } from './../models/weather.model';
import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";

@Injectable()
export class MapsService {

  constructor() { }

  mapInit() {

    getCurrentLocation();
    let gMap = new window['google'].maps.Map(document.getElementById('map'));
    let infoWindow = new window['google'].maps.InfoWindow();


    var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');

    gMap.controls[window['google'].maps.ControlPosition.TOP_RIGHT].push(card);

    // Search By:
    var autocomplete = new window['google'].maps.places.Autocomplete(input);
    // var autocomplete = new window['google'].maps.places.Autocomplete(input, { types: ['(cities)'] });

    autocomplete.bindTo('bounds', gMap);
    // console.log(autocomplete);

    var infowindow = new window['google'].maps.InfoWindow();

    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);

    var marker = new window['google'].maps.Marker({
      map: gMap,
      anchorPoint: new window['google'].maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', () => {

      infowindow.close();

      marker.setVisible(false);

      var place = autocomplete.getPlace();

      if (place.photos == undefined) {
        place.pImg = "http://www.acsu.buffalo.edu/~rslaine/imageNotFound.jpg";
      }
      else {
        let pImg = place.photos[0].getUrl({
          'maxWidth': 450,
          'maxHeight': 450
        });
        place.pImg = pImg;
      }

      if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        gMap.fitBounds(place.geometry.viewport);
        // console.log('place.geometry.viewport:', place.geometry.viewport);
      } else {
        gMap.setCenter(place.geometry.location);
        gMap.setZoom(17);
      }
      // console.log('place.geometry:', place.geometry);

      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      var address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }

      infowindowContent.children['place-address'].textContent = address;

      infowindow.open(gMap, marker);

      var LL = new window['google'].maps.LatLng({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
      place.geometry.location.lng().toFixed(0);
      gMap.setCenter(LL);

      place.geometry.location.lng().toFixed(0);

      this.set(place);

    });

    function getCurrentLocation() {

      if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function (position) {
          var pos =
            {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
          marker.setPosition(pos);
          gMap.setCenter(pos);
          gMap.setZoom(17);

        },
          function () {
            handleLocationError(true, infoWindow, gMap.getCenter());
          });
      }
      else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, gMap.getCenter());
      }
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(gMap);
    }

    window['google'].maps.event.addListener(gMap, 'tilesloaded', () => {
      this.isIDle();
    });

  };

  ///////////////////weather-app/////////////////////////

  isLoaded: any = new Subject();
  isLoaded$ = this.isLoaded.asObservable();
  isIDle() {
    this.isLoaded.next(true);
  }

  cityLocation: any = new Subject<any>();
  cityLocation$ = this.cityLocation.asObservable();

  set(place?: any) {

    let address: any = {

      lat: place.geometry.location.lat().toFixed(0),
      lon: place.geometry.location.lng().toFixed(0),
      formatted_address: '',
      img: ''

    };

    address.formatted_address = place.formatted_address;
    address.img = place.pImg;
    this.cityLocation.next(address);
  };



}
