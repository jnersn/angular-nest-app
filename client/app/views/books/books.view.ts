import { Component } from '@angular/core';

import { BookStore } from '../../stores/book.store';

@Component({
  selector: 'app-books',
  templateUrl: './books.view.html',
})
export class BooksView {
  constructor(
    readonly bookStore: BookStore,
  ) {}
}
