import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {AppLocation} from '../../../../app.model';

//a regex to validate lat/lng input
export const VALID_LAT_LON = "^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}";

@Component({
    selector: 'location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
    //FIXME: move lat & lng to be memebers of locationService, and consume hat everywhere
    private lat:number;
    private lng:number;

    @Input() set latitude(lat){this.lat = lat;}
    @Input() set longitude(lng){this.lng = lng;}

    @Output() onLocationChange = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    handleLocationChange(e, field){
        //update lat/lng
        this[field] = e.target.value;

        //notify location change
        this.onLocationChange.emit({lat:this.lat, lng:this.lng});
    }
}
