import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { BookModel } from '@common';
import { EMPTY_FORM } from '../constants/book';

@Injectable({ providedIn: 'root' })
export class BookStore {
  private readonly _book$: BehaviorSubject<BookModel> = new BehaviorSubject<BookModel>({} as BookModel);
  private readonly _books$: BehaviorSubject<BookModel[]> = new BehaviorSubject<BookModel[]>([]);
  private readonly _form$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(EMPTY_FORM);

  get book$(): Observable<BookModel> {
    return this._book$.asObservable();
  }

  get book(): BookModel {
    return this._book$.getValue();
  }

  set book(book: BookModel) {
    this._book$.next(book);
  }

  get books$(): Observable<BookModel[]> {
    return this._books$.asObservable();
  }

  get books(): BookModel[] {
    return this._books$.getValue();
  }

  set books(books: BookModel[]) {
    this._books$.next(books);
  }

  get form$(): Observable<FormGroup> {
    return this._form$.asObservable();
  }

  get form(): FormGroup {
    return this._form$.getValue();
  }

  set form(form: FormGroup) {
    this._form$.next(form);
  }
}
