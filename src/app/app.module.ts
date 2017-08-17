// angular imports:
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//vendor imports:
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToasterModule} from 'angular2-toaster';

// app imports:
import { AppComponent } from './app.component';
import { HomeModule } from './modules/home/home.module';
import { LocationModule } from './modules/location/location.module';
import { SharedModule } from './modules/shared/shared.module';
import { AppRouteModule }     from './modules/app-route/app-route.module';

import { NavbarComponent } from './modules/shared/components/navbar/navbar.component';
import { HomeContainerComponent } from './modules/home/home-container/home-container.component';
import { LocationContainerComponent } from './modules/location/location-container/location-container.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        NgbModule.forRoot(),
        BrowserModule,
        BrowserAnimationsModule,
        ToasterModule,
        HomeModule,
        LocationModule,
        SharedModule,
        AppRouteModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
