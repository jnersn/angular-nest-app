import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BookModel } from '@common';
import { EMPTY_FORM } from '../../constants/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-form',
  styleUrls: ['./form.component.scss'],
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  @Input() readonly book = {} as BookModel;
  @Input() readonly books: BookModel[] = [];
  @Input() readonly form = EMPTY_FORM;

  constructor(
    readonly bookService: BookService,
  ) {}

  addBook(form: FormGroup): void {
    if (form.invalid) {
      this.bookService.invalidSubmission = true;
      return;
    }
    this.bookService.addBook(form.value);
  }

  removeBook(form: FormGroup, book: BookModel): void {
    this.bookService.removeBook({ ...form.value, id: book.id });
  }

  updateBook(form: FormGroup, book: BookModel): void {
    if (form.invalid) {
      this.bookService.invalidSubmission = true;
      return;
    }
    this.bookService.updateBook({ ...form.value, id: book.id });
  }
}
