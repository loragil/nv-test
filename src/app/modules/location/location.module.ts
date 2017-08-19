import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import {LocationService} from '../shared/services/location.service';
import {LocationContainerComponent} from './location-container/location-container.component';

//module for the location page
@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    providers:[LocationService],
    declarations: [LocationContainerComponent]
})
export class LocationModule { }
