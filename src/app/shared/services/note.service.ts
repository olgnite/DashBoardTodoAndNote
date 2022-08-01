import { Injectable } from "@angular/core";
import { FbCreateResponse, Note } from "../interfaces/note.interface";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";

@Injectable()
export class NoteService {

    constructor(
        private http: HttpClient
    ) {
    }

    public getNotes(): Observable<Note[]> {
        return this.http.get<Note[]>(`${environment.baseUrl}/notes.json`)
            .pipe(
                map((response: { [keys: string]: any }) => {
                    return Object
                        .keys(response)
                        .map(key => ({
                            ...response[key],
                            id: key
                        }))
                })
            )
    }

    public addNote(note: Note): Observable<Note> {
        return this.http.post<any>(`${environment.baseUrl}/notes.json`, note)
            .pipe(
                map((response: FbCreateResponse) => {
                    return {
                        ...note,
                        id: response.name
                    }
                }
                ))
    }

    public update(note: Note): Observable<Note> {
        return this.http.patch<Note>(`${environment.baseUrl}/notes/${note.id}.json`, note);
    }

    public getById(id: string): Observable<Note> {
        return this.http.get<Note>(`${environment.baseUrl}/notes/${id}.json`)
            .pipe(
                map((note: Note) => {
                    return {
                        ...note,
                        id
                    }
                })
            )
    }

    public delete(id: string): Observable<Note> {
        return this.http.delete<Note>(`${environment.baseUrl}/notes/${id}.json`);
    }

}
