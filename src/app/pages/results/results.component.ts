import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { PollService } from '../../services/PollService';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  public genres: any[] = [
    { type: 'rock', total: 0, displayName: 'Rock' },
    { type: 'pop', total: 0, displayName: 'Pop' },
    { type: 'clasica', total: 0, displayName: 'Clásica' }
  ];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0,
        ticks: {
          precision: 0
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: this.genres.map((genre) => genre.displayName),
    datasets: []
  };

  constructor(public pollService: PollService) { }

  ngOnInit(): void {
    this.pollService.getResults().subscribe({
      complete: () => {
        console.log('Success GET');
      },
      error: (error) => {
        console.log(error);
      },
      next: (resp) => {
        let polls = resp;

        polls.map((poll) => {
          this.genres.map((genre) => {
            if (poll.genre === genre.type) {
              genre.total++;
            }
          });
        });

        // Load data
        this.barChartData = {
          datasets: [
            { data: this.genres.map((genre) => genre.total), label: 'Estilos' }
          ]
        };
      }
    });
  }

  // events
  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }
}
