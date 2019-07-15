import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'courses', loadChildren: './courses/courses.module#CoursesPageModule' },
  { path: 'students', loadChildren: './students/students.module#StudentsPageModule' },
  { path: 'interactions', loadChildren: './interactions/interactions.module#InteractionsPageModule' },
  { path: 'questions', loadChildren: './questions/questions.module#QuestionsPageModule' },
  { path: 'title', loadChildren: './title/title.module#TitlePageModule' },
  { path: 'student-add', loadChildren: './student-add/student-add.module#StudentAddPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
