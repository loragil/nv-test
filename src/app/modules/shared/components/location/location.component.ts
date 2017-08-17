import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {AppLocation} from '../../../../app.model';

export const VALID_LAT_LON = "^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}";

@Component({
    selector: 'location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
    //@Input() model:AppLocation;

    //FIXME: move lat & lng to be memebers of locationService, and consume hat everywhere
    private lat:number;
    private lng:number;

    // @Input() set model({lat, lng}){
    //     this.updateLatLon({lat, lng});
    // }
    @Input() set latitude(lat){
        this.lat = lat;
    }
    @Input() set longitude(lng){
        this.lng = lng;
    }

    @Output() onLocationChange = new EventEmitter();
    @Output() onLoadLocation = new EventEmitter();
    @Output() onSaveLocation = new EventEmitter();
    @Output() onClearLocation = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    // private updateLatLon({lat, lng}){
    //     this.lat = lat;
    //     this.lng = lng;
    // }

    //FIXME: handle logic dynamically (action & related callback are given as input to the component)
    handleLocationChange(e, field){
        this[field] = e.target.value;
        this.onLocationChange.emit({lat:this.lat, lng:this.lng});
    }

    handleLoadLocation(){
        //this[field] = e.target.value;
        this.onLoadLocation.emit({lat:this.lat, lng:this.lng});
    }

    handleSaveLocation(){
        //this[field] = e.target.value;
        this.onSaveLocation.emit({lat:this.lat, lng:this.lng});
    }

    handleClearLocation(){
        //this[field] = e.target.value;
        this.onClearLocation.emit();
    }
}
