import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	public dateTime: number;

	public ngOnInit(): void {
		this.dateTime = Date.now();
	}
}
