import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Part } from 'src/app/model/part';
import { PartService } from 'src/app/services/PartService';

@Component({
    selector: '[app-part]',
    templateUrl: './part.component.html'
})
export class PartComponent {

    @Input() part: Part;

    constructor(private partService: PartService) { }

    public openPartEditModal(): void {
        this.partService.partEdit.emit(this.part.id);
    }

    public openPartDeleteModal(): void {
        this.partService.partDelete.emit(this.part.id);
    }

    public openPartDetailModal(): void {
        this.partService.partSelect.emit(this.part.id);
    }

}