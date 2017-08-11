// angular imports:
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//vendor imports:
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// app imports:
import { AppComponent } from './app.component';
import { HomeModule } from './modules/home/home.module';
import { SharedModule } from './modules/shared/shared.module';
import { LocationComponent } from './modules/shared/components/location/location.component';

const appRoutes: Routes = [
    { path: 'loc', component: LocationComponent },
    { path: '', redirectTo: '/', pathMatch: 'full' }
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
