import { Component, OnInit } from '@angular/core';
import {LocationService} from '../../shared/services/location.service';
import {Coordinates} from '../../../app.model';

@Component({
    selector: 'home-container',
    templateUrl: './home-container.component.html',
    styleUrls: ['./home-container.component.css']
})
export class HomeContainerComponent implements OnInit {
    private location:Promise<Coordinates>;

    constructor(private locationService:LocationService) { }

    ngOnInit() {
        this.initModels();
    }

    private initModels(){
        this.getLocationModel();
    }

    private getLocationModel(){
        return this.locationService.getLocation()
        .then(location => this.location = location)
        .catch(error => console.log(error));        
    }
}
