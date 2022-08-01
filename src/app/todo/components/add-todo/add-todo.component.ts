import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Week } from 'src/app/shared/interfaces/week.interface';
import { Todo } from '../../../shared/interfaces/todo.interface';
import { TodoService } from "../../../shared/services/todo.service";


@Component({
    selector: 'app-add-todo',
    templateUrl: './add-todo.component.html',
    styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
    public todoForm: FormGroup;
    public todo: Todo;
    public days: Week[] = [
        { day: "Понедельник" },
        { day: "Вторник" },
        { day: "Среда" },
        { day: "Четверг" },
        { day: "Пятница" },
        { day: "Суббота" },
        { day: "Воскресенье" },
    ];

    constructor(
        private todoService: TodoService,
        private router: Router
    ) {
    }

    public ngOnInit(): void {
        this.todoForm = new FormGroup({
            text: new FormControl('', Validators.required)
        })
    }

    public submit(): void {
        this.todo = {
            text: this.todoForm.controls['text'].value
        }
        this.todoService.addTodo(this.todo).subscribe(
            () => {
                alert('Задача добавлена!');
                this.router.navigate(['todos'])
            }
        )
    }

    public valueDay(event: any): void {
        this.todoService.getValueDay(event.target.value)
        console.log(event.target.value);
    }
}
