import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-aggregate',
  templateUrl: './aggregate.component.html',
  styleUrls: ['./aggregate.component.scss'],
})
export class AggregateComponent {
  @Input() size: 'big' | 'md' | 'sm' = 'big';
  @Input() icon: string;
  @Input() title: string;
  @Input() value: string;

  @Input() titleColor = 'gray';
  @Input() valueColor = 'gray';
  @Input() iconColor = 'gray';
}
