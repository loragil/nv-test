import { Injectable } from '@angular/core';

//used to access location in local storage
export const LOCATION_STORAGE_KEY = 'location';

//this service provides all operations against the chosen storage/db
@Injectable()
export class LocationService {

    constructor() { }

    getLocation()/*:Promise<Location>*/{
        return JSON.parse(localStorage.getItem(LOCATION_STORAGE_KEY));
        //FIXME: return Promise.resolve(JSON.parse(localStorage.getItem('location')));
    }

    setLocation(location){
        localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(location));
    }

    clearLocation(){
        localStorage.removeItem(LOCATION_STORAGE_KEY);
    }
}
