import { Component, Input } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Part } from 'src/app/shared/part';
import { DetailPartModal } from 'src/app/modal.component/modal.detail.part.component/modal.detail.part.component';
import { DeletePartModal } from 'src/app/modal.component/modal.delete.part.component/modal.delete.part.component';
import { EditPartModal } from 'src/app/modal.component/modal.edit.part.component/modal.edit.part.component';
import { ModalService, SMALL_CENTERED_CONFIG } from "src/app/services/ModalService";

@Component({
    selector: '[app-part]',
    templateUrl: './part.component.html'
})
export class PartComponent {

    @Input() part: Part;

    constructor(private modalService: ModalService) { }

    public openPartEditModal(): void {
        const ref: NgbModalRef = this.modalService.open(EditPartModal, SMALL_CENTERED_CONFIG);
        ref.componentInstance.part = this.part;
    }

    public openPartDeleteModal(): void {
        const ref: NgbModalRef = this.modalService.open(DeletePartModal, SMALL_CENTERED_CONFIG);
        ref.componentInstance.part = this.part;
    }

    public openPartDetailModal(): void {
        const ref: NgbModalRef = this.modalService.open(DetailPartModal, SMALL_CENTERED_CONFIG);
        ref.componentInstance.part = this.part;
    }

}