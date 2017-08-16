import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from './components/location/location.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClearLocationModalComponent } from './components/modal/clear-location-modal/clear-location-modal.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule ,
        RouterModule
    ],
    declarations: [LocationComponent, NavbarComponent, ClearLocationModalComponent],
    exports: [LocationComponent, NavbarComponent, ClearLocationModalComponent]
})
export class SharedModule { }
