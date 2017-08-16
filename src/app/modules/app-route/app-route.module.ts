import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeContainerComponent } from '../home/home-container/home-container.component';
import { LocationContainerComponent } from '../location/location-container/location-container.component';

const routes: Routes = [
    { path: 'location', component: LocationContainerComponent, data:{ title:'Location', showMenu: false} },
    { path: '', component: HomeContainerComponent, data:{ title:'Here You Are!', showMenu: true} },
    { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { enableTracing: true }) // <-- debugging purposes only)
    ],
    exports: [ RouterModule ]
})
export class AppRouteModule { }
