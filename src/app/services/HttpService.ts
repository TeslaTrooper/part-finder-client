import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';

import { Part } from '../entities/part';

@Injectable({ providedIn: 'root' })
export class HttpService {

    private readonly BACKEND_BASE_URL: string = 'http://localhost:8080/part-finder-server';

    constructor(private http: HttpClient) { }

    public getParts(): Observable<Map<string, Part>> {
        return this.http.get<PartListResponse>(this.BACKEND_BASE_URL.concat('/parts'))
            .pipe(delay(1000), map(payload => {
                const result: Map<string, Part> = new Map();

                payload.parts.map(p =>
                    Part.toDomain(p)
                ).forEach(p => result.set(p.id, p))

                return result;
            }));
    }

}


interface PartListResponse {
    parts: PartResponse[];
}

export interface PartResponse {
    id: string;
    part: PartDetailsResponse;
}

export interface PartDetailsResponse {
    name: string;
    location: string;
    qty: number;
    attributes: AttributeResponse[];
}

interface AttributeResponse {
    name: string;
    value: string;
}