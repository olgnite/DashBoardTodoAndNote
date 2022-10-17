import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {IFbCreateResponse} from "../interfaces/note.interface";
import {map} from "rxjs/operators";
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {ITodo} from '../interfaces/todo.interface';

@Injectable()
export class TodoService {
	public days: string = '';
	public todos: ITodo[] = [];

	constructor(
		private http: HttpClient
	) {
	}

	public getTodos(): Observable<ITodo[]> {
		return this.http.get<ITodo[]>(`${environment.baseUrl}/todos.json`)
			.pipe(
				map((response: { [keys: string]: any }) => {
					return Object.keys(response).map(key => ({
						...response[key],
						id: key
					}))
				})
			)
	}

	public addTodo(todo: ITodo): Observable<ITodo> {
		return this.http.post<any>(`${environment.baseUrl}/todos.json`, todo)
			.pipe(
				map((response: IFbCreateResponse) => {
					return {
						...todo,
						id: response.name
					}
				})
			)
	}

	public delete(id: string): Observable<ITodo> {
		return this.http.delete<ITodo>(`${environment.baseUrl}/todos/${id}.json`)
	}

}
