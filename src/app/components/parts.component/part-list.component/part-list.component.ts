import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';

import { Part } from 'src/app/model/part';
import { PartService } from 'src/app/services/PartService';
import { InputValidationDirective } from 'src/app/directives/input.validation.directive';
import { InputIsNumericValidationDirective } from 'src/app/directives/input.is-numeric.validation.directive';

@Component({
    selector: 'app-part-list',
    templateUrl: './part-list.component.html'
})
export class PartListComponent {

    public parts: Part[];

    @ViewChild('partName') name: ElementRef;
    @ViewChild('box') box: ElementRef;
    @ViewChild('qty') qty: ElementRef;

    @ViewChildren(InputValidationDirective) inputValidationDirective: QueryList<InputValidationDirective>;
    @ViewChild(InputIsNumericValidationDirective) inputIsNumericValidationDirective: InputIsNumericValidationDirective;

    constructor(private partService: PartService) {
        this.partService.partListChanged.subscribe(() => this.parts = partService.getParts());
    }

    public createPart(): void {
        const tfPartName: HTMLInputElement = this.name.nativeElement as HTMLInputElement;
        const tfBox: HTMLInputElement = this.box.nativeElement as HTMLInputElement;
        const tfQty: HTMLInputElement = this.qty.nativeElement as HTMLInputElement;

        this.invokeDirectiveValidation();
        if (this.isInvalid(this.name) || this.isInvalid(this.box) || this.isInvalid(this.qty))
            return;

        this.partService.add(new Part(0, tfPartName.value, tfBox.value, Number(tfQty.value)));

        tfPartName.value = "";
        tfBox.value = "";
        tfQty.value = "";
    }

    private isInvalid(el: ElementRef): boolean {
        return (el.nativeElement as HTMLElement).classList.contains('is-invalid')
    }

    private invokeDirectiveValidation(): void {
        this.inputValidationDirective.forEach(e => e.validate());
        this.inputIsNumericValidationDirective.validate();
    }

}