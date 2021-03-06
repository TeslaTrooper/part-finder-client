import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Part } from 'src/app/entities/domain/Part';
import { CreatePartModal } from 'src/app/components/modal.component/modal.create.part.component/modal.create.part.component';
import { ModalService, SCROLLABLE_CONFIG } from 'src/app/services/ModalService';
import { PartService } from 'src/app/services/PartService';
import { NavbarService } from 'src/app/services/NavbarService';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

    @ViewChild('menu') menu: ElementRef;
    @ViewChild('searchInput') searchInput: ElementRef;
    @ViewChild('showSearch') showSearch: ElementRef;
    @ViewChild('clearSearch') clearSearch: ElementRef;
    @ViewChild('listItem') listItem: ElementRef;
    @ViewChild('plus') plus: ElementRef;
    @ViewChild('logo') logo: ElementRef;

    searchOnSmallDeviceDisplayed: boolean = false;
    isSidebarVisible: boolean = false;

    constructor(private partService: PartService,
        private navbarService: NavbarService,
        private renderer: Renderer2,
        private modalService: ModalService) { }

    public search(event: Event): void {
        const token: string = (this.searchInput.nativeElement as HTMLInputElement).value;

        this.partService.setToken(token);
    }

    public showSearchInput(): void {
        this.renderer.setStyle(this.searchInput.nativeElement, 'display', 'flex');
        this.renderer.setStyle(this.listItem.nativeElement, 'width', '100%');

        this.renderer.setStyle(this.clearSearch.nativeElement, 'display', 'flex');
        this.renderer.setStyle(this.showSearch.nativeElement, 'display', 'none');

        this.renderer.setStyle(this.plus.nativeElement, 'display', 'none');
        this.renderer.setStyle(this.logo.nativeElement, 'display', 'none');

        this.searchOnSmallDeviceDisplayed = true;
    }

    public clearSearchInput(): void {
        (this.searchInput.nativeElement as HTMLInputElement).value = '';

        if (!this.searchOnSmallDeviceDisplayed)
            return;

        this.searchOnSmallDeviceDisplayed = false;

        this.renderer.removeStyle(this.searchInput.nativeElement, 'display');
        this.renderer.removeStyle(this.clearSearch.nativeElement, 'display');
        this.renderer.removeStyle(this.showSearch.nativeElement, 'display');
        this.renderer.removeStyle(this.listItem.nativeElement, 'width');

        this.renderer.removeStyle(this.plus.nativeElement, 'display');
        this.renderer.removeStyle(this.logo.nativeElement, 'display');

        this.search(undefined);
    }

    public onPartCreate(): void {
        const ref: NgbModalRef = this.modalService.open(CreatePartModal, SCROLLABLE_CONFIG);
        ref.componentInstance.part = new Part(undefined, '', '', 0);
    }

    public onSidebarVisibilityChange(): void {
        this.isSidebarVisible = !this.isSidebarVisible;

        if (this.isSidebarVisible)
            this.renderer.setStyle(this.menu.nativeElement, 'color', 'white');
        else
            this.renderer.removeStyle(this.menu.nativeElement, 'color');
            
        this.navbarService.sidebarVisibilityChange.emit(this.isSidebarVisible);
    }

}