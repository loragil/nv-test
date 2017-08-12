// angular imports:
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//vendor imports:
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
//import {} from '@ng-bootstrap/ng-bootstrap';

// app imports:
import { AppComponent } from './app.component';
import { HomeModule } from './modules/home/home.module';
import { SharedModule } from './modules/shared/shared.module';
//import {Coordinates} from './modules/shared/types';
//import { LocationComponent } from './modules/shared/components/location/location.component';
import { NavbarComponent } from './modules/shared/components/navbar/navbar.component';
import { HomeContainerComponent } from './modules/home/home-container/home-container.component';

const appRoutes: Routes = [
    //{ path: 'myLocation', component: LocationComponent },
    { path: '', component: HomeContainerComponent },
    { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true } // <-- debugging purposes only
        ),
        NgbModule.forRoot(),
        BrowserModule,
        HomeModule,
        SharedModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
