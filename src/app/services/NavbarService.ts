import { EventEmitter, Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class NavbarService {

    public sidebarVisibilityChange: EventEmitter<boolean>;

    constructor() {
        this.sidebarVisibilityChange = new EventEmitter();
    }


    
}