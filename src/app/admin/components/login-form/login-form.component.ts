import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
    public loginForm: FormGroup;

    constructor(private auth: AuthService, private alertService: AlertService) { }

    public ngOnInit(): void {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)])
        })
    }

    public login(): void {
        if (this.loginForm.invalid) {
            return
        } else {
            const user: User = {
                email: this.loginForm.controls['email'].value,
                password: this.loginForm.controls['password'].value
            }
            this.loginForm.reset();
            this.auth.setSessionData(user);
        }

    }
}
