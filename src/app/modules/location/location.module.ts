import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import {LocationService} from '../shared/services/location.service';
import {LocationContainerComponent} from './location-container/location-container.component';

//import { ToasterService} from 'angular2-toaster';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
    imports: [
        CommonModule,
        SharedModule
        //BrowserAnimationsModule
    ],
    providers:[LocationService],
    declarations: [LocationContainerComponent]
})
export class LocationModule { }
