import { Component, OnInit, OnDestroy } from '@angular/core';
import {LocationService} from '../../shared/services/location.service';
import {AppLocation} from '../../../app.model';
import {ClearLocationModalComponent} from '../../shared/components/modal/clear-location-modal/clear-location-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToasterService, Toast } from 'angular2-toaster';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'home-container',
    templateUrl: './home-container.component.html',
    styleUrls: ['./home-container.component.css']
})
export class HomeContainerComponent implements OnInit, OnDestroy {
    private location$:AppLocation;//location tracker
    private locationSubscription$:Subscription;

    constructor(private locationService:LocationService,
        private modalService: NgbModal,
        private toasterService: ToasterService) { }

        ngOnInit() {
            this.initModels();
        }

        ngOnDestroy() {
            //removing subscription to prevent memory leaks
            this.locationSubscription$.unsubscribe();
        }

        //handle modal dialog
        openClearLocationModal() {
            const modalRef = this.modalService.open(ClearLocationModalComponent);

            //setting dialog's data
            modalRef.componentInstance.title = 'Clear saved location';
            modalRef.componentInstance.msg = 'Are you sure you want to clear your location?';

            //bind modal's close/dismiss eents
            modalRef.result.then((clearLocation:boolean) => {
                //modal closed (modal action executed)
                if(clearLocation){//clear location
                    //notify user
                    this.toasterService.pop({
                        type: 'success',
                        body: 'Location cleared'
                    });

                    //update location
                    this.locationService.clearLocation();
                }
            }, (reason) => {
                //modal dismissed
            });
        }

        private initModels(){
            //subscribing to location changes
            this.locationSubscription$ = this.locationService.location$.subscribe(latestLocation => {
                //update location
                this.location$ = latestLocation;
            });
            this.locationService.getLocation();
        }

    }
