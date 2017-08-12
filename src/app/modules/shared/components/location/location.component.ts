import { Component, OnInit, Input } from '@angular/core';

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
