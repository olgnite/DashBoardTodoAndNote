import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IUser } from "../interfaces/user.interface";

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(private http: HttpClient) {
    }

    public getAdminUser(): Observable<IUser[]> {
        return this.http.get<IUser[]>(`${environment.baseUrl}/user.json`)
            .pipe(
                map((response: { [key: string]: any }) => {
                    return Object.keys(response).map((key: string) => ({
                        ...response[key],
                        id: key
                    }))
                })
            )
    }
}
