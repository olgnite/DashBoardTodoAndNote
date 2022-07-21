import {Injectable} from '@angular/core';
import {Todo} from "../interfaces/todo.interface";
import {Observable} from "rxjs";
import {FbCreateResponse} from "../interfaces/note.interface";
import {map} from "rxjs/operators";
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TodoService {

	static url = 'https://pageboard-ee22f-default-rtdb.firebaseio.com';

	public todos: Todo[] = [];

	constructor(
		private http: HttpClient
	) {
	}

	public getTodos(): Observable<Todo[]> {
		return this.http.get<Todo[]>(`${TodoService.url}/todos.json`)
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

	public addTodo(todo: Todo): Observable<Todo> {
		return this.http.post<any>(`${TodoService.url}/todos.json`, todo)
			.pipe(
				map((response: FbCreateResponse) => {
						return {
							...todo,
							id: response.name
						}
					}
				))
	}

	public delete(id: string): Observable<Todo> {
		return this.http.delete<Todo>(`${TodoService.url}/todos/${id}.json`);
	}

}
