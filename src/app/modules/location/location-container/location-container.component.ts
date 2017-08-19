import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import * as L from 'leaflet';
import { Map } from 'leaflet';
import {LocationService} from '../../shared/services/location.service';
import {AppLocation} from '../../../app.model';
import { Router } from '@angular/router';
import { ToasterService, Toast } from 'angular2-toaster';

//setting map's marker icon
export const MARKER_ICON = L.icon({
    iconUrl: '/assets/marker-icon.png',
    iconSize:     [25, 41],
    iconAnchor:   [12.5, 41]
});

//in case location is not available for any reason - use default location instead
export const DEFAULT_LOCATION:AppLocation = {
    //nortecview HQ's coordinates
    lat:32.193188,
    lng:34.884006
};

@Component({
    selector: 'app-location-container',
    templateUrl: './location-container.component.html',
    styleUrls: ['./location-container.component.css']
})
export class LocationContainerComponent implements OnInit {
    private map:L.Map;//map
    private marker:L.Marker;//marker
    private location:AppLocation;//location tracker

    constructor(private locationService:LocationService,
        private router:Router,
        private toasterService: ToasterService) {}

        ngOnInit() {
            //update location
            this.location = this.locationService.getLocation();

            if(this.location){
                //use previously saved location to initialize map
                this.initMap(this.location);
            } else {
                //FIXME?: [devtools] handle violation 'Only request geolocation information in response to a user gesture.'
                if (navigator.geolocation){
                    //use browser's current location to initialize map
                    navigator.geolocation.getCurrentPosition((position) => {
                        this.location = {lat:position.coords.latitude, lng:position.coords.longitude};
                        this.initMap(this.location);
                    }, (err) => {
                        //current location is not avialable. set default location
                        this.setDefaultLocation();
                    });
                } else {
                    //current location is not supported. set default location
                    this.setDefaultLocation();
                }
            }
        }

        private setDefaultLocation(){
            //notify user
            this.toasterService.pop({
                type: 'error',
                body: 'No location have been saved yet'
            });

            //current location is not avialable or not supported. set default location to initialize map
            this.location = {lat:DEFAULT_LOCATION.lat, lng:DEFAULT_LOCATION.lng};
            this.initMap(this.location);
        }

        private initMap({lat, lng}){
            let HERE_normalDay;

            //set map using given location
            this.map = L.map('mapid').setView([lat, lng], 13);

            //set map's marker
            this.marker = L.marker([lat, lng], {icon: MARKER_ICON, draggable:true}).addTo(this.map);

            //set map's tile layer, using 'HERE' API
            HERE_normalDay = L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/{type}/{mapID}/normal.day/{z}/{x}/{y}/{size}/{format}?app_id={app_id}&app_code={app_code}&lg={language}', {
                attribution: 'Never lose sight of where you\'re going!',
                subdomains: '1234',
                mapID: 'newest',
                app_id: 'uuRdKZwb0MXCxDUmf4vb',
                app_code: 'duyMZ5irUq3nZ3lf8erQ1g',
                base: 'base',
                type: 'maptile',
                language: 'eng',
                format: 'png8',
                size: '256',
                z:13
            });
            HERE_normalDay.addTo(this.map);

            //bind map & marker events
            this.map.on('click', (e) => this.onMapClick(e));
            this.marker.on('dragend', (e) => this.onMarkerDragged(e));
        }

        private onMapClick(e) {
            //update marker and location
            this.marker.setLatLng(e.latlng);
            this.location = e.latlng;
            //NOTE: not panning map to center around new location, because it's seems eye-disturbing (only doing that for mouse-drag)
        }

        private onMarkerDragged(e){
            //update marker and location
            let {lat, lng} = this.marker.getLatLng();

            this.map.panTo(new L.LatLng(lat, lng));
            this.location = {lat, lng};
        }

        private upadteLocation(location){
            this.marker.setLatLng(location);
            this.map.panTo(new L.LatLng(location.lat, location.lng));
            this.location = location;
        }

        onLocationChange(newLocation){
            //update location, map & marker by new location
            this.upadteLocation(newLocation);
        }

        onLoadLocation(){
            //check if saved location exists
            let cachedLocation = this.locationService.getLocation();
            if(!cachedLocation){
                //no location saved. notify user
                this.toasterService.pop({
                    type: 'error',
                    title: 'Location not set',
                    body: 'No location was saved yet'
                });
            } else {
                //set location, map & marker by saved location
                this.upadteLocation(cachedLocation);
            }
        }

        onSaveLocation(){
            //save succesful. notify user
            this.toasterService.pop({
                type: 'success',
                body: 'Location saved'
            });

            //update location
            this.locationService.setLocation(this.location);

            ///naigate back to homepage
            this.router.navigate(['/']);
        }

    }
