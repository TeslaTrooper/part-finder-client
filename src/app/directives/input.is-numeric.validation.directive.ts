import { Directive, HostListener, Renderer2, ElementRef } from "@angular/core";

@Directive({
    selector: '[input-is-numeric-validation]'
})
export class InputIsNumericValidationDirective {

    constructor(private renderer: Renderer2, private elRef: ElementRef) { }

    @HostListener('blur') onBlur() {
        const el: HTMLInputElement = this.elRef.nativeElement as HTMLInputElement;

        if (el.value !== "" && !isNaN(Number(el.value)))
            this.renderer.removeClass(this.elRef.nativeElement, 'is-invalid');
        else
            this.renderer.addClass(this.elRef.nativeElement, 'is-invalid');
    }

    public validate(): boolean {
        const el: HTMLInputElement = this.elRef.nativeElement as HTMLInputElement;

        const isValid: boolean = el.value !== "" && !isNaN(Number(el.value));
        if (isValid)
            this.renderer.removeClass(this.elRef.nativeElement, 'is-invalid');
        else
            this.renderer.addClass(this.elRef.nativeElement, 'is-invalid');

        return isValid;
    }

}