import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Part } from 'src/app/model/part';
import { PartService } from 'src/app/services/PartService';

@Component({
    selector: 'app-detail-part-modal',
    templateUrl: './modal.detail.part.component.html'
})
export class ActionPartModal {

    public part: Part;

    constructor(private partService: PartService) {
        partService.partSelect.subscribe((id: number) => this.part = this.partService.get(id));
    }

}