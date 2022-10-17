import { IFbCreateResponse, INote } from "../interfaces/note.interface";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class NoteService {

    constructor(
        private http: HttpClient
    ) {
    }

    public getNotes(): Observable<INote[]> {
        return this.http.get<INote[]>(`${environment.baseUrl}/notes.json`)
            .pipe(
                map((response: { [keys: string]: any }) => {
                    return Object.keys(response).map(key => ({
                        ...response[key],
                        id: key
                    }))
                })
            )
    }

    public addNote(note: INote): Observable<INote> {
        return this.http.post<any>(`${environment.baseUrl}/notes.json`, note)
            .pipe(
                map((response: IFbCreateResponse) => {
                    return {
                        ...note,
                        id: response.name
                    }
                })
            )
    }

    public update(note: INote): Observable<INote> {
        return this.http.patch<INote>(`${environment.baseUrl}/notes/${note.id}.json`, note);
    }

    public getById(id: string): Observable<INote> {
        return this.http.get<INote>(`${environment.baseUrl}/notes/${id}.json`)
            .pipe(
                map((note: INote) => {
                    return {
                        ...note,
                        id
                    }
                })
            )
    }

    public delete(id: string): Observable<INote> {
        return this.http.delete<INote>(`${environment.baseUrl}/notes/${id}.json`)
    }

}
