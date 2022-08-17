import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AdminService } from "../shared/services/admin.service";
import { AuthService } from "../shared/services/auth.service";
import { LoginFormComponent } from "./components/login-form/login-form.component";

@NgModule({
    declarations: [
        LoginFormComponent
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild([
            { path: 'login', component: LoginFormComponent }
        ]),
        CommonModule
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthService,
        AdminService
    ]
})
export class AdminModule {

}
