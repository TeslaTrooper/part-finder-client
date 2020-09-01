import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PartService } from 'src/app/services/PartService';
import { Part } from 'src/app/shared/part';
import { genRandomKey } from 'src/app/shared/Util';
import { CustomValidators } from 'src/app/shared/CustomValidators';
import { Item } from './modal.create.part.pipe';

@Component({
    selector: 'app-create-part-modal',
    templateUrl: './modal.create.part.component.html',
    styleUrls: ['../modal.component.scss']
})
export class CreatePartModal implements OnInit {

    @Input() public part: Part;

    public createPartFormGroup: FormGroup;
    public formArrayItems: Item[];
    private lastInsertedFormArray: AbstractControl;

    constructor(private partService: PartService, public activeModal: NgbActiveModal) {
        this.formArrayItems = [];

        const item: Item = this.createFormArrayItem();
        this.formArrayItems.push(item);

        this.createPartFormGroup = new FormGroup({
            name: new FormControl('', Validators.required),
            box: new FormControl('', Validators.required),
            qty: new FormControl('', [Validators.required, Validators.pattern('[1-9][0-9]*')]),
            ['customAttribs_' + item.key]: item.value
        });
    }

    ngOnInit(): void {
        this.createPartFormGroup.patchValue({
            name: this.part.name,
            box: this.part.box,
            qty: this.part.qty
        })
    }

    public onPartCreate(): void {
        const name: string = this.createPartFormGroup.value.name;
        const box: string = this.createPartFormGroup.value.box;
        const qty: number = this.createPartFormGroup.value.qty;

        const attribs: Map<string, string> = new Map();
        for (let formArray of this.formArrayItems) {
            const attrib: AbstractControl = formArray.value.get("0");
            const attribValue: AbstractControl = formArray.value.get("1");

            if (attrib.value !== "" && attribValue.value !== "")
                attribs.set(attrib.value, attribValue.value);
        }

        const part: Part = new Part(0, name, box, qty);
        part.setAttribs(attribs);

        this.partService.add(part);
        this.activeModal.close();
    }

    public onCheckCustomAttribute(event: KeyboardEvent, formArrayIndex: number): void {
        const firstInputElementOfLastFormArray: AbstractControl = this.lastInsertedFormArray.get("0");

        if (this.createPartFormGroup.valid && Validators.required(firstInputElementOfLastFormArray) == null) {
            const item: Item = this.createFormArrayItem();

            this.createPartFormGroup.registerControl('customAttribs_' + item.key, item.value);
            this.formArrayItems.push(item);
        }
    }

    public asMap(): Map<number, AbstractControl> {
        const result: Map<number, AbstractControl> = new Map();
        this.formArrayItems.forEach(e => result.set(e.key, e.value));

        return result;
    }

    private createFormArrayItem(): Item {
        const key: number = genRandomKey(0, 100, this.asMap());
        this.lastInsertedFormArray = new FormArray([
            new FormControl(''),
            new FormControl('')
        ], CustomValidators.groupValidator);

        return { key: key, value: this.lastInsertedFormArray };
    }

}