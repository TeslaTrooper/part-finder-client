import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { map, delay, catchError } from 'rxjs/operators';

import { Part } from 'src/app/entities/domain/Part';
import { PartDTO, PartListDTO } from '../entities/dto/PartDTO';

@Injectable({ providedIn: 'root' })
export class HttpService {

    private readonly BACKEND_BASE_URL: string = 'http://localhost:8080/part-finder-server';
    private readonly HEADER_LOCATION: string = 'LOCATION';

    constructor(private http: HttpClient) { }

    public getParts(): Observable<Map<string, Part>> {
        return this.http.get<PartListDTO>(this.BACKEND_BASE_URL.concat('/parts'))
            .pipe(delay(1000), map(payload => {
                const result: Map<string, Part> = new Map();

                payload.parts
                    .map(p => Part.toDomain(p))
                    .forEach(p => result.set(p.id, p))

                return result;
            }));
    }

    public savePart(part: Part): Observable<string> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            observe: 'response' as 'body'
        };

        return this.http.post<Response>(this.BACKEND_BASE_URL.concat('/parts'), Part.toDto(part), httpOptions)
            .pipe(delay(1000), catchError(this.handleError), map((response: Response) => {
                const locationURI: string = response.headers.get(this.HEADER_LOCATION);

                return locationURI.slice(locationURI.lastIndexOf('/') + 1, locationURI.length - 1);
            }));
    }

    public deletePart(id: string): Observable<boolean> {
        return this.http.delete<PartDTO>(this.BACKEND_BASE_URL.concat('/parts/' + id))
            .pipe(delay(1000), catchError(this.handleError), map((response) =>
                response.id === id
            ));
    }

    public editPart(part: Part): Observable<boolean> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            observe: 'response' as 'body'
        };

        return this.http.put<Response>(this.BACKEND_BASE_URL.concat('/parts/'), Part.toDto(part), httpOptions)
            .pipe(delay(1000), catchError(this.handleError), map((response) =>
                response.status == 200
            ));
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        if (error.error instanceof ErrorEvent)
            console.error('An error occurred:', error.error.message);
        else
            console.error(`Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);

        return throwError('Something bad happened; please try again later.');
    }

}