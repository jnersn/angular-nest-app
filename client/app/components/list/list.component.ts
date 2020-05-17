import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { BookModel } from '@common';

@Component({
  selector: 'app-list',
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  @Input() readonly selectedItem = {} as BookModel;

  private _items: BookModel[] = [];

  get items(): BookModel[] {
    return this._items;
  }

  @Input() set items(items: BookModel[]) {
    this._items = (items || []).sort((a, b) => b.id - a.id);
  }
}
