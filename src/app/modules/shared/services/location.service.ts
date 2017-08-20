import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';

import {AppLocation} from '../../../app.model';

//used to access location in local storage
export const LOCATION_STORAGE_KEY = 'location';

//this service provides all operations against the chosen storage/db
@Injectable()
export class LocationService {
    public location$: Observable<AppLocation>;
    private locationObserver: Observer<AppLocation>;
    private location: AppLocation;

    constructor() {
        this.location$ = new Observable(observer => {
            this.locationObserver = observer;
        }).share();

        this.location = JSON.parse(localStorage.getItem(LOCATION_STORAGE_KEY));
    }

    getLocation(){
        this.location = this.location || JSON.parse(localStorage.getItem(LOCATION_STORAGE_KEY));

        if(this.location){
            this.locationObserver.next(this.location);
        }
        //return this.locationObserver.next(this.location);
        return this.location;
    }

    setLocation(location){
        this.location = location;
        this.locationObserver.next(this.location);
        localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(this.location));
    }

    clearLocation(){
        this.location = null;
        this.locationObserver.next(this.location);
        localStorage.removeItem(LOCATION_STORAGE_KEY);
    }
}
