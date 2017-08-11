import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from './components/location/location.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [LocationComponent],
    exports: [LocationComponent]
})
export class SharedModule { }
