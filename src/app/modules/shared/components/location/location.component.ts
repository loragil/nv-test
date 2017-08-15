import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

//import {AppLocation} from '../../../../app.model';

export const VALID_LAT_LON = "^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}";

@Component({
    selector: 'location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
    //@Input() model:Coordinates;


    private lat:number;
    private lng:number;

    @Input() set model({lat, lng}){
        this.lat = lat;
        this.lng = lng;
    }
    @Output() onLocationChange = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    handleLocationChange(e, field){
        this[field] = e.target.value;
        this.onLocationChange.emit({lat:this.lat, lng:this.lng});
    }
}
