import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Event, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private title;//appears on brnad section
    private showMenu:boolean = true;//holds menu's display state for current page
    //private subscription:Subscription;

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private location: Location,
        private titleService:Title) { }

        ngOnInit() {
            //subscribing to router's 'NavigationEnd' event, in order to update route-related data
            this.router.events
            .filter((event) => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map((route) => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter((route) => route.outlet === 'primary')
            .mergeMap((route) => route.data)
            .subscribe((routeData) => {
                let title = routeData['title'] || '';

                //update title + page's title
                this.titleService.setTitle(title);
                this.title = title;

                //update current page's menu-display state
                this.showMenu = routeData['showMenu'];
            });
        }        

        private goBack(){
            this.location.back();
        }
    }
