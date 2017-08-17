import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Map } from 'leaflet';
import {LocationService} from '../../shared/services/location.service';
import {AppLocation} from '../../../app.model';
import { Router } from '@angular/router';

export const MARKER_ICON = L.icon({
    iconUrl: '/assets/marker-icon.png',
    iconSize:     [25, 41],
    iconAnchor:   [12.5, 41]
});

export const DEFAULT_LOCATION:AppLocation = {
    //nortecview HQ
    lat:32.193188,
    lng:34.884006
};

@Component({
    selector: 'app-location-container',
    templateUrl: './location-container.component.html',
    styleUrls: ['./location-container.component.css']
})
export class LocationContainerComponent implements OnInit {
    private map:L.Map;
    private marker:L.Marker;
    private location:AppLocation;

    constructor(private locationService:LocationService,
        private router:Router) { }

        ngOnInit() {
            this.location = this.locationService.getLocation();

            if(this.location){
                //use previously saved location
                this.initMap(this.location);
            } else {
                //FIXME: ? [devtools] handle violation 'Only request geolocation information in response to a user gesture.'
                if (navigator.geolocation){
                    //use browser's current location
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
            //current location is not avialable or not supported. set default location
            //FIXME: toaster notificaion
            console.log('setting default location');
            this.location = {lat:DEFAULT_LOCATION.lat, lng:DEFAULT_LOCATION.lng};
            this.initMap(this.location);
        }

        private initMap({lat, lng}){
            let {tileRow, tileColumn} = this.getTileXYByCoordinates(lat, lng);

            //this.locationService.setLocation({lat, lng});
            //console.log(lat,lng);

            this.map = L.map('mapid').setView([lat, lng], 13);
            this.marker = L.marker([lat, lng], {icon: MARKER_ICON, draggable:true}).addTo(this.map);

            //FIXME: how can I use tileRow/tileColumn in HERE's API request URL?

            //let url =  `https://1.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/13/${tileColumn}/${tileRow}/256/png8?app_id=uuRdKZwb0MXCxDUmf4vb&app_code=duyMZ5irUq3nZ3lf8erQ1g`;
            //let url =  'https://1.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/13/'+tileColumn+'/'+tileRow+'/256/png8?app_id=uuRdKZwb0MXCxDUmf4vb&app_code=duyMZ5irUq3nZ3lf8erQ1g';
            //let url =  'https://1.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/13/4400/2686/256/png8?app_id=uuRdKZwb0MXCxDUmf4vb&app_code=duyMZ5irUq3nZ3lf8erQ1g';

            //L.tileLayer('https://1.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/13/4400/2686/256/png8?app_id=uuRdKZwb0MXCxDUmf4vb&app_code=duyMZ5irUq3nZ3lf8erQ1g', {
            //L.tileLayer('http://{s}.base.maps.cit.api.here.com/maptile/2.1/{type}/{mapID}/{scheme}/{z}/{x}/{y}/{size}/{format}?app_id={uuRdKZwb0MXCxDUmf4vb}&app_code={duyMZ5irUq3nZ3lf8erQ1g}&lg={language}', {
            var HERE_normalDay = L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/{type}/{mapID}/normal.day/{z}/{x}/{y}/{size}/{format}?app_id={app_id}&app_code={app_code}&lg={language}', {
                attribution: 'Never lose sight of where you\'re going!',
                subdomains: '1234',
                mapID: 'newest',
                app_id: 'uuRdKZwb0MXCxDUmf4vb',
                app_code: 'duyMZ5irUq3nZ3lf8erQ1g',
                base: 'base',
                maxZoom: 20,
                type: 'maptile',
                language: 'eng',
                format: 'png8',
                size: '256',
                z:13//,
                //x:tileColumn,
                //y:tileRow
            });
            HERE_normalDay.addTo(this.map);

            // L.tileLayer.provider('HERE.terrainDay', {
            //     app_id: 'uuRdKZwb0MXCxDUmf4vb',
            //     app_code: 'duyMZ5irUq3nZ3lf8erQ1g'
            // }).addTo(this.map);

            //bind map & marker events
            this.map.on('click', (e) => this.onMapClick(e));
            this.marker.on('dragend', (e) => this.onMarkerDragged(e));
        }

        //TODO: extract to utils? maybe this Fn is NOT necessary
        private getTileXYByCoordinates(lat, lng){
            //var lat = 52.525439, // Latitude
            //lon = 13.38727,    // Longitude
            let z = 12,        // Zoom level
            latRad,
            n,
            xTile,
            yTile;

            latRad = lat * Math.PI / 180;
            n = Math.pow(2, z);
            xTile = n * ((lng + 180) / 360);
            yTile = n * (1-(Math.log(Math.tan(latRad) + 1/Math.cos(latRad)) /Math.PI)) / 2;

            return {tileColumn:Math.trunc(xTile/1), tileRow:Math.trunc(yTile/1)};
            //return {tileColumn:xTile, tileRow:yTile};
        }

        private onMapClick(e) {
            this.marker.setLatLng(e.latlng);
            this.location = e.latlng;
            //this.locationService.setLocation(this.marker.getLatLng());
            //NOTE: not panning map to center around new location, because it's seems eye-disturbing
        }

        private onMarkerDragged(e){
            let {lat, lng} = this.marker.getLatLng();

            this.map.panTo(new L.LatLng(lat, lng));
            this.location = {lat, lng};
            //this.locationService.setLocation({lat, lng});
        }

        onLocationChange(newLocation){
            //this.marker.setLatLng(newLocation);
            //this.map.panTo(new L.LatLng(newLocation.lat, newLocation.lng));

            this.location = newLocation;
        }

        onLoadLocation(){
            let currentLocation = this.locationService.getLocation();
            if(!currentLocation){
                debugger;
                //this.location = this.locationService.getLocation() || DEFAULT_LOCATION;
                //TODO:: notify user
            } else {
                this.marker.setLatLng(this.location);
                this.map.panTo(new L.LatLng(this.location.lat, this.location.lng));
                // this.marker.setLatLng(newLocation);
                // this.map.panTo(new L.LatLng(newLocation.lat, newLocation.lng));
            }
        }

        onSaveLocation(){
            this.locationService.setLocation(this.location);
            this.router.navigate(['/']);
        }

        onClearLocation(){
            this.locationService.clearLocation();
        }
    }
