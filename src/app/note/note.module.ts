import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AddNoteComponent} from "./components/add-note/add-note.component";
import {EditNoteComponent} from "./components/edit-note/edit-note.component";
import {NotesComponent} from "./components/notes/notes.component";
import {NoteService} from "../shared/services/note.service";
import {CommonModule} from "@angular/common";

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
			{path: 'notes', component: NotesComponent},
			{path: 'notes/add', component: AddNoteComponent},
			{path: 'notes/:id', component: EditNoteComponent}
		]),
		CommonModule
	],
	exports: [RouterModule],
	providers: [
		NoteService
	]
})
export class NoteModule {

}
