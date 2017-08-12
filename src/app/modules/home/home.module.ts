import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeContainerComponent } from './home-container/home-container.component';
import {LocationService} from '../shared/services/location.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    providers:[LocationService],
    declarations: [ HomeContainerComponent]
})
export class HomeModule { }
