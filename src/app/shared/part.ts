export class Part {

    id: number;
    name: string;
    box: string;
    qty: number;
    attribs: Map<string, string>;

    constructor(id: number, name: string, box: string, qty: number) {
        this.id = id;
        this.name = name;
        this.box = box;
        this.qty = qty;
        this.attribs = new Map();
    }

    public setAttribs(attribs: Map<string, string>): void {
        if (attribs == null || attribs == undefined)
            return;
            
        this.attribs = attribs;
    }

}