import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { BookModel } from '@common';

@Entity()
export class Book implements BookModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { default: '', length: 255 })
  title!: string;

  @Column('varchar', { default: '', length: 255 })
  author!: string;

  @Column('text', { default: '' })
  description!: string;
}
