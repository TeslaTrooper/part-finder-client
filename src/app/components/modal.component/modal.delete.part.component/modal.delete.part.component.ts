import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PartService } from 'src/app/services/PartService';
import { Part } from 'src/app/entities/domain/Part';

@Component({
    selector: 'app-delete-part-modal',
    templateUrl: './modal.delete.part.component.html'
})
export class DeletePartModal {

    @Input() public part: Part;

    constructor(private partService: PartService, public modalService: NgbActiveModal) { }

    public onPartDelete(): void {
        this.partService.delete(this.part.id);
        this.modalService.close();
    }

}