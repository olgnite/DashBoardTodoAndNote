import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AddNoteComponent} from "./components/add-note/add-note.component";
import {EditNoteComponent} from "./components/edit-note/edit-note.component";
import {NotesComponent} from "./components/notes/notes.component";
import {NoteService} from "../shared/services/note.service";
import {CommonModule} from "@angular/common";
import { AuthGuard } from "../shared/auth.guard";

@NgModule({
	declarations: [
		AddNoteComponent,
		EditNoteComponent,
		NotesComponent
	],
	imports: [
		ReactiveFormsModule,
		FormsModule,
		RouterModule.forChild([
			{path: 'notes', component: NotesComponent, canActivate: [AuthGuard]},
			{path: 'notes/add', component: AddNoteComponent, canActivate: [AuthGuard]},
			{path: 'notes/:id', component: EditNoteComponent, canActivate: [AuthGuard]}
		]),
		CommonModule
	],
	exports: [RouterModule],
	providers: [
        AuthGuard,
		NoteService
	]
})
export class NoteModule {

}
