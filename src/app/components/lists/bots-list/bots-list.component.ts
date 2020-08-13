import { IBot } from './../../../entities/bot';
import { Component, OnInit } from '@angular/core';
import { TableBase } from 'src/app/base/table.page';
import { createBot } from 'src/app/testing/generators.mock';
import { HotkeysService } from '@qbitartifacts/qbit-hotkeys';

@Component({
  selector: 'app-bots-list',
  templateUrl: './bots-list.component.html',
  styleUrls: ['./bots-list.component.scss'],
})
export class BotsListComponent extends TableBase<IBot> implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'type', 'currency'];

  query: string;
  isLoading = false;

  constructor(public hotkeys: HotkeysService) {
    super(hotkeys);
  }
  
  public setIsLoading() {}
  public onSearch() {}

  ngOnInit() {
    const bots = Array.from({ length: 100 }, (_, k) => createBot(k + 1 + ''));
    this.setData(bots);
  }
}
