import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

import { BookModel } from '@common';
import { ApiPath } from '../constants/api';
import { DefaultBook } from '../constants/book';
import { BookStore } from '../stores/book.store';
import { ApiService } from './api.service';

enum AppPath {
  Books = '/books',
}

@Injectable({ providedIn: 'root' })
export class BookService {
  invalidSubmission = false;

  private get _isEditing(): boolean {
    return !!this.bookStore.book.id;
  }

  constructor(
    private readonly apiService: ApiService,
    private readonly bookStore: BookStore,
    private readonly router: Router,
  ) {}

  addBook(props: BookModel): void {
    Promise.resolve(this.apiService.postItem(ApiPath.Books, props))
      .then(book => this._navigate(`${AppPath.Books}/${book.id}`, {}, book))
      .catch(e => console.debug(e));
  }

  canSaveNew(books: BookModel[], form: FormGroup): boolean {
    return form?.valid && !this._isDuplicate(books, form);
  }

  canSave(books: BookModel[], form: FormGroup): boolean {
    return form?.valid && this._isEditing && this._hasChanged(books, form) && !this._isDistinctDuplicate(books, form);
  }

  canDelete(): boolean {
    return this._isEditing;
  }

  fetchBook(id: number): void {
    Promise.resolve((this.apiService.getItem(`${ApiPath.Books}/${id}`)))
      .then(book => {
        this.bookStore.book = book;
        this._resetForm(book);
        if (!book.id) {
          this.router.navigate([AppPath.Books]);
        }
      })
      .catch(e => console.debug(e));
  }

  fetchBooks(): void {
    Promise.resolve((this.apiService.getItems(ApiPath.Books)))
      .then(books => this.bookStore.books = books)
      .catch(e => console.debug(e));
  }

  isValid(item: AbstractControl): boolean {
    if (!this.invalidSubmission) {
      return item.valid || item.pristine;
    }
    return item.valid;
  }

  removeBook(props: BookModel): void {
    Promise.resolve((this.apiService.deleteItem(`${ApiPath.Books}/${props.id}`, props)))
      .then(() => this._navigate(AppPath.Books, { replaceUrl: true }))
      .catch(e => console.debug(e));
  }

  updateBook(props: BookModel): void {
    Promise.resolve((this.apiService.putItem(`${ApiPath.Books}/${props.id}`, props)))
      .then(book => {
        this.bookStore.book = book;
        this.fetchBooks();
      })
      .catch(e => console.debug(e));
  }

  private _hasChanged(books: BookModel[], form: FormGroup): boolean {
    return !books.find(item => item.author === form.value.author
      && item.title === form.value.title
      && item.description === form.value.description);
  }

  private _isDistinctDuplicate(books: BookModel[], form: FormGroup): boolean {
    return !!books.find(item => item.id !== this.bookStore.book.id
      && item.author === form.value.author
      && item.title === form.value.title);
  }

  private _isDuplicate(books: BookModel[], form: FormGroup): boolean {
    return !!books.find(item => item.author === form.value.author && item.title === form.value.title);
  }

  private _navigate(path: string, params?: Params, book = {} as BookModel): void {
    this.router.navigate([path], params)
      .then(() => {
        this.bookStore.book = book;
        this._resetForm();
        this.fetchBooks();
      })
      .catch(e => console.debug(e));
  }

  private _resetForm(book?: BookModel): void {
    this.bookStore.form = new FormGroup({
      title: new FormControl(book?.title || DefaultBook.title),
      author: new FormControl(book?.author || DefaultBook.author),
      description: new FormControl(book?.description || DefaultBook.description),
    });
  }
}
