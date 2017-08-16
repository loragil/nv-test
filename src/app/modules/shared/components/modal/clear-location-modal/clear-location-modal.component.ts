import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'clear-location-modal',
    templateUrl: './clear-location-modal.component.html',
    styleUrls: ['./clear-location-modal.component.css']
})
export class ClearLocationModalComponent implements OnInit {
    @Input() title:string;
    @Input() msg:string;

    constructor(public activeModal: NgbActiveModal) { }

    ngOnInit() {}

}
