import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';

import { Part } from 'src/app/entities/domain/Part';
import { PartService } from 'src/app/services/PartService';
import { CreatePartModal } from 'src/app/components/modal.component/modal.create.part.component/modal.create.part.component';
import { ModalService, SCROLLABLE_CONFIG } from 'src/app/services/ModalService';

@Component({
    selector: 'app-part-list',
    templateUrl: './part-list.component.html',
    styleUrls: ['./part-list.component.scss']
})
export class PartListComponent {

    public parts: Part[];
    public newPartForm: FormGroup;

    constructor(private partService: PartService, private modalService: ModalService) {
        this.partService.partListChanged.subscribe(() => this.parts = partService.getParts());

        this.newPartForm = new FormGroup({
            name: new FormControl('', Validators.required),
            box: new FormControl('', Validators.required),
            qty: new FormControl('', [Validators.required, Validators.pattern('[1-9][0-9]*')])
        });
    }

    public onCreatePart(): void {
        const name: string = this.newPartForm.value.name;
        const box: string = this.newPartForm.value.box;
        const qty: number = this.newPartForm.value.qty;

        const ref: NgbModalRef = this.modalService.open(CreatePartModal, SCROLLABLE_CONFIG);
        ref.componentInstance.part = new Part(undefined, name, box, qty);

        this.newPartForm.reset();
    }

}