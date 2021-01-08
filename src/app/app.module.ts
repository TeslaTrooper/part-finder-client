import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EditPartModal } from './modal.component/modal.edit.part.component/modal.edit.part.component';
import { DeletePartModal } from './modal.component/modal.delete.part.component/modal.delete.part.component';
import { DetailPartModal } from './modal.component/modal.detail.part.component/modal.detail.part.component';
import { PartsComponent } from './components/parts.component/parts.component';
import { PartListComponent } from './components/parts.component/part-list.component/part-list.component';
import { PartComponent } from './components/parts.component/part-list.component/part.component/part.component';
import { NavbarComponent } from './components/navbar.component/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreatePartModal } from './modal.component/modal.create.part.component/modal.create.part.component';
import { SkipEmptyElementPipe } from './modal.component/modal.create.part.component/modal.create.part.pipe';


@NgModule({
    declarations: [
        AppComponent,
        EditPartModal,
        DeletePartModal,
        DetailPartModal,
        PartsComponent,
        PartListComponent,
        PartComponent,
        NavbarComponent,
        CreatePartModal,
        SkipEmptyElementPipe
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        NgbModule
    ],
    bootstrap: [AppComponent],
    entryComponents: [DetailPartModal, DeletePartModal, EditPartModal]
})
export class AppModule { }
