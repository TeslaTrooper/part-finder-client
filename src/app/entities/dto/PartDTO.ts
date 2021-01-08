export interface PartListDTO {
    parts: PartDTO[];
}

export interface PartDTO {
    id: string;
    part: PartDetailsDTO;
}

export interface PartDetailsDTO {
    name: string;
    location: string;
    qty: number;
    attributes: AttributeDTO[];
}

export interface AttributeDTO {
    name: string;
    value: string;
}