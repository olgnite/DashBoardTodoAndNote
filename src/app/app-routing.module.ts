import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./todo/todo.module').then((module) => module.TodoModule)
	},
	{
		path: '',
		loadChildren: () => import('./note/note.module').then((module) => module.NoteModule)
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {

}
