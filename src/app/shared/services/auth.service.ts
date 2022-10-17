import { AdminService } from 'src/app/shared/services/admin.service';
import { IJWTSession } from '../interfaces/jwtSession.interface';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AlertService } from './alert.service';
import { IUser } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public sessionToken = 'session';
    public TOKEN: IJWTSession;
    public user: IUser;

    constructor(
        private router: Router,
        private admin: AdminService,
        private alertService: AlertService
    ) {
        this.admin.getAdminUser()
            .subscribe((user: IUser[]) => {
                this.user = user[0];
                this.TOKEN = {
                    token: this.user.id
                }
            })
    }

    public setSessionData(user: IUser): void {
        if (this.user.email === user.email && this.user.password.toString() === user.password) {
            sessionStorage.setItem(this.sessionToken, this.TOKEN.token);
            this.router.navigate(['/todos']);
            this.alertService.success('Вы успешно зашли в систему');
        } else {
            this.alertService.success('Такого пользователя не существует');
            this.router.navigate(['/login']);
            sessionStorage.clear();
        }
    }

    public isAuthenticated(): string | null {
        if (this.TOKEN) {
            const token = sessionStorage.getItem(this.sessionToken);
            return token;
        }
        return null;

    }
}



