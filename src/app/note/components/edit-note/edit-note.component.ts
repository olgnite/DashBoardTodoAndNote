import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NoteService } from '../../../shared/services/note.service';
import { INote } from "../../../shared/interfaces/note.interface";
import { Subscription, switchMap } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'app-edit-note',
    templateUrl: './edit-note.component.html',
    styleUrls: ['./edit-note.component.scss']
})

export class EditNoteComponent implements OnInit, OnDestroy {

    public uSub: Subscription;
    public id: string;
    public editForm: FormGroup;
    public note: INote;

    constructor(
        private route: ActivatedRoute,
        private noteService: NoteService,
        private router: Router,
        private alertService: AlertService
    ) {
    }

    public ngOnInit(): void {
        this.uSub = this.route.params
            .pipe(
                switchMap((params: Params) => {
                    this.id = params['id'];
                    return this.noteService.getById(params['id']);
                })
            ).subscribe((note: INote) => {
                this.note = note;
                this.editForm = new FormGroup({
                    title: new FormControl(note.title, Validators.required),
                    content: new FormControl(note.content, Validators.required)
                })
            },
                (error) => {
                    console.log(error);
                })
    }

    public ngOnDestroy(): void {
        if (this.uSub) {
            this.uSub.unsubscribe();
        }
    }

    public submit(): void {
        if (this.editForm.invalid) {
            return
        }

        this.uSub = this.noteService.update({
            id: this.id,
            title: this.editForm.controls['title'].value,
            content: this.editForm.controls['content'].value
        }).subscribe(() => {
            this.alertService.success('Заметка была успешно обновлена');
            this.router.navigate(['/notes']);
        }
        )
    }
}
