import { Component, OnInit } from '@angular/core';
import { PollService } from '../../services/PollService';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  genres: any[] = [
    { type: 'rock', total: 0 },
    { type: 'pop', total: 0 },
    { type: 'clasica', total: 0 }
  ];

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
      }
    });
  }

}
