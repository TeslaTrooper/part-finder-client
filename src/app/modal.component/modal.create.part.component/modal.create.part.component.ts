import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, Form, AbstractControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PartService } from 'src/app/services/PartService';
import { Part } from 'src/app/shared/part';
import { CustomValidators } from 'src/app/shared/CustomValidators';

@Component({
    selector: 'app-create-part-modal',
    templateUrl: './modal.create.part.component.html',
    styleUrls: ['../modal.component.scss']
})
export class CreatePartModal implements OnInit {

    @Input() public part: Part;

    public createPartForm: FormGroup;
    public formArrays: AbstractControl[];

    constructor(private partService: PartService, public activeModal: NgbActiveModal) {
        this.formArrays = [];
        this.formArrays.push(this.createFormArray());

        this.createPartForm = new FormGroup({
            name: new FormControl('', Validators.required),
            box: new FormControl('', Validators.required),
            qty: new FormControl('', [Validators.required, Validators.pattern('[1-9][0-9]*')]),
            customAttribs_0: this.formArrays[0]
        });
    }

    ngOnInit(): void {
        this.createPartForm.patchValue({
            name: this.part.name,
            box: this.part.box,
            qty: this.part.qty
        })
    }

    public onPartCreate(): void {
        const name: string = this.createPartForm.value.name;
        const box: string = this.createPartForm.value.box;
        const qty: number = this.createPartForm.value.qty;

        const attribs: Map<string, string> = new Map();
        for (const formArrayIndex in this.formArrays) {
            const attrib: AbstractControl = this.createPartForm.get('customAttribs_' + formArrayIndex + ".0");
            const attribValue: AbstractControl = this.createPartForm.get('customAttribs_' + formArrayIndex + ".1");

            if (attrib.value !== "" && attribValue.value !== "")
                attribs.set(attrib.value, attribValue.value);
        }

        const part: Part = new Part(0, name, box, qty);
        part.setAttribs(attribs);

        this.partService.add(part);
        this.activeModal.close();
    }

    public onCheckCustomAttribute(event: KeyboardEvent, formArrayIndex: number): void {
        const lastIndex: number = this.formArrays.length - 1;

        if (formArrayIndex != lastIndex)
            return;

        const firstInputElementOfLastFormArray: AbstractControl = this.createPartForm.get('customAttribs_' + lastIndex + ".0");

        if (this.createPartForm.valid && Validators.required(firstInputElementOfLastFormArray) == null) {
            const formArray: AbstractControl = this.createFormArray();

            this.createPartForm.registerControl('customAttribs_' + (lastIndex + 1), formArray);
            this.formArrays.push(formArray);
        }
    }

    private createFormArray(): AbstractControl {
        return new FormArray([
            new FormControl(''),
            new FormControl('')
        ], CustomValidators.groupValidator)
    }

}