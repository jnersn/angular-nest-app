import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AppService } from '../app.service';
import { Book } from './book.entity';

@Injectable()
export class BookService extends AppService<Book> {
  constructor(
    @InjectRepository(Book)
    protected readonly bookRepository: Repository<Book>,
  ) {
    super(bookRepository);
  }
}
