import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {IWeek} from 'src/app/shared/interfaces/week.interface';
import {AlertService} from 'src/app/shared/services/alert.service';
import {ITodo} from '../../../shared/interfaces/todo.interface';
import {TodoService} from "../../../shared/services/todo.service";

@Component({
	selector: 'app-add-todo',
	templateUrl: './add-todo.component.html',
	styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
	public todoForm: FormGroup;
	public todo: ITodo;
	public days: IWeek[] = [
		{day: "Понедельник"},
		{day: "Вторник"},
		{day: "Среда"},
		{day: "Четверг"},
		{day: "Пятница"},
		{day: "Суббота"},
		{day: "Воскресенье"},
	];

	constructor(
		public todoService: TodoService,
		private router: Router,
		private alertService: AlertService
	) {
	}

	public ngOnInit(): void {
		this.todoForm = new FormGroup({
			text: new FormControl('', Validators.required),
			day: new FormControl('', Validators.required)
		})

	}

	public submit(): void {
		this.todo = {
			text: this.todoForm.controls['text'].value,
			day: this.todoForm.controls['day'].value
		}
		this.todoService.addTodo(this.todo).subscribe(
			() => {
				this.alertService.success('Задача была создана');
				this.router.navigate(['todos']);
			}
		)
	}

}
