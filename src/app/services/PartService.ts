import { EventEmitter, Injectable } from '@angular/core';

import { HttpService } from "./HttpService";
import { Part } from 'src/app/entities/domain/Part';
import { ToastService } from './ToastService';

@Injectable({ providedIn: 'root' })
export class PartService {

    private parts: Map<string, Part>;
    private searchToken: string;

    public partSelect: EventEmitter<number>;
    public partDelete: EventEmitter<number>;
    public partEdit: EventEmitter<number>;
    public partListChanged: EventEmitter<void>;

    constructor(private httpService: HttpService, private toastService: ToastService) {
        this.parts = new Map();
        this.searchToken = "";

        this.partSelect = new EventEmitter();
        this.partDelete = new EventEmitter();
        this.partEdit = new EventEmitter();
        this.partListChanged = new EventEmitter();

        this.loadPartsInitially();
    }

    private loadPartsInitially(): void {
        this.httpService.getParts().subscribe((partResponse: Map<string, Part>) => {
            this.parts.clear();

            partResponse.forEach((value: Part, key: string) =>
                this.parts.set(key, value)
            );

            this.partListChanged.emit();
            this.toastService.push("Laden erfolgreich", "Liste wurde erfolgreich aktualisiert");
        });
    }

    public add(part: Part): void {
        this.httpService.savePart(part).subscribe((id: string) => {
            const tmp: Part = new Part(id, part.name, part.box, part.qty, part.attribs);
            this.parts.set(id, tmp);

            this.partListChanged.emit();
            this.toastService.push("Erstellen erfolgreich", "Teil wurde erfolgreich erstellt");
        });
    }

    public edit(updatedPart: Part): void {
        this.httpService.editPart(updatedPart).subscribe((success: boolean) => {
            if (!success)
                return;

            this.parts.set(updatedPart.id, updatedPart);
            this.partListChanged.emit();
            this.toastService.push("Bearbeiten erfolgreich", "Teil wurde erfolgreich bearbeitet");
        });
    }

    public delete(id: string): void {
        this.httpService.deletePart(id).subscribe((success: boolean) => {
            if (!success)
                return;

            this.parts.delete(id);
            this.partListChanged.emit();
            this.toastService.push("Löschen erfolgreich", "Teil wurde erfolgreich gelöscht");
        });
    }

    public get(id: string): Part {
        return this.parts.get(id);
    }

    public getParts(): Part[] {
        let result: Part[] = [];

        this.parts.forEach((value: Part, key: string) => {
            if (value.name.toLowerCase().match(this.searchToken.toLowerCase()))
                result.push(value);
        });

        return result;
    }

    public setToken(token: string): void {
        this.searchToken = token;
        this.partListChanged.emit();
    }

}