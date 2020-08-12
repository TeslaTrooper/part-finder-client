import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Part } from 'src/app/model/part';
import { PartService } from 'src/app/services/PartService';

@Component({
    selector: 'app-edit-part-modal',
    templateUrl: './modal.edit.part.component.html',
    styleUrls: ['./modal.edit.part.component.scss']
})
export class EditPartModal {

    public part: Part;

    @ViewChild('box') box: ElementRef;
    @ViewChild('qty') qty: ElementRef;

    constructor(private partService: PartService) {
        this.partService.partEdit.subscribe((id: number) => this.part = partService.get(id));
    }

    public partEdit(): void {
        let tfBox: string = (this.box.nativeElement as HTMLInputElement).value;
        let tfQty: string = (this.qty.nativeElement as HTMLInputElement).value;

        this.partService.edit(this.part.id, tfBox, Number(tfQty));
    }

}