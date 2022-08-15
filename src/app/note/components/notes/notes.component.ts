import {Component, OnInit} from '@angular/core';
import {Note} from '../../../shared/interfaces/note.interface';
import {NoteService} from '../../../shared/services/note.service';

@Component({
	selector: 'app-notes',
	templateUrl: './notes.component.html',
	styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
	public notes: Note[] = [];

	constructor(private noteService: NoteService) {

	}

	public ngOnInit(): void {
		this.noteService.getNotes().subscribe(
			(notes: Note[]) => {
				this.notes = notes;
			},
			(err) => {
				console.log("Page is empty", err)
			}
		)
	}

	public remove(id: string = ""): void {
		this.noteService.delete(id).subscribe(() => {
				this.notes = this.notes.filter(n => n.id !== id);
			}
		)
	}
}
