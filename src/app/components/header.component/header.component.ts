import { Component, ViewChild, ElementRef } from '@angular/core';
import { PartService } from 'src/app/services/PartService';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    @ViewChild('searchInput') searchInput: ElementRef;

    constructor(private partService: PartService) { }

    public search(event: Event): void {
        const token: string = (this.searchInput.nativeElement as HTMLInputElement).value;

        this.partService.setToken(token);
    }

}