import { Component, Input} from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";


import { Part } from 'src/app/shared/part';

@Component({
    selector: 'app-detail-part-modal',
    templateUrl: './modal.detail.part.component.html'
})
export class DetailPartModal {

    @Input() public part: Part;

    constructor(public modal: NgbActiveModal) { }

}