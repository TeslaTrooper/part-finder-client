import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PartService } from 'src/app/services/PartService';
import { Part } from 'src/app/entities/part';

@Component({
    selector: 'app-edit-part-modal',
    templateUrl: './modal.edit.part.component.html',
    styleUrls: ['../modal.component.scss']
})
export class EditPartModal implements OnInit {

    public editPartForm: FormGroup;
    public part: Part;
    public customFormControls: AbstractControl[];

    constructor(private partService: PartService, public activeModal: NgbActiveModal) {
        this.editPartForm = new FormGroup({
            box: new FormControl('', Validators.required),
            qty: new FormControl('', [Validators.required, Validators.pattern('[1-9][0-9]*')])
        });

        this.customFormControls = [];
    }

    ngOnInit(): void {
        this.editPartForm.patchValue({
            box: this.part.box,
            qty: this.part.qty
        });

        this.part.attribs.forEach((value: string, key: string) => {
            const control: AbstractControl = new FormControl(value, Validators.required);

            this.editPartForm.registerControl(key, control);
            this.customFormControls.push(control);
        });
    }

    public onPartEdit(): void {
        let tfBox: string = this.editPartForm.value.box;
        let tfQty: string = this.editPartForm.value.qty;

        const newAttribValues: Map<string, string> = new Map();

        this.part.attribs.forEach((value: string, key: string) =>
            newAttribValues.set(key, this.editPartForm.value[key])
        )

        this.partService.edit(this.part.id, tfBox, Number(tfQty), newAttribValues);
        this.activeModal.close();
    }

}