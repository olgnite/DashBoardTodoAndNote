import { NgModule } from "@angular/core";
import { AddTodoComponent } from "./components/add-todo/add-todo.component";
import { TodosComponent } from "./components/todos/todos.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TodoService } from "../shared/services/todo.service";
import { CheckboxControlComponent } from './components/checkbox-control/checkbox-control.component';

@NgModule({
    declarations: [
        AddTodoComponent,
        TodosComponent,
        CheckboxControlComponent,
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            { path: 'todos', component: TodosComponent },
            { path: 'todos/add', component: AddTodoComponent },
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
        TodoService
    ]
})
export class TodoModule {

}
