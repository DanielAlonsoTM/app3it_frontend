import { Component, OnInit } from '@angular/core';
import { PollService } from '../../services/PollService';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

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
        console.log(resp);
      }
    });
  }

}
