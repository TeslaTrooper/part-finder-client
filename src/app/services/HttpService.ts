import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';

import { Part } from '../shared/part';

@Injectable({providedIn: 'root'})
export class HttpService {

    private readonly BACKEND_BASE_URL: string = 'http://localhost:8080/part-finder-server';

    constructor(private http: HttpClient) { }

    public getParts(): Observable<Map<string, Part>> {
        return this.http.get<PartListResponse>(this.BACKEND_BASE_URL.concat('/parts'))
            .pipe(delay(3000), map((payload) => {
                const result: Map<string, Part> = new Map();

                payload.parts.forEach(p => {
                    const part: PartResponse = p.part;
                    result.set(p.id, new Part(p.id, part.name, part.location, part.qty));
                });

                return result;
            }));
    }

}

interface PartListResponse {
    parts: { id:string, part: PartResponse }[];
}

interface PartResponse {
    name: string;
    location: string;
    qty: number;
    attribs: Map<string, string>;
}