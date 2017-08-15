import { Injectable } from '@angular/core';

export const LOCATION_STORAGE_KEY = 'location';

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
