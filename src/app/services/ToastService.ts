import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ToastService {
    toasts: Toast[] = [];

    push(header: string, body: string): void {
        this.toasts.push({ header, body });
    }

    pop(toast: Toast): void {
        this.toasts = this.toasts.filter(t => t != toast);
    }

}

interface Toast {
    readonly header: string;
    readonly body: string;
}