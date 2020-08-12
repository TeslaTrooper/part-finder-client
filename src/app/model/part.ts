export class Part {
    
    id: number;
    name: string;
    box: string;
    qty: number;

    constructor(id: number, name: string, box: string, qty: number) {
        this.id = id;
        this.name = name;
        this.box = box;
        this.qty = qty;
    }
    
}