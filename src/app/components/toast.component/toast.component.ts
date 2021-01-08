import { Component } from "@angular/core";
import { ToastService } from "../../services/ToastService";

@Component({
    selector: 'app-toast-component',
    templateUrl: './toast.component.html',
    styles: ['./toast.component.scss']
})
export class ToastComponent {

    constructor(public toastService: ToastService) { }

}