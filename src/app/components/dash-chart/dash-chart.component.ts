/* tslint:disable */
/* istanbul ignore file */
import {
  Component,
  Input,
  Output,
  EventEmitter,
  Inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as Highcharts from 'highcharts';
import { TranslateService } from '@ngx-translate/core';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

const formatters = {
  time: (val) => Highcharts.dateFormat('%e of %b %H:%M', val),
};

@Component({
  selector: 'dash-chart',
  styleUrls: ['./dash-chart.css'],
  templateUrl: './dash-chart.component.html',
})
export class DashChart {
  public chart_: Highcharts.Chart;

  @Input() public id = 'Chart';

  @Input() public title = 'Chart';
  @Input() public type = 'area';
  @Input() public height = '170px';
  @Input() public showBorder = false;
  @Input() public timeframes = DashChart.DefaultTimeframes;
  @Input() public selectedTimeframe: any = DashChart.DefaultTimeframes[0];
  @Input() public colors = DashChart.DefaultColors;
  @Input() public labels = ['A', 'B'];
  @Input() public data = [];
  @Input() public twoAxis = false;
  @Output('changed') public changedTimeframe: EventEmitter<
    any
  > = new EventEmitter();

  public options: any = {};

  constructor(
    @Inject(DOCUMENT) public document,
    public translate: TranslateService
  ) {
    translate.onLangChange.subscribe((res) => {
      if (this.chart_) {
        this.chart_.setTitle(
          { text: this.translate.instant(this.title) },
          null,
          true
        );
      }
    });
  }

  public update(dataA: any) {
    let self = this;
    this.options = {
      chart: {
        type: this.type,
        borderWidth: this.showBorder ? 1 : 0,
        borderColor: '#ccd6eb',
        borderRadius: 3,
        spacing: [20, 20, 20, 20],
        height: this.height,
        style: {
          fontFamily: "'Roboto', sans-serif",
        },
      },
      title: {
        text: this.translate.instant(this.title),
        enabled: false,
        style: {
          display: 'none',
        },
      },
      plotOptions: {
        area: {
          fillOpacity: 0.4,
          opacity: 0.6,
          lineWidth: 0,
        },
        areaspline: {
          fillOpacity: 0.4,
          opacity: 0.6,
          lineWidth: 0,
        },
        line: {
          opacity: 0.6,
          lineWidth: 1,
        },
        spline: {
          opacity: 0.6,
          lineWidth: 1,
        },
        series: {
          marker: {
            radius: 2,
            lineWidth: 1,
          },
        },
      },
      credits: {
        enabled: false,
      },
      colors: this.colors,
      tooltip: {
        formatter: function () {
          return (
            '<b>Date:</b> ' +
            `<code>${formatters.time(this.x)}</code>` +
            '<br/> <b>Value:</b> ' +
            `<code>${this.y.toFixed(2)}</code>`
          );
        },
        borderColor: '#ccd6eb',
        borderRadius: 2,
        shadow: false,
        backgroundColor: '#ffffff',
        useHTML: true,
      },
      xAxis: {
        type: 'datetime',
        labels: {
          formatter: function () {
            return formatters.time(this.value);
          },
        },
      },
      yAxis: [
        {
          // left y axis
          title: {
            text: null,
            style: {
              color: this.colors[0],
            },
          },
          labels: {
            align: 'left',
            x: -15,
            y: 0,
            format: '{value:.,0f}',
            style: {
              color: this.colors[0],
            },
            formatter: function () {
              return Math.floor(this.value);
            },
          },
          showFirstLabel: true,
        },
        this.twoAxis
          ? {
              // right y axis
              opposite: true,
              title: {
                text: null,
                style: {
                  color: this.colors[1],
                },
              },
              labels: {
                align: 'right',
                x: 10,
                y: 16,
                format: '{value:.,0f} recs',
                style: {
                  color: this.colors[1],
                },
                formatter: function () {
                  if (this.value >= 1e6) {
                    return this.value / 1000000 + 'M';
                  } else if (this.value < 1000) {
                    return this.value;
                  }
                  return this.value / 1000 + 'k';
                },
              },
              showFirstLabel: false,
            }
          : null,
      ].filter((_) => _),
      series: [
        {
          name: this.labels[0],
          data: dataA,
          yAxis: 0,
        },
      ],
    };

    this.chart_ = Highcharts.chart(this.id, this.options);
    this.chart_.legend.update({
      enabled: false,
    });
  }

  public ngOnDestroy() {
    (window as any).removeAllListeners('resize');
  }

  public selectTimeframe(timeframe) {
    this.selectedTimeframe = timeframe;
    this.changedTimeframe.emit(timeframe.value);
    try {
      this.chart_.redraw();
    } catch (error) {}
  }

  static DefaultTimeframes = [
    {
      name: 'Last Year',
      value: 'year',
    },
    {
      name: 'Last Month',
      value: 'month',
    },
    {
      name: 'Last Day',
      value: 'day',
    },
  ];

  static DefaultColors = ['#0098db', '#9ed7f1'];
}
