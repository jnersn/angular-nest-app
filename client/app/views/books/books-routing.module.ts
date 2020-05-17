import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksResolver } from './books.resolver';
import { BooksView } from './books.view';

const routes: Routes = [
  {
    component: BooksView,
    path: '',
    runGuardsAndResolvers: 'always',
    resolve: {
      books: BooksResolver,
    },
  },
  {
    component: BooksView,
    path: ':id',
    runGuardsAndResolvers: 'always',
    resolve: {
      book: BooksResolver,
    },
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class BooksRoutingModule {}
