import { NgbModal, NgbModalOptions, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class ModalService {

    constructor(private ngbModalService: NgbModal) { }

    public open(content: any, config?: NgbModalOptions): NgbModalRef {
        return this.ngbModalService.open(content, config);
    }

}

export const SMALL_CENTERED_CONFIG: NgbModalOptions = { size: 'small', centered: true };
export const SCROLLABLE_CONFIG: NgbModalOptions = { scrollable: true };