import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {

  formGroup!: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';

  genres: any[] = [
    { value: 'rock', viewValue: 'Rock' },
    { value: 'pop', viewValue: 'Pop' },
    { value: 'clasica', viewValue: 'Clásica' },
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail],
      'color': this.formBuilder.control('')
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
    return this.formGroup.get('email')!.hasError('required') ? 'Field is required' :
      this.formGroup.get('email')!.hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('email')!.hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  onSubmit(post: any) {
    this.post = post;
  }
}
