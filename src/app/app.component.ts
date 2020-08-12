import { Component } from '@angular/core';
import { PartService } from './services/PartService';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [PartService]
})
export class AppComponent {

}
