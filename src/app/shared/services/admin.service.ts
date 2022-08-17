import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../interfaces/user.interface";

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(private http: HttpClient) {
    }

    public getAdminUser(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.baseUrl}/user.json`)
            .pipe(
                map((response: { [key: string]: any }) => {
                    return Object.keys(response).map((key) => ({
                        ...response[key],
                        id: key
                    }))
                })
            )
    }
}
