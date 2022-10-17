import {Component, OnInit} from '@angular/core';
import {AlertService} from 'src/app/shared/services/alert.service';
import {INote} from '../../../shared/interfaces/note.interface';
import {NoteService} from '../../../shared/services/note.service';
import {BehaviorSubject} from "rxjs";

@Component({
	selector: 'app-notes',
	templateUrl: './notes.component.html',
	styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
	public notes: BehaviorSubject<INote[] | null> = new BehaviorSubject<INote[] | null>([]);

	constructor(
		private noteService: NoteService,
		private alertService: AlertService
	) {
	}

	public ngOnInit(): void {
		this.noteService.getNotes()
			.subscribe(
				(notes: INote[]) => {
					this.notes.next(notes);
				}, (err) => {
					console.log("Page is empty", err)
				}
			)
	}

	public remove(id: string = ""): void {
		this.noteService.delete(id).subscribe(() => {
				this.notes.next(this.notes.getValue().filter(n => n.id !== id));
				this.alertService.success('Заметка удалена');
			}
		)
	}
}
