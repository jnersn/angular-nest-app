import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FormComponent } from '../../components/form/form.component';
import { ListComponent } from '../../components/list/list.component';
import { BooksResolver } from './books.resolver';
import { BooksView } from './books.view';
import { BooksRoutingModule } from './books-routing.module';

@NgModule({
  declarations: [BooksView, FormComponent, ListComponent],
  imports: [BooksRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  providers: [BooksResolver],
})
export class BooksModule {}
