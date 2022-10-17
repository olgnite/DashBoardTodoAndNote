import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {IAlert} from "../interfaces/alert.interface";

@Injectable({
	providedIn: 'root',
})
export class AlertService {
	public alert$: Subject<IAlert> = new Subject<IAlert>();

	public success(text: string): void {
		this.alert$.next({type: 'success', text});
	}

}
