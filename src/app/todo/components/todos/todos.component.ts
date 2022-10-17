import {Component, Inject, Input, OnInit} from '@angular/core';
import {TodoService} from "../../../shared/services/todo.service";
import {ITodo} from "../../../shared/interfaces/todo.interface";
import {NoteService} from 'src/app/shared/services/note.service';
import {AlertService} from 'src/app/shared/services/alert.service';
import {DELAY} from "../../../shared/tokens/delayToken";

@Component({
	selector: 'app-todos',
	templateUrl: './todos.component.html',
	styleUrls: ['./todos.component.scss'],
	providers: [
		{
			provide: DELAY,
			useValue: 2000
		}
	]
})
export class TodosComponent implements OnInit {
	public todos: ITodo[] = [];

	constructor(
		@Inject(DELAY) protected readonly delay: number,
		public todoService: TodoService,
		private alertService: AlertService
	) {
	}

	public ngOnInit(): void {
		this.todoService.getTodos().subscribe(
			(todos: ITodo[]) => {
				this.todos = todos
			},
			(err) => {
				console.log("Page is empty", err)
			}
		)
	}

	public remove(id: string = ''): void {
		this.todoService.delete(id).subscribe(
			() => {
				setTimeout(() => {
					this.todos = this.todos.filter(t => t.id !== id);
					this.alertService.success('Задача удалена');
				}, this.delay);
			}
		)
	}


}
