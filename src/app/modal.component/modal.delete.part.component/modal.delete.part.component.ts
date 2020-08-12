import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PartService } from 'src/app/services/PartService';
import { Part } from 'src/app/model/part';

@Component({
    selector: 'app-delete-part-modal',
    templateUrl: './modal.delete.part.component.html'
})
export class DeletePartModal {

    public part: Part;

    constructor(private partService: PartService) {
        this.partService.partDelete.subscribe((id: number) => this.part = partService.get(id));
    }

    public partDelete(): void {
        this.partService.delete(this.part.id);
    }

    public getPartName(): string {
        return this.part != undefined ? this.part.name : "";
    }

}