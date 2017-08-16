import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from './components/location/location.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule ,
        RouterModule
    ],
    declarations: [LocationComponent, NavbarComponent],
    exports: [LocationComponent, NavbarComponent]
})
export class SharedModule { }
