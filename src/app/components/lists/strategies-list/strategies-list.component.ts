import { LoadableComponent } from 'src/app/base/loadable.page';
import { Component } from '@angular/core';
import { TableBase } from 'src/app/base/table.page';
import { HotkeysService } from '@qbitartifacts/qbit-hotkeys';
import { IStrategy } from 'src/app/entities/strategy';
import { StrategiesService } from 'src/app/services/CRUD/logic-traders/strategies.service';

@Component({
  selector: 'app-strategies-list',
  templateUrl: './strategies-list.component.html',
  styleUrls: ['./strategies-list.component.scss'],
})
export class StrategyListComponent extends TableBase<IStrategy>
  implements LoadableComponent {
  public displayedColumns: string[] = ['id', 'name', 'description', 'updated'];

  constructor(
    public hotkeys: HotkeysService,
    public strategies: StrategiesService
  ) {
    super(hotkeys);
  }

  public onSearch() {
    this.strategies.listAll().subscribe(
      (resp) => {
        console.log('strategies.', resp);
        this.setData(resp);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  ngOnInit() {
    const strat = {
      name: 'test',
      description: 'test',
    };
    this.strategies.create(strat).subscribe(
      (resp) => {
        console.log('resp', resp);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
}
