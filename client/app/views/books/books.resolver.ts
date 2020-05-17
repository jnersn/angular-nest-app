import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { BookService } from '../../services/book.service';

@Injectable()
export class BooksResolver implements Resolve<void> {
  private initialLoad = true;

  constructor(
    private readonly bookService: BookService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): void {
    if (this.initialLoad) {
      this.bookService.fetchBooks();
      this.initialLoad = false;
    }
    if (route.params.id) {
      this.bookService.fetchBook(route.params.id);
    }
  }
}
