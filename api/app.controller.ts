import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { DeepPartial } from 'typeorm';

import { AppService } from './app.service';

export class AppController<T> {
  constructor(
    private readonly appService: AppService<T>,
  ) {}

  @Post()
  async addItem(@Body() item: T): Promise<T> {
    return this.appService.create(item);
  }

  @Get(':id')
  async getItem(@Param('id') id: number, @Query() query: object): Promise<T> {
    return this.appService.findOne({ ...query, id });
  }

  @Get()
  async getItems(): Promise<T[]> {
    return this.appService.find();
  }

  @Delete(':id')
  async removeItem(@Param('id') id: number): Promise<T> {
    return this.appService.delete(id);
  }

  @Put(':id')
  async updateItem(@Body() item: DeepPartial<T>): Promise<T> {
    return this.appService.save(item);
  }
}
