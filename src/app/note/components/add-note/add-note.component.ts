import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Note} from "../../../shared/interfaces/note.interface";
import {NoteService} from 'src/app/shared/services/note.service';

@Component({
	selector: 'app-add-note',
	templateUrl: './add-note.component.html',
	styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
	public form: FormGroup;

	constructor(
		private noteService: NoteService,
		private router: Router,
	) {
	}

	public ngOnInit(): void {
		this.form = new FormGroup({
			title: new FormControl('', Validators.required),
			content: new FormControl('', Validators.required),
		})
	}

	public submit(): void {
		if (this.form.invalid) {
			return
		}
		const note: Note = {
			title: this.form.controls['title'].value,
			content: this.form.controls['content'].value,
		}
		this.noteService.addNote(note).subscribe(() => {
			this.form.reset()
			alert('Заметка успешно создана!');
			this.router.navigate(['/notes']);
		})

	}
}
