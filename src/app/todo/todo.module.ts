import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../shared/auth.guard";
import { TodoService } from "../shared/services/todo.service";
import { AddTodoComponent } from "./components/add-todo/add-todo.component";
import { CheckboxControlComponent } from './components/checkbox-control/checkbox-control.component';
import { TodosComponent } from "./components/todos/todos.component";

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
            { path: 'todos', component: TodosComponent, canActivate: [AuthGuard] },
            { path: 'todos/add', component: AddTodoComponent, canActivate: [AuthGuard] },
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
        TodoService,
    ]
})
export class TodoModule {

}
