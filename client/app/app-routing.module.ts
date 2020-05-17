import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksModule } from './views/books/books.module';

const routes: Routes = [
  {
    path: 'books',
    loadChildren: async (): Promise<BooksModule> => import('./views/books/books.module').then(m => m.BooksModule),
  },
  {
    path: '**',
    redirectTo: 'books',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
