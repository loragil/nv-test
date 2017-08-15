import { Component, OnInit, Input } from '@angular/core';

export const VALID_LAT_LON = "^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}";

@Component({
    selector: 'location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
    @Input() model:Coordinates;

    private latitude:number;
    // @Input() set model(location:Coordinates){
    //     debugger;
    // }

    constructor() { }

    ngOnInit() {
    }

}
