import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from "../../../shared/services/todo.service";
import { ITodo } from "../../../shared/interfaces/todo.interface";
import { NoteService } from 'src/app/shared/services/note.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
    public todos: ITodo[] = [];

    constructor(
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
                }, 2000)
            }
        )
    }


}
