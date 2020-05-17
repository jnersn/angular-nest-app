import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookModule } from './book/book.module';

@Module({
  imports: [BookModule, TypeOrmModule.forRoot()],
})
export class AppModule {}
