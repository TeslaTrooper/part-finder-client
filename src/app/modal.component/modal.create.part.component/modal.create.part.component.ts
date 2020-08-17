import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PartService } from 'src/app/services/PartService';
import { Part } from 'src/app/model/part';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-create-part-modal',
    templateUrl: './modal.create.part.component.html',
    styleUrls: ['../modal.component.scss']
})
export class CreatePartModal implements OnInit {

    @Input() public part: Part;

    public createPartForm: FormGroup;

    constructor(private partService: PartService, public activeModal: NgbActiveModal) {
        this.createPartForm = new FormGroup({
            name: new FormControl('', Validators.required),
            box: new FormControl('', Validators.required),
            qty: new FormControl('', [Validators.required, Validators.pattern('[1-9][0-9]*')])
        })
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

        this.partService.add(new Part(0, name, box, qty));
        this.activeModal.close();
    }

}