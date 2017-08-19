import { Component, OnInit } from '@angular/core';
import {LocationService} from '../../shared/services/location.service';
import {AppLocation} from '../../../app.model';
import {ClearLocationModalComponent} from '../../shared/components/modal/clear-location-modal/clear-location-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToasterService, Toast } from 'angular2-toaster';

@Component({
    selector: 'home-container',
    templateUrl: './home-container.component.html',
    styleUrls: ['./home-container.component.css']
})
export class HomeContainerComponent implements OnInit {
    private location:AppLocation;//location tracker
    //private location:Promise<Location>;

    constructor(private locationService:LocationService,
        private modalService: NgbModal,
        private toasterService: ToasterService) { }

        ngOnInit() {
            this.initModels();
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
                    this.location = null;
                }
            }, (reason) => {
                //modal dismissed
            });
        }

        onLocationChange(newLocation){
            //update location
            this.location = newLocation;
        }

        private initModels(){
            this.getLocationModel();
        }

        private getLocationModel(){
            // return this.locationService.getLocation()
            // .then(location => this.location = location)
            // .catch(error => console.log(error));
            return this.location = this.locationService.getLocation();
        }
    }
