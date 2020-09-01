import { EventEmitter, Injectable } from '@angular/core';

import { Part } from '../shared/part';
import { genRandomKey } from "../shared/Util";

@Injectable({providedIn: 'root'})
export class PartService {

    private parts: Map<number, Part>;
    private searchToken: string;

    public partSelect: EventEmitter<number>;
    public partDelete: EventEmitter<number>;
    public partEdit: EventEmitter<number>;
    public partListChanged: EventEmitter<void>;

    constructor() {
        this.parts = new Map();
        this.searchToken = "";

        this.partSelect = new EventEmitter();
        this.partDelete = new EventEmitter();
        this.partEdit = new EventEmitter();
        this.partListChanged = new EventEmitter();
    }

    public add(part: Part): void {
        let key = genRandomKey(0, 100, this.parts);

        part.id = key;
        this.parts.set(key, part);

        this.partListChanged.emit();
    }

    public edit(id: number, box: string, qty: number, attribs: Map<string, string>): void {
        let currentPart: Part = this.parts.get(id);

        currentPart.box = box;
        currentPart.qty = qty;
        currentPart.setAttribs(attribs);

        this.partListChanged.emit();
    }

    public delete(id: number): void {
        this.parts.delete(id);
        this.partListChanged.emit();
    }

    public get(id: number): Part {
        return this.parts.get(id);
    }

    public getParts(): Part[] {
        let result: Part[] = [];

        this.parts.forEach((value: Part, key: number) => {
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