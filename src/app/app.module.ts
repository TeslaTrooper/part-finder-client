import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header.component/header.component';
import { EditPartModal } from './modal.component/modal.edit.part.component/modal.edit.part.component';
import { DeletePartModal } from './modal.component/modal.delete.part.component/modal.delete.part.component';
import { ActionPartModal } from './modal.component/modal.detail.part.component/modal.detail.part.component';
import { PartsComponent } from './components/parts.component/parts.component';
import { PartListComponent } from './components/parts.component/part-list.component/part-list.component';
import { PartComponent } from './components/parts.component/part-list.component/part.component/part.component';
import { PartService } from './services/PartService';
import { InputValidationDirective } from './directives/input.validation.directive';
import { InputIsNumericValidationDirective } from './directives/input.is-numeric.validation.directive';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        EditPartModal,
        DeletePartModal,
        ActionPartModal,
        PartsComponent,
        PartListComponent,
        PartComponent,
        InputValidationDirective,
        InputIsNumericValidationDirective
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [PartService],
    bootstrap: [AppComponent]
})
export class AppModule { }
