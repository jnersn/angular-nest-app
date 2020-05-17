import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookController } from './book.controller';
import { Book } from './book.entity';
import { BookService } from './book.service';

@Module({
  controllers: [BookController],
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BookService],
})
export class BookModule {}
