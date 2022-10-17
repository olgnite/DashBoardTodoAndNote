import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TodoService} from "../../../shared/services/todo.service";
import {ITodo} from "../../../shared/interfaces/todo.interface";
import {Observable, Subscription} from "rxjs";

@Component({
	selector: 'app-checkbox-control',
	templateUrl: './checkbox-control.component.html',
	styleUrls: ['./checkbox-control.component.scss']
})
export class CheckboxControlComponent implements OnInit, OnDestroy {
	public form: FormGroup;
	public id: string | undefined = '';
	public sub: Subscription;
	public todos: ITodo[];

	constructor(
		public formBuilder: FormBuilder,
		private todoService: TodoService
	) {
		this.form = formBuilder.group({
			completed: new FormArray([])
		})
	}

	public ngOnInit(): void {
		this.sub = this.todoService.getTodos()
			.subscribe((todos: ITodo[]) => {
				this.todos = todos;
			})
	}

	public ngOnDestroy() {
		if (this.sub) {
			this.sub.unsubscribe();
		}
	}

	public onCheckboxChange(event: any): void {
		const completedTodo: FormArray = (this.form.controls['completed'] as FormArray);
		if (event.target.checked) {
			completedTodo.push(new FormControl(event.target.value));
			this.id = completedTodo.value[0];
		} else {
			const index: number = completedTodo.controls.findIndex(i => i.value === event.target.value);
			completedTodo.removeAt(index);
		}
	}
}
