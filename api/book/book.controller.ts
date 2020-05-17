import { Controller } from '@nestjs/common';

import { AppController } from '../app.controller';
import { Book } from './book.entity';
import { BookService } from './book.service';

@Controller('books')
export class BookController extends AppController<Book> {
  constructor(
    protected readonly bookService: BookService,
  ) {
    super(bookService);
  }
}
