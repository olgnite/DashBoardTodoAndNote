import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import * as moment from "moment";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    public dateTime: number;
    public ngOnInit(): void {
        interval(1000).subscribe(
            () => {
                this.dateTime = Date.now()
            }
        )
    }
}
