import { ElementRef } from '@angular/core';

export interface Validatable {
    validate(): boolean;
}