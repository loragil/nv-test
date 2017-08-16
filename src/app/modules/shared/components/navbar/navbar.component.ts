import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, /*RouterModule, */ActivatedRoute, Event, NavigationEnd } from '@angular/router';
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
    private title;
    private showMenu:boolean = true;
    private subscription:Subscription;

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private location: Location,
        private titleService:Title) { }

        ngOnInit() {
            this.router.events
            .filter((event) => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map((route) => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter((route) => route.outlet === 'primary')
            .mergeMap((route) => route.data)
            .subscribe((event) => {
                let title = event['title'];

                this.titleService.setTitle(title);
                this.title = title;
                this.showMenu = event['showMenu'];
            });
        }

        ngOnDestroy() {
            this.subscription.unsubscribe();
        }

        private goBack(){
            this.location.back();
        }
    }
