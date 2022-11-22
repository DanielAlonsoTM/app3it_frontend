import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PollService } from '../../services/PollService';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {

  public formPoll!: UntypedFormGroup;
  public titleAlert: string = 'This field is required';
  public genreSelected: string = '';

  public genres: any[] = [
    { value: 'rock', viewValue: 'Rock' },
    { value: 'pop', viewValue: 'Pop' },
    { value: 'clasica', viewValue: 'Clásica' },
  ];

  constructor(private formBuilder: UntypedFormBuilder, public pollService: PollService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formPoll = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail],
      'genre': [null, Validators.required]
    });
  }

  checkInUseEmail(control: any) {
    // mimic http database access
    let db = ['tony@gmail.com'];
    return new Observable(observer => {
      setTimeout(() => {
        let result = (db.indexOf(control.value) !== -1) ? { 'alreadyInUse': true } : null;
        observer.next(result);
        observer.complete();
      }, 4000)
    })
  }

  getErrorEmail() {
    return this.formPoll.get('email')!.hasError('required') ? 'Field is required' :
      this.formPoll.get('email')!.hasError('pattern') ? 'Not a valid emailaddress' :
        this.formPoll.get('email')!.hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  onSubmit() {
    let body = {
      'email': this.formPoll.value['email'],
      'genre': this.formPoll.value['genre']
    };

    if (body) {
      console.log(body);

      this.pollService.addPoll(body).subscribe(
        {
          complete: () => {
            console.log('Success POST');
          },
          error: (error) => {
            console.log(error);
          },
          next: (resp) => {
            console.log(resp);
          },
        }
      );
    }
  }
}
