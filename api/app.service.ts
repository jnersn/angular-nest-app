import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';

export interface Read<T> {
  find(query: object): Promise<T[]>;
  findOne(query: object): Promise<T>;
}

export interface Write<T> {
  create(item: T): Promise<T>;
  save(item: DeepPartial<T>): Promise<T>;
  delete(id: number): Promise<T>;
}

@Injectable()
export abstract class AppService<T> implements Read<T>, Write<T> {
  protected constructor(
    private readonly item: Repository<T>,
  ) {}

  async find(): Promise<T[]> {
    try {
      return await this.item.find() || [];
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(query: object): Promise<T> {
    try {
      return await this.item.findOne({ where: query }) || {} as T;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async create(item: DeepPartial<T>): Promise<T> {
    try {
      return (await this.item.insert({ ...item }))?.raw?.[0] || {} as T;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async save(item: DeepPartial<T>): Promise<T> {
    try {
      return await this.item.save(item) || {} as T;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number): Promise<T> {
    try {
      await this.item.delete(id);
      return {} as T;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
