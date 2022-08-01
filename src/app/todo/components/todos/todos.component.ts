import {Component, Input, OnInit} from '@angular/core';
import {TodoService} from "../../../shared/services/todo.service";
import {Todo} from "../../../shared/interfaces/todo.interface";
import { Week } from 'src/app/shared/interfaces/week.interface';

@Component({
	selector: 'app-todos',
	templateUrl: './todos.component.html',
	styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
	public todos: Todo[] = [];
    public days: string = '';

	constructor(
		public todosService: TodoService,
	) {
	}

	public ngOnInit(): void {
		this.todosService.getTodos().subscribe(
			(todos: Todo[]) => {
				this.todos = todos
			},
			(err) => {
				console.log("Page is empty", err)
			}
		)

        this.days = this.todosService.days;

	}

	public remove(id: string = ''): void {
		this.todosService.delete(id).subscribe(
			() => {
				setTimeout(() => {
					this.todos = this.todos.filter(t => t.id !== id);
				}, 2000)
			}
		)
	}


}
