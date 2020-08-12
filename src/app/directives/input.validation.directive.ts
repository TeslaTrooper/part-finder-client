import { Directive, HostListener, Renderer2, ElementRef } from "@angular/core";

import { Validatable } from "src/app/model/Validatable";

@Directive({
    selector: '[input-validation]'
})
export class InputValidationDirective implements Validatable {

    constructor(private renderer: Renderer2, private elRef: ElementRef) { }

    @HostListener('blur') onBlur() {
        this.validate();
    }

    public validate(): boolean {
        const el: HTMLInputElement = this.elRef.nativeElement as HTMLInputElement;

        const isValid: boolean = el.value !== "";
        if (isValid)
            this.renderer.removeClass(this.elRef.nativeElement, 'is-invalid');
        else
            this.renderer.addClass(this.elRef.nativeElement, 'is-invalid');

        return isValid;
    }

}