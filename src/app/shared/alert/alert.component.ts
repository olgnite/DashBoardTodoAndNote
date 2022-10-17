import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { IAlert } from "../interfaces/alert.interface";
import { DELAY } from '../tokens/delayToken';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
    public delay = this.delayToken;
    public text: string;
    public type: string = 'success';
    public aSub: Subscription;

    constructor(
        private alertService: AlertService,
        @Inject(DELAY) protected readonly delayToken: number
    ) {
    }

    public ngOnInit(): void {
        this.aSub = this.alertService.alert$.subscribe((alert: IAlert) => {
            this.text = alert.text;
            const timeOut = setTimeout(() => {
                clearTimeout(timeOut);
                this.text = '';
            }, this.delay)
        })
    }

    public ngOnDestroy(): void {
        if (this.aSub) {
            this.aSub.unsubscribe;
        }
    }

}
