import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Alert } from "../interfaces/alert.interface";

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    public alert$ = new Subject<Alert>();

    public success(text: string): void {
        this.alert$.next({ type: 'success', text });
    }

}
