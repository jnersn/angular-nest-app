import { FormControl, FormGroup } from '@angular/forms';

export enum DefaultBook {
  title = '',
  author = '',
  description = '',
}

export const EMPTY_FORM = new FormGroup({
  title: new FormControl(DefaultBook.title),
  author: new FormControl(DefaultBook.author),
  description: new FormControl(DefaultBook.description),
});
