import {Injectable} from '@angular/core';
import {FbCreateResponse, Note} from "../interfaces/note.interface";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable()
export class NoteService {
	static url = 'https://pageboard-ee22f-default-rtdb.firebaseio.com';

	constructor(
		private http: HttpClient
	) {
	}

	public getNotes(): Observable<Note[]> {
		return this.http.get<Note[]>(`${NoteService.url}/notes.json`)
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
		return this.http.post<any>(`${NoteService.url}/notes.json`, note)
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
		return this.http.patch<Note>(`${NoteService.url}/notes/${note.id}.json`, note);
	}

	public getById(id: string): Observable<Note> {
		return this.http.get<Note>(`${NoteService.url}/notes/${id}.json`)
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
		return this.http.delete<Note>(`${NoteService.url}/notes/${id}.json`);
	}
}
