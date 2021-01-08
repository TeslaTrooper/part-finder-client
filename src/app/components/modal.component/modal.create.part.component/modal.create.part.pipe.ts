import { PipeTransform, Pipe } from "@angular/core";
import { AbstractControl, Validators } from "@angular/forms";

@Pipe({ name: 'skipEmptyElements', pure: false} )
export class SkipEmptyElementPipe implements PipeTransform {

    public transform(items: Item[], ...args: any[]): Item[] {
        if (items.length < 2)
            return items;

        const result: Item[] = [];

        for (let i = 0; i < items.length - 1; i++)
            if (this.hasValue(items[i].value.get("0")) || this.hasValue(items[i].value.get("1")))
                result.push(items[i]);

        result.push(items[items.length - 1]);

        return result;
    }

    private hasValue(control: AbstractControl): boolean {
        return Validators.required(control) == null;
    }

}

export interface Item {
    key: number;
    value: AbstractControl
}