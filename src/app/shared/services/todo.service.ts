import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { FbCreateResponse } from "../interfaces/note.interface";
import { map } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Todo } from '../interfaces/todo.interface';

@Injectable()
export class TodoService {

    public days: string = '';
    public todos: Todo[] = [];

    constructor(
        private http: HttpClient
    ) {
    }

    public getTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(`${environment.baseUrl}/todos.json`)
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
        return this.http.post<any>(`${environment.baseUrl}/todos.json`, todo)
            .pipe(
                map((response: FbCreateResponse) => {
                    return {
                        ...todo,
                        id: response.name
                    }
                })
            )
    }

    public delete(id: string): Observable<Todo> {
        return this.http.delete<Todo>(`${environment.baseUrl}/todos/${id}.json`)
    }

    public getValueDay(value: string): void {
        this.days = value;
    }

}
