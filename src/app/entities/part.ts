import { PartDetailsResponse, PartResponse } from '../services/HttpService';

export class Part {

    id: string;
    name: string;
    box: string;
    qty: number;
    attribs: Map<string, string>;

    constructor(id: string, name: string, box: string, qty: number, attribs: Map<string, string> = new Map()) {
        this.id = id;
        this.name = name;
        this.box = box;
        this.qty = qty;
        this.attribs = attribs == null ? new Map() : attribs;
    }

    public setAttribs(attribs: Map<string, string>): void {
        if (attribs == null || attribs == undefined || attribs.size == 0)
            return;

        this.attribs = attribs;
    }

    static toDomain(partResponse: PartResponse): Part {
        const partDetails: PartDetailsResponse = partResponse.part;
        const attribs: Map<string, string> = new Map();

        partDetails.attributes.forEach(a => 
            attribs.set(a.name, a.value)
        );
        
        return new Part(partResponse.id, partDetails.name, 
            partDetails.location, partDetails.qty, attribs);
    }

}