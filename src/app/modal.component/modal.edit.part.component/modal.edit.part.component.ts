import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PartService } from 'src/app/services/PartService';
import { Part } from 'src/app/shared/part';

@Component({
    selector: 'app-edit-part-modal',
    templateUrl: './modal.edit.part.component.html',
    styleUrls: ['../modal.component.scss']
})
export class EditPartModal implements OnInit {

    public editPartForm: FormGroup;
    public part: Part;

    constructor(private partService: PartService, public activeModal: NgbActiveModal) {
        this.editPartForm = new FormGroup({
            box: new FormControl('', Validators.required),
            qty: new FormControl('', [Validators.required, Validators.pattern('[1-9][0-9]*')])
        })
    }

    ngOnInit(): void {
        this.editPartForm.patchValue({
            box: this.part.box,
            qty:this.part.qty
        })
    }

    public onPartEdit(): void {
        let tfBox: string = this.editPartForm.value.box;
        let tfQty: string = this.editPartForm.value.qty;

        this.partService.edit(this.part.id, tfBox, Number(tfQty));
        this.activeModal.close();
    }

}