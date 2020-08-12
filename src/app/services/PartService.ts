import { EventEmitter } from '@angular/core';

import { Part } from '../model/part';

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
        let id = Math.random() * 100;

        while (this.parts.has(id))
            id = Math.random() * 100;

        part.id = id;
        this.parts.set(id, part);

        this.partListChanged.emit();
    }

    public edit(id: number, box: string, qty: number): void {
        let currentPart: Part = this.parts.get(id);

        currentPart.box = box;
        currentPart.qty = qty;

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