import { Injectable } from '@angular/core';

@Injectable()
export class LocationService {

    constructor() { }

    getLocation()/*:Promise<Location>*/{
        return JSON.parse(localStorage.getItem('location'));
        //FIXME: return Promise.resolve(JSON.parse(localStorage.getItem('location')));
    }

    setLocation(location){
        //if(typeof location == 'Coordinates'){
            localStorage.setItem('location', JSON.stringify(location));
        /*} else{
            console.error('invalid coordinates', locaion);
        }*/
    }
}
