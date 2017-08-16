import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeContainerComponent } from '../home/home-container/home-container.component';
import { LocationContainerComponent } from '../location/location-container/location-container.component';

const routes: Routes = [
    { path: 'location', component: LocationContainerComponent },
    { path: '', component: HomeContainerComponent, data:{ title:'Home'} },
    //{ path: 'home', component: HomeContainerComponent, data:{ title:'Home'} },
    { path: '**', redirectTo: '/', pathMatch: 'full' }
    //{ path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { enableTracing: true }) // <-- debugging purposes only)
    ],
    exports: [ RouterModule ]
})
export class AppRouteModule { }
