import { Component, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Part } from 'src/app/model/part';
import { DetailPartModal } from 'src/app/modal.component/modal.detail.part.component/modal.detail.part.component';
import { DeletePartModal } from 'src/app/modal.component/modal.delete.part.component/modal.delete.part.component';
import { EditPartModal } from 'src/app/modal.component/modal.edit.part.component/modal.edit.part.component';

@Component({
    selector: '[app-part]',
    templateUrl: './part.component.html'
})
export class PartComponent {

    @Input() part: Part;

    constructor(private modalService: NgbModal) { }

    public openPartEditModal(): void {
        const ref: NgbModalRef = this.modalService.open(EditPartModal);
        ref.componentInstance.part = this.part;
    }

    public openPartDeleteModal(): void {
        const ref: NgbModalRef = this.modalService.open(DeletePartModal);
        ref.componentInstance.part = this.part;
    }

    public openPartDetailModal(): void {
        const ref: NgbModalRef = this.modalService.open(DetailPartModal);
        ref.componentInstance.part = this.part;
    }

}