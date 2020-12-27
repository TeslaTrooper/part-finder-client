import { EventEmitter, Injectable } from '@angular/core';

import { HttpService, PartDetailsResponse } from "./HttpService";
import { Part } from '../entities/part';
import { genRandomKey } from "../shared/Util";

@Injectable({providedIn: 'root'})
export class PartService {

    private parts: Map<string, Part>;
    private searchToken: string;

    public partSelect: EventEmitter<number>;
    public partDelete: EventEmitter<number>;
    public partEdit: EventEmitter<number>;
    public partListChanged: EventEmitter<void>;

    constructor(private httpService: HttpService) {
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
        });
    }

    public add(part: PartDetailsResponse): void {
        this.httpService.savePart(part).subscribe((id: string) => {
            const attributes: Map<string, string> = new Map();
            part.attributes.forEach(e => {
                attributes.set(e.name, e.value);
            });
            const tmp: Part = new Part(id, part.name, part.location, part.qty, attributes);
            this.parts.set(id, tmp);
            
            this.partListChanged.emit();
        });
    }

    public edit(id: string, box: string, qty: number, attribs: Map<string, string>): void {
        let currentPart: Part = this.parts.get(id);
        
        currentPart.box = box;
        currentPart.qty = qty;
        currentPart.setAttribs(attribs);

        this.partListChanged.emit();
    }

    public delete(id: string): void {
        this.parts.delete(id);
        this.partListChanged.emit();
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