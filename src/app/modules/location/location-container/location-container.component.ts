import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Map } from 'leaflet';
import {LocationService} from '../../shared/services/location.service';
import {AppLocation} from '../../../app.model';

export const MARKER_ICON = L.icon({
    iconUrl: '/assets/marker-icon.png',
    iconSize:     [25, 41],
    iconAnchor:   [12.5, 41]
});

@Component({
    selector: 'app-location-container',
    templateUrl: './location-container.component.html',
    styleUrls: ['./location-container.component.css']
})
export class LocationContainerComponent implements OnInit {
    private map:L.Map;
    private marker:L.Marker;
    private location:AppLocation;

    constructor(private locationService:LocationService) { }

    ngOnInit() {
        this.location = this.locationService.getLocation();

        if(this.location){
            this.initMap(this.location);
        } else {
            //FIXME: ? handle violation 'Only request geolocation information in response to a user gesture.'
            if (navigator.geolocation){
                navigator.geolocation.getCurrentPosition((position) => {
                    this.location = {lat:position.coords.latitude, lng:position.coords.longitude};
                    this.initMap(this.location);
                });
            } else{
                //FIXME: toaster notificaion
                //this.map.panTo(new L.LatLng(-1, -1));
            }
        }
    }

    private initMap({lat, lng}){
        let {tileRow, tileColumn} = this.getTileXYByCoordinates(lat, lng);

        this.locationService.setLocation({lat, lng});
        console.log(lat,lng);

        this.map = L.map('mapid').setView([lat, lng], 13);
        this.marker = L.marker([lat, lng], {icon: MARKER_ICON, draggable:true}).addTo(this.map);

        //FIXME: how can I use tileRow/tileColumn in HERE's API request URL?

        //let url =  `https://1.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/13/${tileColumn}/${tileRow}/256/png8?app_id=uuRdKZwb0MXCxDUmf4vb&app_code=duyMZ5irUq3nZ3lf8erQ1g`;
        //let url =  'https://1.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/13/'+tileColumn+'/'+tileRow+'/256/png8?app_id=uuRdKZwb0MXCxDUmf4vb&app_code=duyMZ5irUq3nZ3lf8erQ1g';
        let url =  'https://1.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/13/4400/2686/256/png8?app_id=uuRdKZwb0MXCxDUmf4vb&app_code=duyMZ5irUq3nZ3lf8erQ1g';

        //L.tileLayer('https://1.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/13/4400/2686/256/png8?app_id=uuRdKZwb0MXCxDUmf4vb&app_code=duyMZ5irUq3nZ3lf8erQ1g', {
        //L.tileLayer('http://{s}.base.maps.cit.api.here.com/maptile/2.1/{type}/{mapID}/{scheme}/{z}/{x}/{y}/{size}/{format}?app_id={uuRdKZwb0MXCxDUmf4vb}&app_code={duyMZ5irUq3nZ3lf8erQ1g}&lg={language}', {

        L.tileLayer(url, {
            attribution: 'Never lose sight of where you\'re going!',
            subdomains: '1234',
            base: 'base',
            type: 'maptile',
            scheme: 'normal.day',
            app_id: 'uuRdKZwb0MXCxDUmf4vb',
            app_code: 'duyMZ5irUq3nZ3lf8erQ1g',
            mapID: 'newest',
            maxZoom: 20,
            language: 'eng',
            format: 'png8',
            size: '256'
        }).addTo(this.map);

        // L.tileLayer.provider('HERE.terrainDay', {
        //     app_id: 'uuRdKZwb0MXCxDUmf4vb',
        //     app_code: 'duyMZ5irUq3nZ3lf8erQ1g'
        // }).addTo(this.map);

        //bind map & marker events
        this.map.on('click', (e) => this.onMapClick(e));
        this.marker.on('dragend', (e) => this.onMarkerDragged(e));

        //this.map = L.map('mapid').locate({setView: true, maxZoom: 16});

        // tileColumn = 4400;
        // tileRow = 2686;
        // let urla =  `https://1.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/13/${tileColumn}/${tileRow}/256/png8?app_id=uuRdKZwb0MXCxDUmf4vb&app_code=duyMZ5irUq3nZ3lf8erQ1g`;
        // let urlc =  `https://1.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/13/${tileRow}/${tileColumn}/256/png8?app_id=uuRdKZwb0MXCxDUmf4vb&app_code=duyMZ5irUq3nZ3lf8erQ1g`;
        // let urlb =  'https://1.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/13/4400/2686/256/png8?app_id=uuRdKZwb0MXCxDUmf4vb&app_code=duyMZ5irUq3nZ3lf8erQ1g';
        //let tileLayer  = L.tileLayer(urlb).addTo(this.map);


        //tileLayer.addTo(this.map);
    }

    //TODO: extract to utils?
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
        this.locationService.setLocation(this.marker.getLatLng());
        //NOTE: not panning map to center around new location, because it's seems eye-disturbing
    }

    private onMarkerDragged(e){
        let {lat, lng} = this.marker.getLatLng();

        this.map.panTo(new L.LatLng(lat, lng));
        //this.locationService.setLocation({lat, lng});
    }

    onLocationChange(newLocation){
        this.marker.setLatLng(newLocation);
        this.map.panTo(new L.LatLng(newLocation.lat, newLocation.lng));
    }
}
