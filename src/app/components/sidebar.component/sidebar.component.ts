import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NavbarService } from "src/app/services/NavbarService";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

    @ViewChild('sidebar') sidebar: ElementRef;

    constructor(navbarService: NavbarService, renderer: Renderer2) {
        navbarService.sidebarVisibilityChange.subscribe((visible: boolean) =>
            renderer.setStyle(this.sidebar.nativeElement, "display", visible ? "flex" : "none")
        );
    }

}